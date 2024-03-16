// Group_Page.js

import React, { useState, useEffect } from 'react';
import { LeftNavBar, Logout, VerticalLine } from './Template';
import { Link } from 'react-router-dom';
import './Participants.css'; // Import CSS file for global styles


function Participants(){
  return (
    <div className="Participants">
      <LeftNavBar />
      <Logout />
      <VerticalLine />
      <br />
      <p> <span className="page-head">Group Participants</span></p><br /><br />
    </div>
  );
}

export default Participants;
