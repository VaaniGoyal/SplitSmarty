//App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes
import { Navigation, Footer } from './Template';
import Login_Page from './Login_Page';
import Create_Acc from './Create_Acc';
import User_Page from './User_Page';
import Group_Page from './Group_Page';
import Add_Expense from './Add_Expense';
import Change_Pass from './Change_Pass';
import './App.css';

function App() {
  return (
    <Router>
      <Navigation />
      <Footer />
      <div>
        <Routes>
          <Route path="/" element={<Login_Page />} />
          <Route path="/Create_Acc" element={<Create_Acc />} />
          <Route path="/User_Page" element={<User_Page />} />
          <Route path="/Group_Page" element={<Group_Page />} />
          <Route path="/Add_Expense" element={<Add_Expense />} />
          <Route path="/Change_Pass" element={<Change_Pass />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
