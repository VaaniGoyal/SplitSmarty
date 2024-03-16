// Login_Page.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Login_Page.css'; 
function Login_Page() {

  return (
    <div className="Login_Page">
      <br />
      <p> <span className="page-head">Split Smarty</span></p><br /><br />
      <span style={{ fontSize: '1.5rem', fontFamily: 'Overpass, Arial, sans-serif', color: '#444b59', fontWeight: 'bold' }}>WELCOME BACK!</span><br /><br />
      <span style={{ fontSize: '0.9rem', fontFamily: 'Overpass, Arial, sans-serif', color: '#444b59' }}>Don't have an account,<Link to='/Create_Acc'><button id="sign-up-2" className="button" style={{ color: '#8699da', marginLeft: '0.0625rem', padding: '0.0625rem 0.0625rem' }}>Sign Up</button></Link></span><br /><br />
      <span style={{ fontSize: '1.2rem', fontFamily: 'Overpass, Arial, sans-serif', color: '#444b59' }}>Email Address</span><br /><br />
      <input type="text" placeholder="Your email" /><br /><br />
      <span style={{ fontSize: '1.2rem', fontFamily: 'Overpass, Arial, sans-serif', color: '#444b59' }}>Password</span><br /><br />
      <input type="password" placeholder="your password" /><br /><br />
      <button onClick={togglePasswordVisibility}></button>
      <label className="radio-label" htmlFor="remember-me">
        <input className="radio-input" type="radio" id="remember-me" name="remember" value="remember" style={{ transform: 'scale(1.5)' }} /> Remember Me
      </label>
      <button className="button" style={{ marginLeft: '4rem', padding: '0.0625rem 0.0625rem' }}>Forgot Password?</button><br /><br />
      <Link to='/User_Page'><button id="sign-in" className="sign-in-button" style={{ marginLeft: '4rem', marginRight: '5rem' }}>Sign In</button></Link><br /><br />
      <span style={{ marginLeft: '6rem', fontSize: '1rem' }}>or continue with</span><br />
      <div className="icons">
        <a href="#">
          <img src="/images/google.jpg" width="70rem" height="50rem" />
        </a>
        <a href="#">
          <img src="/images/fb.jpg" width="70rem" height="50rem" />
        </a>
      </div>
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

export default Login_Page;

