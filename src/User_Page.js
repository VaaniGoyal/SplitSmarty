// User_Page.js

import React, { useState, useEffect } from 'react';
import { LeftNavBar, Logout, VerticalLine } from './Template';
import { Link } from 'react-router-dom';
import './User_Page.css'; // Import CSS file for global styles

const dummyUserInfo = {
  name: "John Doe",
  contactNo: "123-456-7890",
  email: "john.doe@example.com",
  upi: "12344"
};

function User_Page() {
  // Define state to store user info
  const [userInfo, setUserInfo] = useState(null);

  // Fetch user info from the backend when the component mounts
  useEffect(() => {
    fetchUserInfo();
  }, []);

  // Function to fetch user info from the backend
  const fetchUserInfo = async () => {
    try {
      // Simulating a delay to mimic API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUserInfo(dummyUserInfo);
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  return (
    <div className="User_Page">
      <LeftNavBar />
      <Logout />
      <VerticalLine />
      <br />
      <p> <span className="page-head">User Profile</span></p><br /><br />
      {userInfo && (
        <div className="user-info">
          <p>Name: {userInfo.name}</p>
          <p>Contact No: {userInfo.contactNo}</p>
          <p>Email Address: {userInfo.email}</p>
          <p>UPI ID: {userInfo.upi}</p>
        </div>
      )}
    </div>
  );
}

export default User_Page;
