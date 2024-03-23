//Uniform_Split.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./App.css";

function Uniform_Split() {
  const [inputData, setInputData] = useState({
    amount: "",
    type: "",
  });
  const [selectedParticipants, setSelectedParticipants] = useState([]);
  const [participantShares, setParticipantShares] = useState(new Map());
  const [members, setMembers] = useState([]);
  const [error, setError] = useState("");
  const userID = localStorage.getItem("userID");
  const groupID = localStorage.getItem("selectedGroupId");
  const groupName = localStorage.getItem("selectedGroupName");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/sg/getMembers/${groupID}`
        );
        setMembers(response.data);
      } catch (error) {
        setError("Failed to fetch members. Please try again.");
      }
    };

    fetchMembers();
  }, [groupID]);

  const handleCheckboxChange = (userId) => {
    setSelectedParticipants((prevSelected) => {
      if (prevSelected.includes(userId)) {
        return prevSelected.filter((id) => id !== userId);
      } else {
        return [...prevSelected, userId];
      }
    });
  };

  useEffect(() => {
    const totalSelectedParticipants = selectedParticipants.length;
    const splitAmount =
      totalSelectedParticipants > 0
        ? (inputData.amount / totalSelectedParticipants).toFixed(2)
        : 0;
    const updatedParticipantShares = new Map();
    selectedParticipants.forEach((id) => {
      updatedParticipantShares.set(id, splitAmount);
    });
    setParticipantShares(updatedParticipantShares);
  }, [selectedParticipants, inputData.amount]);

  const handleAddExpense = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:5000/api/exp/groups/${groupID}/expenses/${userID}`,
        {
          amount: inputData.amount,
          type: inputData.type,
          expenses: Array.from(participantShares.entries())
        }
      );
      // Handle success scenario
    } catch (error) {
      setError("Failed to add expense. Please try again.");
    }
  };

  return (
    <div className="Uniform_Split">
      <br />
      <p>
        <span className="page-head-1">{groupName}</span>
      </p>
      <br />
      <br />
      <div className="normal-info">
        <form onSubmit={handleAddExpense}>
          <div>
            <label htmlFor="amount" className="normal-info">
              Amount
            </label>
            <input
              type="number"
              name="amount"
              placeholder="amount"
              value={inputData.amount}
              onChange={(e) =>
                setInputData({ ...inputData, amount: e.target.value })
              }
            />
            <br />
            <br />
          </div>
          <div>
            <label htmlFor="type" className="normal-info">
              Type
            </label>
            <input
              type="text"
              name="type"
              placeholder="type"
              value={inputData.type}
              onChange={(e) =>
                setInputData({ ...inputData, type: e.target.value })
              }
            />
            <br />
            <br />
          </div>
          <div>
            <h3>Select Participants:</h3>
            {members.map((member) => (
              <div key={member.user_id}>
                <input
                  type="checkbox"
                  id={`${member.user_id}`}
                  value={member.user_id}
                  checked={selectedParticipants.includes(member.user_id)}
                  onChange={() => handleCheckboxChange(member.user_id)}
                />
                <label htmlFor={`${member.user_id}`}>{member.name}</label>
                <input
                  type="text"
                  value={participantShares.get(member.user_id) || ""}
                  readOnly
                />
              </div>
            ))}
          </div>
          <div>
            <button type="submit" className="universal-button">
              Add Expense
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Uniform_Split;


