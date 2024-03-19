//Group_Page.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './App.css';

function Group_Page() {
  const [expenseInfo, setExpenseInfo] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const groupId = location.state && location.state.groupId;
  const userId = location.state && location.state.userId;

  useEffect(() => {
    // Fetch expenses and users data
    const fetchData = async () => {
      try {
        const [expensesRes, usersRes] = await Promise.all([
          axios.get('http://localhost:3030/expenses'),
          axios.get('http://localhost:3030/user')
        ]);

        const expensesData = expensesRes.data;
        const usersData = usersRes.data;

        // Fetch group expenses
        const groupExpensesRes = await axios.get('http://localhost:3030/group_expenses');
        const groupExpenses = groupExpensesRes.data;

        // Filter expenses based on groupId matching in group_expenses
        const filteredExpenses = groupExpenses
          .filter(expense => expense.group_id === groupId)
          .map(expense => {
            // Match payer_id with user_id and replace with user name
            const matchedExpense = expensesData.find(e => e.expense_id === expense.expense_id);
            const user = usersData.find(user => user.user_id === matchedExpense.payer_id);
            return {
              ...matchedExpense,
              payer_name: user ? user.name : 'Unknown User'
            };
          });

        setExpenseInfo(filteredExpenses);
      } catch (error) {
        setError('Failed to fetch data: ' + error.message);
      }
    };

    fetchData();
  }, [groupId]); // Fetch data whenever groupId changes

  const handleParticipantsClick = () => {
    navigate('/Participants', { state: { groupId: groupId, userId: userId } });
  };

  const handleUniformSplitClick = () => {
    navigate('/Uniform_Split', { state: { groupId: groupId, userId: userId } });
  };

  const handleNonUniformSplitClick = () => {
    navigate('/NonUni_Split', { state: { groupId: groupId, userId: userId } });
  };

  const handleLogoutClick = () => {
    localStorage.removeItem('userId');
    navigate('/login_page');
  };

  // Function to format date and time
  const formatDateTime = (dateTimeStr) => {
    const dateTime = new Date(dateTimeStr);
    const date = dateTime.toLocaleDateString();
    const time = dateTime.toLocaleTimeString();
    return `on ${date} at ${time}`;
  };

  return (
    <div className="Group_Page">
      <br />
      <p> <span className="page-head">Group Name</span></p><br /><br />
      <div className="normal-info">
        {expenseInfo.map(expense => (
          <div key={expense.expense_id}>
            <p>Rupees: {expense.amount} paid by {expense.payer_name} {formatDateTime(expense.date_time)} for {expense.type}</p>
            <hr />
          </div>
        ))}
      </div>
      {error && <p>Error: {error}</p>}
      <button onClick={handleParticipantsClick} id="view-participants" className="universal-button" style={{ marginLeft: '1.5rem', marginRight: '5rem' }}>View Participants</button><br /><br />
       <p> <span className="normal-info" margin-left="1rem">Add an Expense (choose type of expense) : </span></p>
       <button onClick={handleUniformSplitClick} id="uniform-split" className="universal-button" style={{ marginLeft: '1.5rem', marginRight: '5rem' }}>Uniform Split</button><br /><br />
       <button onClick={handleNonUniformSplitClick} id="non-uniform-split" className="universal-button" style={{ marginLeft: '1.5rem', marginRight: '5rem' }}>Non-Uniform Split</button><br /><br />
       <button onClick={handleLogoutClick} id="log-out" className="universal-button" style={{ marginLeft: '1.5rem', marginRight: '5rem' }}>Log out</button><br /><br />
    </div>
  );
}

export default Group_Page;

