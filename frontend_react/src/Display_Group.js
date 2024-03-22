//Display_Group.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './App.css';

function Display_Group() {
  const [groupNames, setGroupNames] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const userID = localStorage.getItem("userID");

  useEffect(() => {
    const fetchUserGroups = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/sg/getUserGroups/${userID}");
        setGroupNames(response.data);
      } catch (error) {
        setError("Failed to fetch user groups. Please try again.");
      }
    };

    fetchUserGroups();
  }, [userID]);

  const handleGroupClick = (groupName, groupId, groupDescribe) => {
    localStorage.setItem("selectedGroupId", groupId);
    localStorage.setItem("selectedGroupName", groupName);
    navigate('/Group_Page');
  };
  

  return (
    <div>
      <p className="page-head-2">Your Groups</p>
      {groupNames.length === 0 ? (
        <p>No groups found for the user.</p>
      ) : (
        <div>
          {groupNames.map((group, index) => (
            <button key={index} onClick={() => handleGroupClick(group.name, group.group_id, group.group_describe)} className="group-button">
              Group Name: {group.name}
            </button>
          ))}
        </div>
      )}
      {error && <p>Error: {error}</p>}
    </div>
  );
}

export default Display_Group;