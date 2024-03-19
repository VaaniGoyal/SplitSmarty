


import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './NonUni_Split.css';

function NonUni_Split() {
  const location = useLocation();
  const groupId = location.state && location.state.groupId;
  const userId = location.state && location.state.userId;
  const [inputData, setInputData] = useState({
    payer_id: userId,
    amount: '',
    date_time: '', // Changed to empty string
    type: '' // Changed to empty string
  });
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get('http://localhost:3030/expenses');
      const expenses = response.data;
      const maxExpenseId = Math.max(...expenses.map(expense => parseInt(expense.expense_id)));
      const expenseId = maxExpenseId + 1;
      const expenseDataWithId = { expense_id: expenseId, ...inputData };
      const expenseDataforGroupExpense = { group_id: groupId, expense_id: expenseId};
      const createExpenseResponse = await axios.post('http://localhost:3030/expenses', expenseDataWithId);
      const createGroup_ExpenseResponse = await axios.post('http://localhost:3030/group_expenses', expenseDataforGroupExpense);

      if (createExpenseResponse.status === 201) {
        alert("Expense Added Successfully!")
        navigate('/Group_Page', { state: { groupId: groupId, userId: userId } });
      } else {
        console.error('Failed to add expense:', createExpenseResponse.statusText);
      }
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  return (
    <div className="NonUni_Split">
      <br />
      <p> <span className="page-head">Add an Expense</span></p><br /><br />
      <div className="input-container">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="amount">Amount</label>
            <input type="number" name="amount" placeholder="Enter amount" value={inputData.amount} onChange={e => setInputData({ ...inputData, amount: e.target.value })} required /> <br /><br />
          </div>
          <div>
            <label htmlFor="date_time">Date and Time</label>
            <input type="datetime-local" name="date_time" value={inputData.date_time} onChange={e => setInputData({ ...inputData, date_time: e.target.value })} required /><br /> <br />
          </div>
          <div>
            <label htmlFor="type">Type</label>
            <input type="text" name="type" placeholder="Enter type of expense" value={inputData.type} onChange={e => setInputData({ ...inputData, type: e.target.value })} required />
          </div>
          <div>
            <label>Split Type:</label>
            <label>
              <input type="radio" name="split_type" value="uniform" checked={inputData.split_type === 'uniform'} onChange={() => setInputData({ ...inputData, split_type: 'uniform' })} />
              Uniform
            </label>
            <label>
              <input type="radio" name="split_type" value="non-uniform" checked={inputData.split_type === 'non-uniform'} onChange={() => setInputData({ ...inputData, split_type: 'non-uniform' })} />
              Non-Uniform
            </label>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default NonUni_Split;



