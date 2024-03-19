//NonUni_Split.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './App.css';

function NonUni_Split() {
  const [expenseInfo, setExpenseInfo] = useState([]);
  const [selectedParticipants, setSelectedParticipants] = useState([]);
  const [participantShares, setParticipantShares] = useState({});
  const [error, setError] = useState('');
  const [inputData, setInputData] = useState({ date_time: '', amount: '', type: '' });
  const [expenseId, setExpenseId] = useState(0); // Define the expenseId state
  const navigate = useNavigate();
  const location = useLocation();
  const groupId = location.state && location.state.groupId;
  const userId = location.state && location.state.userId;
  var newExpenseId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [participantsRes, usersRes] = await Promise.all([
          axios.get('http://localhost:3030/members'), // Fetch members
          axios.get('http://localhost:3030/user') // Fetch users
        ]);

        const membersData = participantsRes.data;
        const usersData = usersRes.data;

        // Filter members based on groupId matching
        const matchedMembers = membersData.filter(member => member.group_id === groupId && member.member_id !== userId);

        // Map member_id to user_id and get user names
        const expenseInfo = matchedMembers.map(member => {
          const user = usersData.find(user => user.user_id === member.member_id);
          return {
            user_id: member.member_id,
            name: user ? user.name : 'Unknown User'
          };
        });

        setExpenseInfo(expenseInfo);
      } catch (error) {
        setError('Failed to fetch data: ' + error.message);
      }
    };

    fetchData();
  }, [groupId, userId]);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedParticipants([...selectedParticipants, value]);
    } else {
      setSelectedParticipants(selectedParticipants.filter(participant => participant !== value));
    }
  };

  const handleParticipantShareChange = (event, participantId) => {
    const { value } = event.target;
    setParticipantShares({ ...participantShares, [participantId]: value });
  };

  const handleAddExpense = async (event) => {
    event.preventDefault();
    try {
      const expenseData = {
        payer_id: userId,
        date_time: inputData.date_time,
        amount: parseFloat(inputData.amount), // Convert amount to a number
        type: inputData.type
      };
      // Fetch the user data from the server to determine the next user_id
      const response = await axios.get('http://localhost:3030/expenses');
      const expenses = response.data;
      // Find the maximum expenseId to generate the next expenseId
      const maxExpenseId = Math.max(...expenses.map(expense => parseInt(expense.expense_id)));
      // Generate the next expenseId
      newExpenseId = maxExpenseId + 1;
      setExpenseId(newExpenseId); // Update the expenseId state
      // Add the expenseId to the form data
      const expenseDataWithId = { expense_id: newExpenseId, ...expenseData };
      // Send the form data to the server to create the expense
      const createExpenseResponse = await axios.post('http://localhost:3030/expenses', expenseDataWithId);
      const group_expenseData = {
        expense_id: newExpenseId,
        group_id: groupId
      };
      const createGroup_ExpenseResponse = await axios.post('http://localhost:3030/group_expenses', group_expenseData);
      if (createExpenseResponse.status === 201) {
        alert("Expense Added Successfully!");
      } else {
        console.error('Failed to add expense:', createExpenseResponse.statusText);
      }
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  const handleDone = async (event) => {
    event.preventDefault();
    try {
      // Iterate over selected participants and enter their data into the database
      await Promise.all(selectedParticipants.map(async (participantId) => {
        const toId = parseInt(participantId); // Convert to number
        const sharedExpense = participantShares[participantId] ? parseFloat(participantShares[participantId]) : 0;
        const expenseData = {
          expense_id: expenseId,
          from_id: userId,
          to_id: toId,
          shared_expense: sharedExpense,
          isSettled: 0 // Assuming the expense is not settled initially
        };
        const createExpenseResponse = await axios.post('http://localhost:3030/split', expenseData);
        return createExpenseResponse; // Return the response for handling later
      }));

      // Check if all expenses are successfully created
      alert("Participants chosen Successfully!");
      navigate('/Group_Page', { state: { groupId: groupId, userId: userId } });
      
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  return (
    <div className="NonUni_Split">
      <br />
      <p> <span className="page-head">Add an Expense (Non-Uniform)</span></p><br /><br />
      <div className="normal-info">
        <form onSubmit={handleAddExpense}>
          <div>
            <label className="normal-info" htmlFor="date_time" style={{ fontSize: '1.2rem', fontFamily: 'Overpass, Arial, sans-serif', color: '#444b59', marginRight: '3rem' }}>Date & Time</label>
            <input type="datetime-local" name="date_time" value={inputData.date_time} onChange={e => setInputData({...inputData, date_time: e.target.value})} /><br /><br />
          </div>
          <div>
            <label htmlFor="amount" style={{ fontSize: '1.2rem', fontFamily: 'Overpass, Arial, sans-serif', color: '#444b59', marginRight: '4.5rem' }}>Amount</label>
            <input type="number" name="amount" placeholder='amount' value={inputData.amount} onChange={e => setInputData({...inputData, amount: e.target.value})} /><br /><br />
          </div>
          <div>
            <label htmlFor="type" style={{ fontSize: '1.2rem', fontFamily: 'Overpass, Arial, sans-serif', color: '#444b59', marginRight: '8.5rem' }}>Type</label>
            <input type="text" name="type" placeholder='type' value={inputData.type} onChange={e => setInputData({...inputData, type: e.target.value})} /><br /><br />
          </div>
          <button id="add-expense" className="universal-button" type= "submit" style={{ marginLeft: '1.5rem', marginRight: '5rem' }}>Add Expense</button><br /><br />
        </form>
      </div>
      <p> <span className="normal-info">Choose participants for expense</span></p>
      <form onSubmit={handleDone}>
      <div className="normal-info">
          {expenseInfo.map(participant => (
            <div key={participant.user_id}>
              <input
                type="checkbox"
                id={participant.user_id}
                name="participant"
                value={participant.user_id}
                onChange={handleCheckboxChange}
              />
              <label htmlFor={participant.user_id}>{participant.name}</label>
              <input
                type="text"
                id={`share_${participant.user_id}`}
                placeholder="Share"
                value={participantShares[participant.user_id] || ''}
                onChange={(e) => handleParticipantShareChange(e, participant.user_id)}
              />
            </div>
          ))}
        </div>
        <button id="done" className="universal-button" type= "submit" style={{ marginLeft: '1.5rem', marginRight: '5rem' }}>Done</button><br /><br />
      </form>
      {error && <p>Error: {error}</p>}
    </div>
  );
}

export default NonUni_Split;
