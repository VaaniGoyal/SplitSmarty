import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom'; 
import './App.css';
function Login_Page() {
  const [data, setData] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInSuccess, setSignInSuccess] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState('');
  useEffect(() => {
    axios.get('http://localhost:3030/user')
    .then(res => {
      setData(res.data);
    })
    .catch(err => console.log(err));
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
  const handleButtonClick = () => {
    let success = false;
    let userId = null;
    data.forEach((d, i) => {
      if (email === d.email && password === d.password) {
        userId = d.user_id;
        success = true;
      }
    });
  
    if (success) {
      setSignInSuccess(true);
      navigate('/User_Page', { state: { userId: userId } });
    } else {
      setError('Sign-in failed. Please try again.');
    }
  };
  
  return (
    <div className="Login_Page">
      <br />
      <p> <span className="page-head">Split Smarty</span></p><br /><br />
      <span style={{ fontSize: '1.5rem', fontFamily: 'Overpass, Arial, sans-serif', color: '#444b59', fontWeight: 'bold' }}>WELCOME BACK!</span><br /><br />
      <span style={{ fontSize: '0.9rem', fontFamily: 'Overpass, Arial, sans-serif', color: '#444b59' }}>Don't have an account,<Link to='/Create_Acc'><button id="sign-up-2"  style={{ color: '#8699da', marginLeft: '0.0625rem', padding: '0.0625rem 0.0625rem' }}>Sign Up</button></Link></span><br /><br />
      <span style={{ fontSize: '1.2rem', fontFamily: 'Overpass, Arial, sans-serif', color: '#444b59' }}>Email Address</span><br /><br />
      <input type="text" placeholder="Your email" onChange={(e) => setEmail(e.target.value)} /><br /><br />
      <span style={{ fontSize: '1.2rem', fontFamily: 'Overpass, Arial, sans-serif', color: '#444b59' }}>Password</span><br /><br />
      <input type="password" id="password" placeholder="Your password" onChange={(e) => setPassword(e.target.value)} /><br /><br />
      <button onClick={togglePasswordVisibility}></button>
      <button onClick={handleButtonClick} id="sign-in" className="sign-in-button" style={{ marginLeft: '1.5rem', marginRight: '5rem' }}>Sign In</button><br /><br />
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default Login_Page;
