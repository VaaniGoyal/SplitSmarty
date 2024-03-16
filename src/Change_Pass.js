// Change_Pass.js
import React from 'react';
import { LeftNavBar, Logout, VerticalLine } from './Template';
import { Link } from 'react-router-dom';
import './Change_Pass.css';

function Change_Pass() {
  return (
    <div className="Change_Pass">
      <LeftNavBar />
      <Logout />
      <VerticalLine />
      <br />
      <p> <span className="page-head">Change your Password</span></p><br /><br />
    </div>
  );
}

export default Change_Pass;
