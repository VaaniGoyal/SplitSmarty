import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './Participants.css';

function Participants() {
  const [memberInfo, setMemberInfo] = useState([]);
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const groupId = location.state && location.state.groupId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch members and users data
        const [membersRes, usersRes] = await Promise.all([
          axios.get('http://localhost:3030/members'),
          axios.get('http://localhost:3030/user')
        ]);

        const membersData = membersRes.data;
        const usersData = usersRes.data;

        // Filter members based on groupId matching
        const matchedMembers = membersData.filter(member => member.group_id === groupId);

        // Map member_id to user_id and get user names
        const memberNames = matchedMembers.map(member => {
          const user = usersData.find(user => user.user_id === member.member_id);
          return user ? user.name : 'Unknown User';
        });

        setMemberInfo(memberNames);
        setError(''); // Reset error if members are successfully fetched
      } catch (error) {
        setError('Failed to fetch members: ' + error.message);
      }
    };

    if (groupId) {
      fetchData();
    }
  }, [groupId]);
  const handleLogoutClick = () => {
    // Logic to clear user session data and redirect to login page
    // For example, you can use localStorage to clear user data
    localStorage.removeItem('userId');
    navigate('/login_page');
  };

  return (
    <div className="Participants">
      <br />
      <p> <span className="page-head">Group Members</span></p><br /><br />
      <div className="member-list">
        {memberInfo.map((name, index) => (
          <div key={index}>
            <p>{name}</p>
          </div>
        ))}
        {error && <p>Error: {error}</p>}
      </div>
      <div className="button-container">
            <button className="button" >Add Participant</button><br/><br />
      </div>
      <div className="button-container">
            <button className="button" >Remove Participant</button><br/><br />
      </div>
      <div className="button-container">
          <button className="button" onClick={handleLogoutClick}>Log out</button>
      </div>
    </div>
  );
}

export default Participants;
