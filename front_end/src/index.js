import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Login_Page from './Login_Page';
import Create_Acc from './Create_Acc';
import Group_Page from './Group_Page';
import User_Page from './User_Page';
import Add_Expense from './Add_Expense';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Add_Expense />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

