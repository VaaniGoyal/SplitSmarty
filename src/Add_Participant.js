// Add_Participant.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './App.css';

function Add_Participant() {
  const [members, setMembers] = useState([]);
  const [usersNotInGroup, setUsersNotInGroup] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const groupId = location.state && location.state.groupId;
  const userId = location.state && location.state.userId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch members and users data
        const [membersRes, usersRes] = await Promise.all([
          axios.get(`http://localhost:3030/members?group_id=${groupId}`),
          axios.get('http://localhost:3030/user')
        ]);

        const membersData = membersRes.data;
        const usersData = usersRes.data;

        // Set members of the group
        setMembers(membersData);

        // Get users who are not members of the group
        const usersNotInGroup = usersData.filter(user => !membersData.some(member => member.member_id === user.user_id));
        
        setUsersNotInGroup(usersNotInGroup);
        setError(''); // Reset error if data is successfully fetched
      } catch (error) {
        setError('Failed to fetch data: ' + error.message);
      }
    };

    if (groupId) {
      fetchData();
    }
  }, [groupId]);

  const handleAddUserToGroup = async (userId) => {
    try {
      // Add the user to the group
      await axios.post('http://localhost:3030/members', { group_id: groupId, member_id: userId });
      // Refresh data after adding the user to the group
      const updatedUsersNotInGroup = usersNotInGroup.filter(user => user.user_id !== userId);
      setUsersNotInGroup(updatedUsersNotInGroup);
      // Refresh members list
      const updatedMembers = [...members, { group_id: groupId, member_id: userId }];
      setMembers(updatedMembers);
    } catch (error) {
      setError('Failed to add user to group: ' + error.message);
    }
  };

  const handleLogoutClick = () => {
    localStorage.removeItem('userId');
    navigate('/login_page');
  };

  return (
    <div className="Add_Participant">
      <br />
      <p> <span className="page-head-2">Group Members</span></p><br /><br />
      <div className="normal-info">
        {members.map((member, index) => (
          <div key={index}>
            <p>{member.name}</p>
          </div>
        ))}
        {error && <p>Error: {error}</p>}
      </div>
      <div className='normal-info'>
      Add Members to Group: 
        <ul className='normal-info'>
            {usersNotInGroup.map(user => (
            <li key={user.user_id}>
            {user.name}
            <button className="universal-button" onClick={() => handleAddUserToGroup(user.user_id)}>Add</button>
            </li>
          ))}
        </ul>
      </div>
      <button id="log-out" onClick={handleLogoutClick} className="universal-button" style={{ marginLeft: '1.5rem', marginRight: '5rem' }}>Log Out</button><br /><br />
    </div>
  );
}

export default Add_Participant;
