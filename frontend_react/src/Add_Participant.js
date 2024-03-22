import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function Add_Participant() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const groupID = localStorage.getItem("selectedGroupId");
  const groupName = localStorage.getItem("selectedGroupName");
  const groupDescription = localStorage.getItem("selectedGroupDescription");

  const handleAddUserToGroup = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/sg/addMember/${groupID}`,
        {
          email: email,
        }
      );
      // console.log("Hello World");
      // console.log(response);
      if (response.status === 200) {
        setEmail("");
        setError("");
      } else {
        setError("Failed to add user to group.");
      }
    } catch (error) {
      console.log(error);
      if (error.response.status !== 500) {
        setError(error.response.data.error);
      } else {
        setError("Failed to add user to group. Server Not Responding ");
      }
    }
  };

  return (
    <div className="Add_Participant">
      <br />
      <p>
        {" "}
        <span className="page-head-2">{groupName}</span>
        <p className="normal-info">{groupDescription}</p>
      </p>
      <br />
      <br />
      <label htmlFor="email">Enter user's email:</label>
      <input
        type="text"
        id="email"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="example@example.com"
      />
      <button className="universal-button" onClick={handleAddUserToGroup}>
        Add
      </button>
      {error && <p>Error: {error}</p>}
    </div>
  );
}

export default Add_Participant;
