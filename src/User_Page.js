// User_Page.js

import React, { useState, useEffect } from 'react';
import { LeftNavBar, Logout, VerticalLine } from './Template';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './User_Page.css'; // Import CSS file for global styles

function User_Page() {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3030/user')
      .then(res => {
        // Assuming users are stored in an array and you want the second user
        if (res.data && res.data.length >= 2) {
          setUserInfo(res.data[1]); // Index 1 corresponds to the second user
        } else {
          setError('User not found');
        }
      })
      .catch(err => setError(err.message));
  }, []);
  
  

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
          <p>Contact No: {userInfo.contact}</p>
          <p>Email Address: {userInfo.email}</p>
          <p>UPI ID: {userInfo.upi_id}</p>
        </div>
      )}
      {error && <p>Error: {error}</p>}
    </div>
  );
}

export default User_Page;
