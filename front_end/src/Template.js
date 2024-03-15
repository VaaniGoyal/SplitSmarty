// Template.js

import React from 'react';

function Navigation() {
  return (
    <nav>
      <ul>
        <li><button>Help</button></li>
        <li><button>About Us</button></li>
        <li><button id="sign-up-1">Sign Up</button></li>
        <li><button>Home</button></li>
      </ul>
    </nav>
  );
}

function LeftNavBar() {
  return (
    <div className="left-nav-bar">
      <button>
        <img src="./user.png" /> Your Profile
      </button>
      <button>
        <img src="./group.png" /> Your Groups
      </button>
      <button>
        <img src="./Rupee.png" /> Add Expenses
      </button>
      <button>
        <img src="./transactions.png" /> Transactions
      </button>
      <button>
        <img src="./lock.png" /> Change Password
      </button>
    </div>
  );
}

function Logout() {
  return (
    <div className="logout">
      <button>
        <img src="./logout.png" /> Log Out
      </button>
    </div>
  );
}

function VerticalLine() {
  return <div className="vertical-line"></div>;
}

export { Navigation, LeftNavBar, Logout, VerticalLine };
