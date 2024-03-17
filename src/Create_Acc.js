import React, { useState } from 'react';
import './Create_Acc.css'; 
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for HTTP requests

function Create_Acc() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactNo: '',
    password: '',
    self_describe: '',
    upiId: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignIn = async () => {
    try {
      const { password, confirmPassword, ...userData } = formData; // Exclude confirmPassword
      if (password !== confirmPassword) {
        setErrorMessage("Password and Confirm Password do not match.");
        return; // Prevent form submission
      }

      // Fetch the user data from the server
      const response = await axios.get('http://localhost:3030/user');
      const users = response.data;

      // Find the maximum userId to generate the next userId
      const maxUserId = Math.max(...users.map(user => parseInt(user.user_id)));

      // Generate the next userId
      const userId = maxUserId + 1;

      // Add the userId to the form data
      const userDataWithId = { user_id: userId, ...userData };

      // Send the form data to the server to create the user
      const createUserResponse = await axios.post('http://localhost:3030/user', userDataWithId);

      if (createUserResponse.status === 201) {
        console.log('User created successfully');
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
        <span style={{ fontSize: '1.2rem', fontFamily: 'Overpass, Arial, sans-serif', color: '#444b59', marginRight: '9.3rem' }}>Your Name</span>
        <input type="text" name="name" placeholder="Your name" onChange={handleInputChange} /><br /><br />
        <span style={{ fontSize: '1.2rem', fontFamily: 'Overpass, Arial, sans-serif', color: '#444b59', marginRight: '7.3rem' }}>Email Address</span>
        <input type="text" name="email" placeholder="Your email address" onChange={handleInputChange} /><br /><br />
        <span style={{ fontSize: '1.2rem', fontFamily: 'Overpass, Arial, sans-serif', color: '#444b59', marginRight: '8.6rem' }}>Contact No.</span>
        <input type="text" name="contactNo" placeholder="Your contact no." onChange={handleInputChange} /><br /><br />
        <span style={{ fontSize: '1.2rem', fontFamily: 'Overpass, Arial, sans-serif', color: '#444b59', marginRight: '9.6rem' }}>Password</span>
        <input type="password" name="password" id="password" placeholder="Your password" onChange={handleInputChange} /><br /><br />
        <span style={{ fontSize: '1.2rem', fontFamily: 'Overpass, Arial, sans-serif', color: '#444b59', marginRight: '5rem' }}>Confirm Password</span>
        <input type="password" name="confirmPassword" placeholder="Confirm your password" onChange={handleInputChange} /><br /><br />
        <span style={{ fontSize: '1.2rem', fontFamily: 'Overpass, Arial, sans-serif', color: '#444b59', marginRight: '11rem' }}>UPI ID</span>
        <input type="text" name="upiId" placeholder="Your UPI Id" onChange={handleInputChange} /><br /><br />
        <span style={{ fontSize: '1.2rem', fontFamily: 'Overpass, Arial, sans-serif', color: '#444b59', marginRight: '5.5rem' }}>Describe Yourself</span>
        <input type="text" name="self_describe" placeholder="Describe yourself" onChange={handleInputChange} /><br /><br />
      </div>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <button onClick={handleSignIn} id="sign-in" className="sign-in-button" style={{ marginLeft: '10rem', marginRight: '5rem' }}>Sign In</button><br /><br />
    </div>
  );
}

export default Create_Acc;
