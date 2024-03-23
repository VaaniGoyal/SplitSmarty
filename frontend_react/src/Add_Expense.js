//Add expense....will take amount and type of expense as input and then a radio button for '
//uniform and non-uniform split, and then a button saying 'add'
//this will store expense in group_expenses and expenses database
// after that uniform and non-uniform spplit will have different pages, showing group members to be chosen for expense
// in uniform they will be just radio buttons, where button id, will be user-id
// in non uniform, they will be having textbox in front of them where user will enter individual shares of everyone
//and then click on addEventListener, it will be stored in database, then redirect to "/Group_Page"
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddExpense() {
  const [inputData, setInputData] = useState({ amount: '', type: '' });
  const [splitType, setSplitType] = useState('uniform');
  const [error, setError] = useState('');
  const location = useLocation();
  const groupId = location.state && location.state.groupId;
  const userId = location.state && location.state.userId;
  const navigate = useNavigate();

  const handleSplitTypeChange = (event) => {
    setSplitType(event.target.value);
  };

  const handleAddExpense = async (event) => {
    event.preventDefault();
    try {
      const expenseData = {
        payer_id: userId,
        date_time: new Date().toISOString(),
        amount: parseFloat(inputData.amount),
        type: inputData.type,
      };
      const createExpenseResponse = await axios.post('http://localhost:5000/expenses', expenseData);
      const groupExpenseData = {
        expense_id: createExpenseResponse.data.expense_id,
        group_id: groupId,
      };
      const createGroupExpenseResponse = await axios.post('http://localhost:5000/group_expenses', groupExpenseData);
      if (createExpenseResponse.status === 201 && createGroupExpenseResponse.status === 201) {
        alert('Expense Added Successfully!');
        navigate('/Group_Page', { state: { groupId: groupId, userId: userId } });
      } else {
        console.error('Failed to add expense');
      }
    } catch (error) {
      console.error('Error adding expense:', error);
      setError('Failed to add expense. Please try again.');
    }
  };

  return (
    <div className="AddExpense">
      <h2>Add Expense</h2>
      <form onSubmit={handleAddExpense}>
        <label>
          Amount:
          <input
            type="number"
            value={inputData.amount}
            onChange={(e) => setInputData({ ...inputData, amount: e.target.value })}
            required
          />
        </label>
        <label>
          Type:
          <input
            type="text"
            value={inputData.type}
            onChange={(e) => setInputData({ ...inputData, type: e.target.value })}
            required
          />
        </label>
        <div>
          <label>
            <input
              type="radio"
              value="uniform"
              checked={splitType === 'uniform'}
              onChange={handleSplitTypeChange}
            />
            Uniform Split
          </label>
          <label>
            <input
              type="radio"
              value="non-uniform"
              checked={splitType === 'non-uniform'}
              onChange={handleSplitTypeChange}
            />
            Non-Uniform Split
          </label>
        </div>
        {splitType === 'non-uniform' && (
          <div>
            {/* Non-uniform split input fields */}
          </div>
        )}
        <button type="submit">Add</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default AddExpense;
