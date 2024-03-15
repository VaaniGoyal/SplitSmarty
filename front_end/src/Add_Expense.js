// //Add_Expense.js
// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import { Navigation, LeftNavBar, Logout, VerticalLine } from './Template';
// import './Add_Expense.css'; // Import CSS file for global styles

// function Add_Expense() {
//   const [splitType, setSplitType] = useState('uniform'); // State to track split type
//   const [selectedGroup, setSelectedGroup] = useState(null); // State to track selected group

//   // Function to handle radio button change for split type
//   const handleSplitChange = (event) => {
//     setSplitType(event.target.value);
//   };

//   // Function to handle radio button change for group selection
//   const handleGroupSelection = (groupId) => {
//     setSelectedGroup(groupId);
//   };

//   const [groups, setGroups] = useState([]);

//   useEffect(() => {
//     fetchGroups();
//   }, []);

//   const fetchGroups = async () => {
//     try {
//       const response = await fetch('api/groups');
//       if (!response.ok) {
//         throw new Error('Failed to fetch groups');
//       }
//       const data = await response.json();
//       setGroups(data.groups);
//     } catch (error) {
//       console.error('Error fetching groups:', error);
//     }
//   };

//   return (
//     <div className="Add_Expense">
//       <Navigation />
//       <LeftNavBar />
//       <Logout />
//       <VerticalLine />
//       <br />
//       <p> <span className="page-head">Add an expense</span></p><br /><br />
//         {/* Radio buttons for split type */}
//       <div className="split-options">
//         <label>
//           <input
//             type="radio"
//             value="uniform"
//             checked={splitType === 'uniform'}
//             onChange={handleSplitChange}
//           />
//           Uniform Split
//         </label>
//         <label>
//           <input
//             type="radio"
//             value="nonuniform"
//             checked={splitType === 'nonuniform'}
//             onChange={handleSplitChange}
//           />
//           Non-uniform Split
//         </label>
//       </div>
//       {/* Radio buttons for group selection */}
//       <ul>
//         {groups.map(group => (
//           <li key={group.id}>
//             <input
//               type="radio"
//               id={`group-${group.id}`}
//               name="selectedGroup"
//               value={group.id}
//               onChange={() => handleGroupSelection(group.id)}
//             />
//             <label htmlFor={`group-${group.id}`}>{group.name}</label>
//           </li>
//         ))}
//       </ul>
//       <footer></footer>
//     </div>
//   );
// }

// export default Add_Expense;
import React, { useState, useEffect } from 'react';
import { Navigation, LeftNavBar, Logout, VerticalLine } from './Template';
import './Add_Expense.css'; // Import CSS file for global styles

const dummyGroups = [
  { id: 1, name: "Group A" },
  { id: 2, name: "Group B" },
  { id: 3, name: "Group C" },
  { id: 4, name: "Group D" },
  { id: 5, name: "Group E" }
];

function Add_Expense() {
  const [splitType, setSplitType] = useState('uniform'); // State to track split type
  const [selectedGroup, setSelectedGroup] = useState(null); // State to track selected group

  // Function to handle radio button change for split type
  const handleSplitChange = (event) => {
    setSplitType(event.target.value);
  };

  // Function to handle radio button change for group selection
  const handleGroupSelection = (groupId) => {
    setSelectedGroup(groupId);
  };

  const [groups, setGroups] = useState([]);

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      // Simulating a delay to mimic API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setGroups(dummyGroups);
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  };

  return (
    <div className="Add_Expense">
      <Navigation />
      <LeftNavBar />
      <Logout />
      <VerticalLine />
      <br />
      <p> <span className="page-head">Add an expense</span></p><br /><br />
      {/* Radio buttons for split type */}
      <div className="split-options">
        <label>
          <input
            type="radio"
            value="uniform"
            checked={splitType === 'uniform'}
            onChange={handleSplitChange}
          />
          Uniform Split
        </label>
        <label>
          <input
            type="radio"
            value="nonuniform"
            checked={splitType === 'nonuniform'}
            onChange={handleSplitChange}
          />
          Non-uniform Split
        </label>
      </div>
      {/* Radio buttons for group selection */}
<ul className="group-list">
  {groups.map(group => (
    <li key={group.id}>
      <input
        type="radio"
        id={`group-${group.id}`}
        name="selectedGroup"
        value={group.id}
        onChange={() => handleGroupSelection(group.id)}
      />
      <label htmlFor={`group-${group.id}`}>{group.name}</label>
    </li>
  ))}
</ul>
      <footer></footer>
    </div>
  );
}

export default Add_Expense;
