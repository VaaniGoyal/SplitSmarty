// //User_Page.js

// import React, { useState, useEffect } from 'react';
// import { Navigation, LeftNavBar, Logout, VerticalLine } from './Template';
// import './User_Page.css'; // Import CSS file for global styles

// function User_Page() {
//   // Define state to store user info
//   const [userInfo, setUserInfo] = useState(null);

//   // Fetch user info from the backend when the component mounts
//   useEffect(() => {
//     fetchUserInfo();
//   }, []);

//   // Function to fetch user info from the backend
//   const fetchUserInfo = async () => {
//     try {
//       // Fetch user info from the backend API (replace 'api/user' with your actual API endpoint)
//       const response = await fetch('api/user');
//       if (!response.ok) {
//         throw new Error('Failed to fetch user info');
//       }
//       const data = await response.json();
//       // Update state with the fetched user info
//       setUserInfo(data.userInfo);
//     } catch (error) {
//       console.error('Error fetching user info:', error);
//     }
//   };

//   return (
//     <div className="User_Page">
//       <Navigation />
//       <LeftNavBar />
//       <Logout />
//       <VerticalLine />
//       <br />
//       <p> <span className="page-head">User Profile</span></p><br /><br />
//       {userInfo && (
//         <div className="user-info">
//           <p>Name: {userInfo.name}</p>
//           <p>Contact No: {userInfo.contactNo}</p>
//           <p>Email Address: {userInfo.email}</p>
//           {/* Render other user info fields as needed */}
//         </div>
//       )}
//       <footer></footer>
//     </div>
//   );
// }

// export default User_Page;
// User_Page.js

import React, { useState, useEffect } from 'react';
import { Navigation, LeftNavBar, Logout, VerticalLine } from './Template';
import './User_Page.css'; // Import CSS file for global styles

const dummyUserInfo = {
  name: "John Doe",
  contactNo: "123-456-7890",
  email: "john.doe@example.com"
};

function User_Page() {
  // Define state to store user info
  const [userInfo, setUserInfo] = useState(null);

  // Fetch user info from the backend when the component mounts
  useEffect(() => {
    fetchUserInfo();
  }, []);

  // Function to fetch user info from the backend
  const fetchUserInfo = async () => {
    try {
      // Simulating a delay to mimic API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUserInfo(dummyUserInfo);
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  return (
    <div className="User_Page">
      <Navigation />
      <LeftNavBar />
      <Logout />
      <VerticalLine />
      <br />
      <p> <span className="page-head">User Profile</span></p><br /><br />
      {userInfo && (
        <div className="user-info">
          <p>Name: {userInfo.name}</p>
          <p>Contact No: {userInfo.contactNo}</p>
          <p>Email Address: {userInfo.email}</p>
          {/* Render other user info fields as needed */}
        </div>
      )}
      <footer></footer>
    </div>
  );
}

export default User_Page;
