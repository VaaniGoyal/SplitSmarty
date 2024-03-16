import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Login_Page.css'; 

function Login_Page() {
  const [data, setData] = useState({ email: '', password: '' });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // Fetch data or perform other side effects if needed
    fetch('/api/data')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const togglePasswordVisibility = () => {
    var passwordField = document.getElementById("password");
    if (passwordField.type === "password") {
      passwordField.type = "text";
      document.querySelector("button").textContent = "Hide Password";
    } else {
      passwordField.type = "password";
      document.querySelector("button").textContent = "Show Password";
    }
  };

  const ifSignIn = () => {
    if (email === data.email && password === data.password) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="Login_Page">
      <br />
      <p> <span className="page-head">Split Smarty</span></p><br /><br />
      <span style={{ fontSize: '1.5rem', fontFamily: 'Overpass, Arial, sans-serif', color: '#444b59', fontWeight: 'bold' }}>WELCOME BACK!</span><br /><br />
      <span style={{ fontSize: '0.9rem', fontFamily: 'Overpass, Arial, sans-serif', color: '#444b59' }}>Don't have an account,<Link to='/Create_Acc'><button id="sign-up-2" className="button" style={{ color: '#8699da', marginLeft: '0.0625rem', padding: '0.0625rem 0.0625rem' }}>Sign Up</button></Link></span><br /><br />
      <span style={{ fontSize: '1.2rem', fontFamily: 'Overpass, Arial, sans-serif', color: '#444b59' }}>Email Address</span><br /><br />
      <input type="text" placeholder="Your email" onChange={(e) => setEmail(e.target.value)} /><br /><br />
      <span style={{ fontSize: '1.2rem', fontFamily: 'Overpass, Arial, sans-serif', color: '#444b59' }}>Password</span><br /><br />
      <input type="password" id="password" placeholder="Your password" onChange={(e) => setPassword(e.target.value)} /><br /><br />
      <button onClick={togglePasswordVisibility}></button>
      <Link to='/User_Page'><button onClick={ifSignIn} id="sign-in" className="sign-in-button" style={{ marginLeft: '4rem', marginRight: '5rem' }}>Sign In</button></Link><br /><br />
    </div>
  );
}

export default Login_Page;
