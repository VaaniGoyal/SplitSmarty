//User_Page.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './App.css'

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
  const handleCreateGroupClick = () => {
    navigate('/Create_Group', { state: { userId: userId } });
  };
  const handleSettleExpensesClick = () => {
    navigate('/Settle_Expense', { state: { userId: userId } });
  };
  const handleLogoutClick = () => {
    // Logic to clear user session data and redirect to login page
    // For example, you can use localStorage to clear user data
    localStorage.removeItem('userId');
    navigate('/login_page');
  };

  return (
    <div className="User_Page">
      <br />
      <p> <span className="page-head-2" >User Profile</span></p><br /><br />
      {userInfo && (
        <div className="normal-info">
          <p>Name: {userInfo.name}</p>
          <p>Contact No: {userInfo.contact}</p>
          <p>Email Address: {userInfo.email}</p>
          <p>UPI ID: {userInfo.upi_id}</p>
        </div>
      )}
      {error && <p>Error: {error}</p>}
      <button onClick={handleViewGroupsClick} id="view-groups" className="universal-button" style={{ marginLeft: '1.5rem', marginRight: '5rem'}}>View Groups</button>
      <button onClick={handleCreateGroupClick} id="create-groups" className="universal-button" style={{ marginLeft: '1.5rem', marginRight: '5rem'}}>Create Group</button>
      <button onClick={handleSettleExpensesClick} id="view-expenses" className="universal-button" style={{ marginLeft: '1.5rem', marginRight: '5rem'}}>View your expenses</button><br /><br /><br /><br />
      <button onClick={handleLogoutClick} id="log-out" className="universal-button" style={{ marginLeft: '25rem'}}>Log Out</button>
    </div>
  );
}

export default User_Page;
