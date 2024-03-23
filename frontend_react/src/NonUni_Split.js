//NonUni_Split.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./App.css";

function NonUni_Split() {
  const [inputData, setInputData] = useState({
    amount: "",
    type: "",
  });
  const [participantExpenses, setParticipantExpenses] = useState(new Map());
  const [members, setMembers] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
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

  const handleExpenseChange = (userId, value) => {
    const updatedExpenses = new Map(participantExpenses);
    updatedExpenses.set(userId, value);
    setParticipantExpenses(updatedExpenses);
  };

  const handleAddExpense = async (amount, type, expensesMap) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/exp/groups/${groupID}/expenses/${userID}`,
        {
          amount,
          type,
          expenses: Array.from(expensesMap.entries()), // Convert map to array of [key, value] pairs
        }
      );
      setSuccess(true);
      // Redirect to Group Page after 2 seconds
      setTimeout(() => {
        navigate("/Group_Page") // Adjust the route as needed
      }, 2000);
    } catch (error) {
      setError("Failed to add expense. Please try again.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddExpense(inputData.amount, inputData.type, participantExpenses);
  };

  return (
    <div className="NonUni_Split">
      <br />
      <p>
        <span className="page-head-1">{groupName}</span>
      </p>
      <br />
      <br />
      <div className="normal-info">
        <form onSubmit={handleSubmit}>
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
            <h3>Enter Expenses:</h3>
            {members.map((member) => (
              <div key={member.user_id}>
                <label htmlFor={`${member.user_id}`}>{member.name}</label>
                <input
                  type="number"
                  id={`${member.user_id}`}
                  value={participantExpenses.get(member.user_id) || ""}
                  onChange={(e) =>
                    handleExpenseChange(member.user_id, e.target.value)
                  }
                />
              </div>
            ))}
          </div>
          <div>
            <button type="submit" className="universal-button">
              Add Expense
            </button>
          </div>
          {success && <p>Expense added successfully. Redirecting...</p>}
          {error && <p>{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default NonUni_Split;

