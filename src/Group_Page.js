// //Group_Page.js



// import React, { useState, useEffect } from 'react';
// import { LeftNavBar, Logout, VerticalLine } from './Template';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios'; // Don't forget to import axios
// import './Group_Page.css'; // Import CSS file for global styles

// function Group_Page() {
//   const [expenseInfo, setExpenseInfo] = useState([]);
//   const [dropdown1Visible, setDropdown1Visible] = useState(false);
//   const [dropdown2Visible, setDropdown2Visible] = useState(false);
//   const navigate = useNavigate();
//   const [error, setError] = useState('');

//   useEffect(() => {
//     axios.get('http://localhost:3030/expense')
//       .then(res => {
//         setExpenseInfo(res.data); // Set the group info from the API response
//       })
//       .catch(err => setError(err.message));
//   }, []);

//   const handleGroupClick = (groupId) => {
//     navigate('/Group_Page'); // Navigate to the group details page
//   };

//   const toggleDropdown1 = () => {
//     setDropdown1Visible(!dropdown1Visible);
//     // Hide dropdown2 if it's currently visible
//     if (dropdown2Visible) setDropdown2Visible(false);
//   };

//   const toggleDropdown2 = () => {
//     setDropdown2Visible(!dropdown2Visible);
//     // Hide dropdown1 if it's currently visible
//     if (dropdown1Visible) setDropdown1Visible(false);
//   };

//   return (
//     <div className="Group_Page">
//       <LeftNavBar />
//       <Logout />
//       <VerticalLine />
//       <br />
//       <p> <span className="page-head">Group Name</span></p><br /><br />
//       <p> <span className="head">Group Expenses</span></p><br /><br />
//       <div className="expense-list">
//         {expenseInfo.map(expense => (
//           <button key={expense.id} onClick={() => handleGroupClick(expense.id)} className="group-button">
//             Ruppees {expense.amount} amount added by {expense.payer_id} on {expense.date_time} 
//           </button>
//         ))}
//       </div>
//       {error && <p>Error: {error}</p>}
//       <div className="dropdowns">
//         <button onClick={toggleDropdown1}>Add an Expense</button>
//         {dropdown1Visible && (
//           <div className="dropdown-content">
//             Uniform Split<br /><br />
//             Non-Uniform Split
//           </div>
//         )}
//         <button onClick={toggleDropdown2}>Options</button>
//         {dropdown2Visible && (
//           <div className="dropdown-content">
//             View Participants<br /><br />
//             Add Participants<br /><br />
//             Remove Participants<br /><br />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Group_Page;

// import React, { useState, useEffect } from 'react';
// import { LeftNavBar, Logout, VerticalLine } from './Template';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios'; // Don't forget to import axios
// import './Group_Page.css'; // Import CSS file for global styles

// function Group_Page() {
//   const [expenseInfo, setExpenseInfo] = useState([]);
//   const [dropdown1Visible, setDropdown1Visible] = useState(false);
//   const [dropdown2Visible, setDropdown2Visible] = useState(false);
//   const navigate = useNavigate();
//   const [error, setError] = useState('');

//   useEffect(() => {
//     axios.get('http://localhost:3030/expense')
//       .then(res => {
//         setExpenseInfo(res.data); // Set the group info from the API response
//       })
//       .catch(err => setError(err.message));
//   }, []);

//   const handleGroupClick = (groupId) => {
//     navigate('/Group_Page'); // Navigate to the group details page
//   };

//   const toggleDropdown1 = () => {
//     setDropdown1Visible(!dropdown1Visible);
//     // Hide dropdown2 if it's currently visible
//     if (dropdown2Visible) setDropdown2Visible(false);
//   };

//   const toggleDropdown2 = () => {
//     setDropdown2Visible(!dropdown2Visible);
//     // Hide dropdown1 if it's currently visible
//     if (dropdown1Visible) setDropdown1Visible(false);
//   };

