


import React, { useState, useEffect } from 'react';
import { LeftNavBar, Logout, VerticalLine } from './Template';
import { Link } from 'react-router-dom';
import './Display_Group.css'; // Import CSS file for global styles

const dummyGroupInfo = [
  { id: 1, name: "Group-1" },
  { id: 2, name: "Group-2" }
];

function Display_Group() {
  // Define state to store group info
  const [groupInfo, setGroupInfo] = useState(null);

  // Fetch Group info from the backend when the component mounts
  useEffect(() => {
    fetchGroupInfo();
  }, []);

  // Function to fetch group info from the backend
  const fetchGroupInfo = async () => {
    try {
      // Simulating a delay to mimic API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setGroupInfo(dummyGroupInfo);
    } catch (error) {
      console.error('Error fetching group info:', error);
    }
  };

  return (
    <div className="Display_Group">
      <LeftNavBar />
      <Logout />
      <VerticalLine />
      <br />
      <p> <span className="page-head">Your Groups</span></p><br /><br />
      <div className="group-button">
      
        {groupInfo && groupInfo.map(group => (
          <React.Fragment key={group.id}>
            <Link to="/Group_Page"><button className="group-button" >{group.name}</button></Link>
          </React.Fragment>
          ))}
      </div>
    </div>
  );
}

export default Display_Group;

