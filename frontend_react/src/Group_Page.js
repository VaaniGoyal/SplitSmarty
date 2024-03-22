//Group_Page.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./App.css";

function Group_Page() {
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

  const handleViewClick = () => {
    navigate("/Participants");
  };
  const handleViewExpenseClick = () => {
    // navigate("/Participants");
  };
  const handleLogoutClick = () => {
    localStorage.removeItem("userID");
    navigate("/login_page");
  };

  

  return (
    <div className="Group_Page">
      <br />
      <p>
        {" "}
        <span className="page-head-2">{groupName}</span>
        <p className="normal-info">{groupDescription}</p>
      </p>
      <br />
      <br />
      

      {error && <p className="error-message">{error}</p>}
      <button
        onClick={handleViewClick}
        className="universal-button"
        style={{ marginLeft: "25rem" }}
      >
        View Members
      </button><br /><br />
      <button
        onClick={handleViewExpenseClick}
        className="universal-button"
        style={{ marginLeft: "25rem" }}
      >
        View Expenses
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

export default Group_Page;
