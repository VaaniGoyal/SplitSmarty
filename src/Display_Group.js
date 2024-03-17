//Display_Group.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './Display_Group.css';

function Display_Group() {
  const [groupInfo, setGroupInfo] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const location = useLocation();
  const userId = location.state && location.state.userId;

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:3030/member`)
        .then(res => {
          const matchedGroups = res.data.filter(member => member.member_id === userId);
          if (matchedGroups.length > 0) {
            const groupIdsArray = matchedGroups.map(group => group.group_id);
            // Fetch group information using group IDs
            axios.get(`http://localhost:3030/group`)
              .then(response => {
                const groups = response.data.filter(group => groupIdsArray.includes(group.group_id));
                setGroupInfo(groups);
              })
              .catch(error => setError('Failed to fetch group information'));
          } else {
            setError('No groups found for the user');
          }
        })
        .catch(err => setError(err.message));
    }
  }, [userId]);

  const handleGroupClick = (groupId) => {
    navigate('/Group_Page', { state: { groupId: groupId } });
  };

  return (
    <div className="Display_Group">
      <br />
      <p> <span className="page-head">Your Groups</span></p><br /><br />
      <div className="group-list">
        {groupInfo.map(group => (
          <button key={group.group_id} onClick={() => handleGroupClick(group.group_id)} className="group-button">
            Group Name: {group.group_describe}
          </button>
        ))}
      </div>
      {error && <p>Error: {error}</p>}
    </div>
  );
}

export default Display_Group;
