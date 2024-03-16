// Create_Acc.js

import React from 'react';
import './Create_Acc.css'; 
import { Link } from 'react-router-dom';

function Create_Acc() {
  return (
    <div className="Create_Acc">
      <br />
      <p> <span className="page-head">Split Smarty</span></p><br /><br />
      <span style={{ fontSize: '1.5rem', fontFamily: 'Overpass, Arial, sans-serif', color: '#444b59', fontWeight: 'bold' }}>CREATE YOUR ACCOUNT!</span><br /><br /><br></br>
      <div className="input-container">
            <span style={{ fontSize: '1.2rem', fontFamily: 'Overpass, Arial, sans-serif', color: '#444b59', marginRight: '9.3rem' }}>First Name</span>
            <input type="text" placeholder="Your first name" /><br /><br />
            <span style={{ fontSize: '1.2rem', fontFamily: 'Overpass, Arial, sans-serif', color: '#444b59', marginRight: '9.2rem' }}>Last Name</span>
            <input type="text" placeholder="Your Last name" /><br /><br />
            <span style={{ fontSize: '1.2rem', fontFamily: 'Overpass, Arial, sans-serif', color: '#444b59', marginRight: '7.3rem' }}>Email Address</span>
            <input type="text" placeholder="Your email address" /><br /><br />
            <span style={{ fontSize: '1.2rem', fontFamily: 'Overpass, Arial, sans-serif', color: '#444b59', marginRight: '8.6rem' }}>Contact No.</span>
            <input type="text" placeholder="Your contact no." /><br /><br />
            <span style={{ fontSize: '1.2rem', fontFamily: 'Overpass, Arial, sans-serif', color: '#444b59', marginRight: '9.6rem' }}>Password</span>
            <input type="password" placeholder="Your password" /><br /><br />
            <span style={{ fontSize: '1.2rem', fontFamily: 'Overpass, Arial, sans-serif', color: '#444b59', marginRight: '5rem' }}>Confirm Password</span>
            <input type="password" placeholder="Confirm your password" /><br /><br />
            <button onClick={togglePasswordVisibility}></button>
      </div>
      <Link to='/User_Page'><button id="sign-in" className="sign-in-button" style={{ marginLeft: '4rem', marginRight: '5rem' }}>Sign In</button></Link><br /><br />
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

