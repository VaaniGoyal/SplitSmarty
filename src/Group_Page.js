// // //Group_Page.js


// // import React, { useState, useEffect } from 'react';
// // import { Link, useNavigate, useLocation } from 'react-router-dom';
// // import axios from 'axios';
// // import './Group_Page.css';

// // function Group_Page() {
// //   const [expenseInfo, setExpenseInfo] = useState([]);
// //   const [error, setError] = useState('');
// //   const [users, setUsers] = useState([]);
// //   const navigate = useNavigate();
// //   const location = useLocation();
// //   const groupId = location.state && location.state.groupId;
// //   const userId = location.state && location.state.userId;

// //   useEffect(() => {
// //     // Fetch expenses and users data
// //     const fetchData = async () => {
// //       try {
// //         const [expensesRes, usersRes] = await Promise.all([
// //           axios.get('http://localhost:3030/expenses'),
// //           axios.get('http://localhost:3030/user')
// //         ]);

// //         const expensesData = expensesRes.data;
// //         const usersData = usersRes.data;

// //         // Fetch group expenses
// //         const groupExpensesRes = await axios.get('http://localhost:3030/group_expenses');
// //         const groupExpenses = groupExpensesRes.data;

// //         // Filter expenses based on groupId matching in group_expenses
// //         const filteredExpenses = groupExpenses
// //           .filter(expense => expense.group_id === groupId)
// //           .map(expense => {
// //             // Match payer_id with user_id and replace with user name
// //             const matchedExpense = expensesData.find(e => e.expense_id === expense.expense_id);
// //             const user = usersData.find(user => user.user_id === matchedExpense.payer_id);
// //             return {
// //               ...matchedExpense,
// //               payer_name: user ? user.name : 'Unknown User'
// //             };
// //           });

// //         setExpenseInfo(filteredExpenses);
// //       } catch (error) {
// //         setError('Failed to fetch data: ' + error.message);
// //       }
// //     };

// //     fetchData();
// //   }, [groupId]); // Fetch data whenever groupId changes

// //   const handleAddClick = () => {
// //     navigate('/Add_Expense', { state: { groupId: groupId, userId: userId } });
// //   };

// //   const handleParticipantsClick = () => {
// //     navigate('/Participants', { state: { groupId: groupId } });
// //   };

// //   return (
// //     <div className="Group_Page">
// //       <br />
// //       <p> <span className="page-head">Group Name</span></p><br /><br />
// //       <p> <span className="head">Group Expenses</span></p><br /><br />
// //       <div className="expense-list">
// //         {expenseInfo.map(expense => (
// //           <div key={expense.expense_id}>
// //             <p>Rupees: {expense.amount} paid by {expense.payer_name} on {expense.date_time} for {expense.type}</p>
// //             <hr />
// //           </div>
// //         ))}
// //       </div>
// //       {error && <p>Error: {error}</p>}
// //       <div className="button-container">
// //         <button className="button" onClick={handleAddClick}>Add an expense</button>
// //       </div>
// //       <div className="button-container">
// //         <button className="button" onClick={handleParticipantsClick}>View Participants</button>
// //       </div>
// //       <div className="button-container">
// //         <button className="button">Log out</button>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Group_Page;


// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import axios from 'axios';
// import './Group_Page.css';

// function Group_Page() {
//   const [expenseInfo, setExpenseInfo] = useState([]);
//   const [error, setError] = useState('');
//   const [users, setUsers] = useState([]);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const groupId = location.state && location.state.groupId;
//   const userId = location.state && location.state.userId;

//   useEffect(() => {
//     // Fetch expenses and users data
//     const fetchData = async () => {
//       try {
//         const [expensesRes, usersRes] = await Promise.all([
//           axios.get('http://localhost:3030/expenses'),
//           axios.get('http://localhost:3030/user')
//         ]);

//         const expensesData = expensesRes.data;
//         const usersData = usersRes.data;

//         // Fetch group expenses
//         const groupExpensesRes = await axios.get('http://localhost:3030/group_expenses');
//         const groupExpenses = groupExpensesRes.data;

//         // Filter expenses based on groupId matching in group_expenses
//         const filteredExpenses = groupExpenses
//           .filter(expense => expense.group_id === groupId)
//           .map(expense => {
//             // Match payer_id with user_id and replace with user name
//             const matchedExpense = expensesData.find(e => e.expense_id === expense.expense_id);
//             const user = usersData.find(user => user.user_id === matchedExpense.payer_id);
//             return {
//               ...matchedExpense,
//               payer_name: user ? user.name : 'Unknown User'
//             };
//           });

//         setExpenseInfo(filteredExpenses);
//       } catch (error) {
//         setError('Failed to fetch data: ' + error.message);
//       }
//     };

//     fetchData();
//   }, [groupId]); // Fetch data whenever groupId changes

//   const handleAddClick = () => {
//     navigate('/Add_Expense', { state: { groupId: groupId, userId: userId } });
//   };

//   const handleParticipantsClick = () => {
//     navigate('/Participants', { state: { groupId: groupId } });
//   };

//   // Function to format date and time
//   const formatDateTime = (dateTimeStr) => {
//     const dateTime = new Date(dateTimeStr);
//     const date = dateTime.toLocaleDateString();
//     const time = dateTime.toLocaleTimeString();
//     return `on ${date} at ${time}`;
//   };

//   return (
//     <div className="Group_Page">
//       <br />
//       <p> <span className="page-head">Group Name</span></p><br /><br />
//       <p> <span className="head">Group Expenses</span></p><br /><br />
//       <div className="expense-list">
//         {expenseInfo.map(expense => (
//           <div key={expense.expense_id}>
//             <p>Rupees: {expense.amount} paid by {expense.payer_name} {formatDateTime(expense.date_time)} for {expense.type}</p>
//             <hr />
//           </div>
//         ))}
//       </div>
//       {error && <p>Error: {error}</p>}
//       <div className="button-container">
//         <button className="button" onClick={handleAddClick}>Add an expense</button>
//       </div>
//       <div className="button-container">
//         <button className="button" onClick={handleParticipantsClick}>View Participants</button>
//       </div>
//       <div className="button-container">
//         <button className="button">Log out</button>
//       </div>
//     </div>
//   );
// }

// export default Group_Page;


import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './Group_Page.css';

function Group_Page() {
  const [expenseInfo, setExpenseInfo] = useState([]);
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);
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

  const handleAddClick = () => {
    navigate('/Add_Expense', { state: { groupId: groupId, userId: userId } });
  };

  const handleParticipantsClick = () => {
    navigate('/Participants', { state: { groupId: groupId } });
  };

  const handleLogoutClick = () => {
    // Logic to clear user session data and redirect to login page
    // For example, you can use localStorage to clear user data
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
      <p> <span className="head">Group Expenses</span></p><br /><br />
      <div className="expense-list">
        {expenseInfo.map(expense => (
          <div key={expense.expense_id}>
            <p>Rupees: {expense.amount} paid by {expense.payer_name} {formatDateTime(expense.date_time)} for {expense.type}</p>
            <hr />
          </div>
        ))}
      </div>
      {error && <p>Error: {error}</p>}
      <div className="button-container">
        <button className="button" onClick={handleAddClick}>Add an expense</button>
      </div>
      <div className="button-container">
        <button className="button" onClick={handleParticipantsClick}>View Participants</button>
      </div>
      <div className="button-container">
        <button className="button" onClick={handleLogoutClick}>Log out</button>
      </div>
    </div>
  );
}

export default Group_Page;
