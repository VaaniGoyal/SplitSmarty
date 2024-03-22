//Create_Group.js
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./App.css";

function Create_Group() {
  const [error, setError] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state && location.state.userId;
  const [groupData, setGroupData] = useState({
    group_describe: "",
  });

  useEffect(() => {
    // Fetch all users
    axios
      .get("http://localhost:5000/user")
      .then((response) => {
        setAllUsers(response.data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  const handleCreateGroup = async (event) => {
    event.preventDefault();
    try {
      // Fetch the group data from the server to determine the next group_id
      const response = await axios.get("http://localhost:5000/group");
      const groups = response.data;
      const maxGroupId = Math.max(
        ...groups.map((group) => parseInt(group.group_id))
      );
      const groupId = maxGroupId + 1;
      const groupDataWithId = { group_id: groupId, ...groupData };

      // Send the form data to the server to create the group
      const createGroupResponse = await axios.post(
        "http://localhost:5000/group",
        groupDataWithId
      );

      if (createGroupResponse.status === 201) {
        // Add selected users to the group members
        await Promise.all(
          selectedUsers.map(async (user) => {
            await axios.post("http://localhost:5000/members", {
              group_id: groupId,
              user_id: user.user_id,
            });
          })
        );

        alert("Group Created Successfully!");
        navigate("/User_Page", { state: { userId: userId } });
      } else {
        console.error(
          "Failed to create group:",
          createGroupResponse.statusText
        );
      }
    } catch (error) {
      console.error("Error creating group:", error);
    }
  };

  const handleCheckboxChange = (user) => {
    setSelectedUsers((prevUsers) => {
      if (prevUsers.some((prevUser) => prevUser.user_id === user.user_id)) {
        // If user is already selected, remove it
        return prevUsers.filter(
          (prevUser) => prevUser.user_id !== user.user_id
        );
      } else {
        // If user is not selected, add it
        return [...prevUsers, user];
      }
    });
  };

  return (
    <div className="Create_Group">
      <p>
        {" "}
        <span className="page-head-2">User Profile</span>
      </p>
      <br />
      <br />
      {error && <p>Error: {error}</p>}
      <form onSubmit={handleCreateGroup}>
        <div>
          <label htmlFor="name" className="normal-info">
            Enter Group Name{" "}
          </label>
          <input
            type="text"
            name="name"
            placeholder="your group name"
            onChange={(e) =>
              setGroupData({ ...groupData, group_describe: e.target.value })
            }
          ></input>
          <br />
          <br />
        </div>
        <p className="normal-info">Select Users (Select your name as well)</p>
        {allUsers.map((user) => (
          <div key={user.user_id}>
            <input
              type="checkbox"
              className="normal-info"
              id={user.user_id}
              checked={selectedUsers.some(
                (selectedUser) => selectedUser.user_id === user.user_id
              )}
              onChange={() => handleCheckboxChange(user)}
            />
            <label htmlFor={user.user_id} className="normal-info">
              {user.name}
            </label>
          </div>
        ))}
        <br />
        <button
          type="submit"
          id="sign-in"
          className="universal-button"
          style={{ marginLeft: "1rem", marginRight: "5rem" }}
        >
          Done
        </button>
        <br />
        <br />
      </form>
    </div>
  );
}

export default Create_Group;
