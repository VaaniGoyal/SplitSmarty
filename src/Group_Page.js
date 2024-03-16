// Group_Page.js

import React, { useState, useEffect } from 'react';
import { Navigation, LeftNavBar, Logout, VerticalLine } from './Template';
import './Group_Page.css'; // Import CSS file for global styles

const dummyGroups = [
  { id: 1, name: "Group 1" },
  { id: 2, name: "Group 2" },
  { id: 3, name: "Group 3" },
  { id: 4, name: "Group 4" },
  { id: 5, name: "Group 5" }
];

function Group_Page() {
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
    <div className="Group_Page">
      <Navigation />
      <LeftNavBar />
      <Logout />
      <VerticalLine />
      <br />
      <p> <span className="page-head">Your Groups</span></p><br /><br />
      <ul className="ul">
        {groups.map((group, index) => (
          <li className="li" key={group.id}>Group{index + 1}</li>
        ))}
      </ul>
      <footer></footer>
    </div>
  );
}

export default Group_Page;

