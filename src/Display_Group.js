import React, { useState, useEffect } from 'react';
import { LeftNavBar, Logout, VerticalLine } from './Template';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Don't forget to import axios
import './Display_Group.css'; // Import CSS file for global styles

function Display_Group() {
  const [groupInfo, setGroupInfo] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3030/group')
      .then(res => {
        setGroupInfo(res.data); // Set the group info from the API response
      })
      .catch(err => setError(err.message));
  }, []);

  const handleGroupClick = (groupId) => {
    navigate('/Group_Page'); // Navigate to the group details page
  };

  return (
    <div className="Display_Group">
      <LeftNavBar />
      <Logout />
      <VerticalLine />
      <br />
      <p> <span className="page-head">Your Groups</span></p><br /><br />
      <div className="group-list">
        {groupInfo.map(group => (
          <button key={group.id} onClick={() => handleGroupClick(group.id)} className="group-button">
            {group.group_describe}
          </button>
        ))}
      </div>
      {error && <p>Error: {error}</p>}
    </div>
  );
}

export default Display_Group;
