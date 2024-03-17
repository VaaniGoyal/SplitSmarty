
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './Group_Page.css';

function Group_Page() {
  const [expenseInfo, setExpenseInfo] = useState([]);
  const [userMap, setUserMap] = useState({});
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const location = useLocation();
  const groupId = location.state && location.state.groupId;

  useEffect(() => {
    if (groupId) {
      axios.get(`http://localhost:3030/expense`)
        .then(res => {
          const matchedExpenses = res.data.filter(expense => expense.group_id === groupId);
          if (matchedExpenses.length > 0) {
            setExpenseInfo(matchedExpenses);
            fetchUsers(matchedExpenses); // Fetch user data for matching payer IDs
          } else {
            setError('No expenses found for the group');
          }
        })
        .catch(err => setError(err.message));
    }
  }, [groupId]);

  // Fetch user data from user.json
  const fetchUsers = (expenses) => {
    axios.get('http://localhost:3030/user')
      .then(res => {
        const userMap = res.data.reduce((acc, user) => {
          acc[user.user_id] = user.name;
          return acc;
        }, {});
        setUserMap(userMap);
      })
      .catch(err => console.error('Failed to fetch user data:', err));
  };

  const handleGroupClick = (expenseId) => {
    navigate(`/Expense_Details/${expenseId}`); // Navigate to the expense details page with the expense ID
  };

  return (
    <div className="Group_Page">
      <br />
      <p> <span className="page-head">Group Name</span></p><br /><br />
      <p> <span className="head">Group Expenses</span></p><br /><br />
      <div className="expense-list">
        {expenseInfo.map(expense => (
          <div key={expense.id}>
            <p>Rupees: {expense.amount} paid by {userMap[expense.payer_id]} on {expense.date_time}</p>
            <hr /> 
          </div>
        ))}
      </div>
      {error && <p>Error: {error}</p>}
      <div className="button-container">
        <button className="button">Add an expense</button>
        <button className="button">Settle an expense</button>
        <button className="button">View Participants</button>
        <button className="button">Log out</button>
      </div>
    </div>
  );
}
export default Group_Page;
