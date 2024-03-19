//Create_Acc.js
import axios from 'axios';
import React, { useState } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import './App.css';

function Create_Acc(){
    const [inputData, setInputData]=useState({
        name: '',
        password: '',
        self_describe: '',
        email: '',
        upi_id: '',
        contact: ''
    })
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
          // Fetch the user data from the server to determine the next user_id
          const response = await axios.get('http://localhost:3030/user');
          const users = response.data;

          // Find the maximum userId to generate the next userId
          const maxUserId = Math.max(...users.map(user => parseInt(user.user_id)));

          // Generate the next userId
          const userId = maxUserId + 1;

          // Add the userId to the form data
          const userDataWithId = { user_id: userId, ...inputData };

          // Send the form data to the server to create the user
          const createUserResponse = await axios.post('http://localhost:3030/user', userDataWithId);

          if (createUserResponse.status === 201) {
              alert("Data Posted Successfully!")
              navigate('/User_Page', { state: { userId: userId } });
          } else {
              console.error('Failed to create user:', createUserResponse.statusText);
          }
      } catch (error) {
          console.error('Error creating user:', error);
      }
  };
    return (
      <div className="Create_Acc">
        <br />
        <p> <span className="page-head">Split Smarty</span></p><br /><br />
        <span style={{ fontSize: '1.5rem', fontFamily: 'Overpass, Arial, sans-serif', color: '#444b59', fontWeight: 'bold' }}>CREATE YOUR ACCOUNT!</span><br /><br /><br></br>
        <div className="input-container">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" style={{ fontSize: '1.2rem', fontFamily: 'Overpass, Arial, sans-serif', color: '#444b59', marginRight: '8.5rem' }}>Name</label>
                <input type="text" name="name" placeholder='your name' onChange={e => setInputData({...inputData, name: e.target.value})}></input><br /><br />
              </div>
              <div>
                <label htmlFor="email" style={{ fontSize: '1.2rem', fontFamily: 'Overpass, Arial, sans-serif', color: '#444b59', marginRight: '7.1rem' }}>Email ID</label>
                <input type="text" name="email" placeholder='your email' onChange={e => setInputData({...inputData, email: e.target.value})}></input><br /><br />
              </div>
              <div>
                <label htmlFor="contact" style={{ fontSize: '1.2rem', fontFamily: 'Overpass, Arial, sans-serif', color: '#444b59', marginRight: '5.2rem' }}>Contact No.</label>
                <input type="text" name="contact" placeholder='your contact no.' onChange={e => setInputData({...inputData, contact: e.target.value})}></input><br /><br />
              </div>
              <div>
                <label htmlFor="password" style={{ fontSize: '1.2rem', fontFamily: 'Overpass, Arial, sans-serif', color: '#444b59', marginRight: '6.25rem' }}>Passowrd</label>
                <input type="text" name="password" placeholder='your password' onChange={e => setInputData({...inputData, password: e.target.value})}></input><br /><br />
              </div>
              <div>
                <label htmlFor="upi_id" style={{ fontSize: '1.2rem', fontFamily: 'Overpass, Arial, sans-serif', color: '#444b59', marginRight: '7.9rem' }}>UPI ID</label>
                <input type="text" name="upi_id" placeholder='your UPI ID' onChange={e => setInputData({...inputData, upi_id: e.target.value})}></input><br /><br />
              </div>
              <div>
                <label htmlFor="self_describe" style={{ fontSize: '1.2rem', fontFamily: 'Overpass, Arial, sans-serif', color: '#444b59', marginRight: '2rem' }}>Describe Yourself</label>
                <input type="text" name="self_describe" placeholder='describe yourself' onChange={e => setInputData({...inputData, self_describe: e.target.value})}></input><br /><br />
              </div>
              <button id="sign-in" className="universal-button" style={{ marginLeft: '10rem', marginRight: '5rem' }}>Sign In</button><br /><br />
            </form>
        </div>
      </div>
    );
}

export default Create_Acc;