//   return (
//     <div className="Group_Page">
//       <LeftNavBar />
//       <Logout />
//       <VerticalLine />
//       <br />
//       <p> <span className="page-head">Group Name</span></p><br /><br />
//       <p> <span className="head">Group Expenses</span></p><br /><br />
//       <div className="expense-list">
//         {expenseInfo.map(expense => (
//           <button key={expense.id} onClick={() => handleGroupClick(expense.id)} className="group-button">
//             Ruppees {expense.amount} amount added by {expense.payer_id} on {expense.date_time} 
//           </button>
//         ))}
//       </div>
//       {error && <p>Error: {error}</p>}
//       <div className="dropdowns">
//         <button onClick={toggleDropdown1}>Add an Expense</button>
//         {dropdown1Visible && (
//           <div className="dropdown-content">
//             <button>Uniform Split</button><br /><br />
//             <button>Non-Uniform Split</button>
//           </div>
//         )}
//         <button onClick={toggleDropdown2}>Options</button>
//         {dropdown2Visible && (
//           <div className="dropdown-content">
//             <button>View Participants</button><br /><br />
//             <button>Add Participants</button><br /><br />
//             <button>Remove Participants</button><br /><br />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Group_Page;


import React, { useState, useEffect } from 'react';
import { LeftNavBar, Logout, VerticalLine } from './Template';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Don't forget to import axios
import './Group_Page.css'; // Import CSS file for global styles

function Group_Page() {
  const [expenseInfo, setExpenseInfo] = useState([]);
  const [dropdown1Visible, setDropdown1Visible] = useState(false);
  const [dropdown2Visible, setDropdown2Visible] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3030/expense')
      .then(res => {
        setExpenseInfo(res.data); // Set the group info from the API response
      })
      .catch(err => setError(err.message));
  }, []);

  const handleGroupClick = (groupId) => {
    navigate('/Group_Page'); // Navigate to the group details page
  };

  const toggleDropdown1 = () => {
    setDropdown1Visible(!dropdown1Visible);
    // Hide dropdown2 if it's currently visible
    if (dropdown2Visible) setDropdown2Visible(false);
  };

  const toggleDropdown2 = () => {
    setDropdown2Visible(!dropdown2Visible);
    // Hide dropdown1 if it's currently visible
    if (dropdown1Visible) setDropdown1Visible(false);
  };

  const handleUniformSplit = () => {
    navigate('/Uniform_Split'); // Navigate to the uniform split page
  };

  // const handleNonUniformSplit = () => {
  //   navigate('/non-uniform-split-page'); // Navigate to the non-uniform split page
  // };

  // const handleViewParticipants = () => {
  //   navigate('/view-participants-page'); // Navigate to the view participants page
  // };

  // const handleAddParticipants = () => {
  //   navigate('/add-participants-page'); // Navigate to the add participants page
  // };

  // const handleRemoveParticipants = () => {
  //   navigate('/remove-participants-page'); // Navigate to the remove participants page
  // };

  return (
    <div className="Group_Page">
      <LeftNavBar />
      <Logout />
      <VerticalLine />
      <br />
      <p> <span className="page-head">Group Name</span></p><br /><br />
      <p> <span className="head">Group Expenses</span></p><br /><br />
      <div className="expense-list">
        {expenseInfo.map(expense => (
          <button key={expense.id} onClick={() => handleGroupClick(expense.id)} className="group-button">
            Ruppees {expense.amount} amount added by {expense.payer_id} on {expense.date_time} 
          </button>
        ))}
      </div>
      {error && <p>Error: {error}</p>}
      <div className="dropdowns">
        <button onClick={toggleDropdown1}>Add an Expense</button>
        {dropdown1Visible && (
          <div className="dropdown-content">
            {/* <button onClick={handleUniformSplit}>Uniform Split</button> */}
            {/* <button onClick={handleNonUniformSplit}>Non-Uniform Split</button> */}
          </div>
        )}
        <button onClick={toggleDropdown2}>Options</button>
        {dropdown2Visible && (
          <div className="dropdown-content">
            {/* <button onClick={handleViewParticipants}>View Participants</button>
            <button onClick={handleAddParticipants}>Add Participants</button>
            <button onClick={handleRemoveParticipants}>Remove Participants</button> */}
          </div>
        )}
      </div>
    </div>
  );
}

export default Group_Page;
