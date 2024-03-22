//Group_Page.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./App.css";

function Participants() {
  const [memberInfo, setMemberInfo] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const groupID = localStorage.getItem("selectedGroupId");
  const groupName = localStorage.getItem("selectedGroupName");
  const groupDescription = localStorage.getItem("selectedGroupDescription");

  useEffect(() => {
    const fetchGroupMembers = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/sg/getMembers/${groupID}`);
        setMemberInfo(response.data);
      } catch (error) {
        setError("Failed to fetch members. Please try again.");
      }
    };

    fetchGroupMembers();
  }, [groupID]);

  const handleAddClick = () => {
    navigate("/Add_Participant");
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("userID");
    navigate("/login_page");
  };

  

  return (
    <div className="Participants">
      <br />
      <p>
        {" "}
        <span className="page-head-2">{groupName}</span>
        <p className="normal-info">{groupDescription}</p>
      </p>
      <br />
      <br />
      <div className="group-members">
      <h3>Group Members:</h3>
        {memberInfo.length > 0 ? (
          <ul>
            {memberInfo.map((member, index) => (
              <li key={index}>{member.name}</li>
            ))}
          </ul>
        ) : (
          <p>No members found.</p>
        )}
      </div>

      {error && <p className="error-message">{error}</p>}
      <button
        onClick={handleAddClick}
        className="universal-button"
        style={{ marginLeft: "25rem" }}
      >
        Add Members
      </button><br /><br />
      <button
        onClick={handleLogoutClick}
        className="universal-button"
        style={{ marginLeft: "25rem" }}
      >
        Log Out
      </button>
    </div>
  );
}

export default Participants;
