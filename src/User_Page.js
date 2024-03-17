
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './User_Page.css'; // Import CSS file for global styles

function User_Page() {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const location = useLocation();
  const userId = location.state && location.state.userId;

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:3030/user`)
        .then(res => {
          const matchedUser = res.data.find((d) => d.user_id === userId);
          if (matchedUser) {
            setUserInfo(matchedUser);
          } else {
            setError('User not found');
          }
        })
        .catch(err => setError(err.message));
    }
  }, [userId]);

  const handleViewGroupsClick = () => {
    navigate('/Display_Group', { state: { userId: userId } });
  };

  const handleLogoutClick = () => {
    // Handle logic to logout
  };

  return (
    <div className="User_Page">
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
      
      {/* Buttons */}
      <div className="button-container">
            <button className="button" onClick={handleViewGroupsClick}>View Groups</button><br/><br />
            <button className="button" onClick={handleLogoutClick}>Logout</button>
      </div>

    </div>
  );
}

export default User_Page;
