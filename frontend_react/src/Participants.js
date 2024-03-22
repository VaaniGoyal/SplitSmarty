//Participants.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./App.css";

function Participants() {
  const [memberInfo, setMemberInfo] = useState([]);
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const groupId = location.state && location.state.groupId;
  const userId = location.state && location.state.userId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch members and users data
        const [membersRes, usersRes] = await Promise.all([
          axios.get("http://localhost:5000/members"),
          axios.get("http://localhost:5000/user"),
        ]);

        const membersData = membersRes.data;
        const usersData = usersRes.data;

        // Filter members based on groupId matching
        const matchedMembers = membersData.filter(
          (member) => member.group_id === groupId
        );

        // Map member_id to user_id and get user names
        const memberNames = matchedMembers.map((member) => {
          const user = usersData.find(
            (user) => user.user_id === member.member_id
          );
          return user ? user.name : "Unknown User";
        });

        setMemberInfo(memberNames);
        setError(""); // Reset error if members are successfully fetched
      } catch (error) {
        setError("Failed to fetch members: " + error.message);
      }
    };

    if (groupId) {
      fetchData();
    }
  }, [groupId]);
  const handleAddParticipantClick = () => {
    navigate("/Add_Participant", {
      state: { groupId: groupId, userId: userId },
    });
  };
  const handleLogoutClick = () => {
    localStorage.removeItem("userId");
    navigate("/login_page");
  };

  return (
    <div className="Participants">
      <br />
      <p>
        {" "}
        <span className="page-head-2">Group Members</span>
      </p>
      <br />
      <br />
      <div>
        {memberInfo.map((name, index) => (
          <div key={index}>
            <p className="normal-info" style={{ marginLeft: "30rem" }}>
              {name}
            </p>
          </div>
        ))}
        {error && <p>Error: {error}</p>}
      </div>
      <button
        id="add-member"
        onClick={handleAddParticipantClick}
        className="universal-button"
        style={{ marginLeft: "25rem" }}
      >
        Add Participant
      </button>
      <br />
      <br />
      <button
        onClick={handleLogoutClick}
        id="log-out"
        className="universal-button"
        style={{ marginLeft: "27rem" }}
      >
        Log Out
      </button>
      <br />
      <br />
    </div>
  );
}

export default Participants;
