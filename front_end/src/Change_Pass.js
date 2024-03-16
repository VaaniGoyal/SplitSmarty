// Change_Pass.js
import React from 'react';
import { Navigation, LeftNavBar, Logout, VerticalLine } from './Template';
import './Change_Pass.css';

function Change_Pass() {
  return (
    <div className="Change_Pass">
      <Navigation />
      <LeftNavBar />
      <Logout />
      <VerticalLine />
      <br />
      <p> <span className="page-head">Change your Password</span></p><br /><br />
      <footer></footer>
    </div>
  );
}

export default Change_Pass;
