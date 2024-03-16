// // // Create_Acc.js

import React, { useState } from 'react';
import './Create_Acc.css'; 
import { Link, useNavigate } from 'react-router-dom';

function Create_Acc() {
  const [userData, setUserData] = useState({ firstName: '', email: '', contactNo: '', password: '', confirmPassword: '', upiId: '' });
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [upi, setUPI] = useState('');
  const history = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignIn = async () => {
    if (password !== confirmpassword) {
      setErrorMessage("Password and Confirm Password do not match.");
      return false; // Prevent form submission
    }try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      if (response.ok) {
        // add data to database
        history.push('/User_Page'); // Navigate to the next page if user creation is successful
      } else {
        console.error('Failed to create user:', response.statusText);
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
         <input type="text" name="firstName" placeholder="Your name" onChange={(e) => setName(e.target.value)} /><br /><br />
         <span style={{ fontSize: '1.2rem', fontFamily: 'Overpass, Arial, sans-serif', color: '#444b59', marginRight: '7.3rem' }}>Email Address</span>
         <input type="text" name="email" placeholder="Your email address" onChange={(e) => setEmail(e.target.value)} /><br /><br />
         <span style={{ fontSize: '1.2rem', fontFamily: 'Overpass, Arial, sans-serif', color: '#444b59', marginRight: '8.6rem' }}>Contact No.</span>
         <input type="text" name="contactNo" placeholder="Your contact no." onChange={(e) => setContact(e.target.value)} /><br /><br />
         <span style={{ fontSize: '1.2rem', fontFamily: 'Overpass, Arial, sans-serif', color: '#444b59', marginRight: '9.6rem' }}>Password</span>
         <input type="password" name="password" placeholder="Your password" onChange={(e) => setPassword(e.target.value)} /><br /><br />
         <span style={{ fontSize: '1.2rem', fontFamily: 'Overpass, Arial, sans-serif', color: '#444b59', marginRight: '5rem' }}>Confirm Password</span>
         <input type="password" name="confirmPassword" placeholder="Confirm your password" onChange={(e) => setConfirmPassword(e.target.value)} /><br /><br />
         <span style={{ fontSize: '1.2rem', fontFamily: 'Overpass, Arial, sans-serif', color: '#444b59', marginRight: '11rem' }}>UPI ID</span>
         <input type="text" name="upiId" placeholder="Your UPI Id" onChange={(e) => setUPI(e.target.value)} /><br /><br />
         <button onClick={togglePasswordVisibility}></button>
      </div>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <Link to='/User_Page'><button onClick={handleSignIn} id="sign-in" className="sign-in-button" style={{ marginLeft: '4rem', marginRight: '5rem' }}>Sign In</button></Link><br /><br />
    </div>
  );
}
function togglePasswordVisibility() {
    var passwordField = document.getElementById("password");
    if (passwordField.type === "password") {
        passwordField.type = "text";
        document.querySelector("button").textContent = "Hide Password";
    } else {
        passwordField.type = "password";
        document.querySelector("button").textContent = "Show Password";
    }
}
export default Create_Acc;

