//Display_Group.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import './App.css';

function Display_Group() {
  const [groupNames, setGroupNames] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const userID = localStorage.getItem("userID");

  useEffect(() => {
    const fetchUserGroups = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/sg/getUserGroups/${userID}`);
        setGroupNames(response.data);
      } catch (error) {
        setError("Failed to fetch user groups. Please try again.");
      }
    };

    fetchUserGroups();
  }, [userID]);

  const handleGroupClick = (groupName) => {
    navigate(`/group/${groupName}`);
  };

  return (
    <div>
      <p className="page-head-2">Your Groups</p>
      {groupNames.length === 0 ? (
        <p>No groups found for the user.</p>
      ) : (
        <div>
          {groupNames.map((groupName, index) => (
            <button key={index} onClick={() => handleGroupClick(groupName)} className="group-button">
              Group Name: {groupName}
            </button>
          ))}
        </div>
      )}
      {error && <p>Error: {error}</p>}
    </div>
  );
}

export default Display_Group;
