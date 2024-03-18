// Template.js
import React from 'react';
import { Link } from 'react-router-dom';
function Navigation() {
  return (
    <nav className='nav'>
      <ul className='ul'>
        <li className='li'><button>Help</button></li>
        <li className='li'><button>About Us</button></li>
        <li className='li'><Link to="/Create_Acc"><button id="sign-up-1">Sign Up</button></Link></li>
        <li className='li'><Link to="/Login_Page"><button id="home">Home</button></Link></li>
      </ul>
    </nav>
  );
}

// function Logout() {
//   return (
//     <div className="logout">
//       <button>
//         <img src="./logout.png" /> Log Out
//       </button>
//     </div>
//   );
// }

// function VerticalLine() {
//   return <div className="vertical-line"></div>;
// }
function Footer() {
  return (
    <footer className="footer">
      {/* Footer content */}
    </footer>
  );
}
export { Navigation, Footer };