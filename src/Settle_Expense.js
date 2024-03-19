// Settle_Expense.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './App.css';

function Settle_Expense() {
  const [toExpenses, setToExpenses] = useState([]);
  const [fromExpenses, setFromExpenses] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state && location.state.userId;

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:3030/split`)
        .then(res => {
          const allExpenses = res.data;
          const matchedToExpenses = allExpenses.filter(split => split.to_id === userId);
          const matchedFromExpenses = allExpenses.filter(split => split.from_id === userId);
          setToExpenses(matchedToExpenses);
          setFromExpenses(matchedFromExpenses);
        })
        .catch(err => setError(err.message));

      axios.get('http://localhost:3030/user')
        .then(res => {
          setUsers(res.data);
        })
        .catch(err => console.error('Error fetching user data:', err));
    }
  }, [userId]);

  const getUsernameById = (id) => {
    const user = users.find(user => user.user_id === id);
    return user ? user.name : 'Unknown';
  };
  
  const handleSettleFromExpense = (toId, fromId, sharedExpense, expenseId) => {
    // // Find the expense with the provided to_id, from_id, expense_id, and isSettled equal to 0
    // const expenseToSettle = toExpenses.find(expense => 
    //   expense.to_id === toId && 
    //   expense.from_id === fromId &&
    //   expense.expense_id === expenseId &&
    //   expense.isSettled === 0
    // );
  
    // if (!expenseToSettle) {
    //   setError('Expense to settle not found');
    //   return;
    // }
  
    // // Update the expense to mark it as settled
    // const updatedExpense = { ...expenseToSettle, isSettled: 1 };
  
    // axios.post('http://localhost:3030/split', updatedExpense)
    //   .then(() => {
    //     console.log("Expense settled successfully");
  
    //     // Make a DELETE request to delete the found expense
    //     axios.delete('http://localhost:3030/split', { data: updatedExpense })
    //       .then(() => {
    //         console.log("Expense deleted successfully");
    //         // Remove the deleted expense from the state
    //         const updatedToExpenses = toExpenses.filter(expense => expense.expense_id !== expenseToSettle.expense_id);
    //         setToExpenses(updatedToExpenses);
    //       })
    //       .catch(err => {
    //         setError('Failed to delete expense: ' + err.message);
    //       });
    //   })
    //   .catch(err => {
    //     setError('Failed to settle expense: ' + err.message);
    //   });
  };
  
  
  const handleLogoutClick = () => {
    localStorage.removeItem('userId');
    navigate('/login_page');
  };

  return (
    <div className="Display_Group">
      <br />
      <p> <span className="page-head">Your Expenses</span></p><br /><br />
      <div className="normal-info">
        {fromExpenses.map(expense => (
          <div key={expense.expense_id} className="expense-item">
            {expense.isSettled ? (
              <p>{getUsernameById(expense.to_id)} paid Rupees {expense.shared_expense} to you</p>
            ) : (null)}
          </div>
        ))}

        {toExpenses.map(expense => (
          <div key={expense.expense_id} className="expense-item">
            {expense.isSettled ? (
              <p>You paid Rupees {expense.shared_expense} to {getUsernameById(expense.from_id)}</p>
            ) : (
              <div className="normal-info">
                <p>You are yet to pay Rupees {expense.shared_expense} to {getUsernameById(expense.from_id)}
                  <button onClick={() => handleSettleFromExpense(expense.to_id, expense.from_id, expense.shared_expense, expense.expense_id)} className="universal-button" color="white">Settle Expense</button>
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
      {error && <p>Error: {error}</p>}
      <button onClick={handleLogoutClick} id="log-out" className="universal-button" style={{ marginLeft: '1.5rem', marginRight: '5rem' }}>Log Out</button><br /><br />
    </div>
  );
}

export default Settle_Expense;
