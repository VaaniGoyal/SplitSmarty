


import React, { useState, useEffect } from 'react';
import { LeftNavBar, Logout, VerticalLine } from './Template';
import { Link } from 'react-router-dom';
import './Group_Page.css'; // Import CSS file for global styles

const dummyexpenseInfo = [
  { id: 1, name: "expense-1" },
  { id: 2, name: "expense-2" }
];

function Group_Page() {
  // Define state to store group info
  const [expenseInfo, setexpenseInfo] = useState(null);

  // Fetch Group info from the backend when the component mounts
  useEffect(() => {
    fetchexpenseInfo();
  }, []);

  // Function to fetch group info from the backend
  const fetchexpenseInfo = async () => {
    try {
      // Simulating a delay to mimic API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setexpenseInfo(dummyexpenseInfo);
    } catch (error) {
      console.error('Error fetching expense info:', error);
    }
  };

  return (
    <div className="Group_Page">
      <LeftNavBar />
      <Logout />
      <VerticalLine />
      <br />
      <p> <span className="page-head">Group Name</span></p><br /><br />
      <div className="expense-button">
      
        {expenseInfo && expenseInfo.map(expense => (
          <React.Fragment key={expense.id}>
            <button className="expense-button" >{expense.name}</button>
          </React.Fragment>
          ))}
      </div>
    </div>
  );
}

export default Group_Page;

