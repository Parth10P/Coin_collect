// // src/components/Navbar.jsx
// import React from "react";
// import "./Navbar.css";

// const Navbar = () => {
//   return (
//     <nav className="navbar">
//       <div className="navbar-logo">CodeTracker</div>
//       <ul className="navbar-links">
//         <li><a href="#home">Home</a></li>
//         <select>
//         <option>Feature</option>
//         <option><a href="#RatingStats">Rating Stats</a></option>
//         <option>Rating Stats</option>
//         <option>Recent Submission</option>
//         <option>Problem Solved by Level</option>
//         <option>Problem Solved by Tag</option>
//         </select>
//         <li><a href="#about">About</a></li>
//         <li><a href="#contact">Contact</a></li>
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;


import React from "react";
import "./Navbar.css";

const Navbar = () => {
  const handleNavigation = (event) => {
    const targetId = event.target.value;
    if (targetId) {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">CodeTracker</div>
      <ul className="navbar-links">
        <li><a href="#home">Home</a></li>
        <li>
          <select onChange={handleNavigation}>
            <option value="userInfo">User Info</option>
            <option value="RatingStats">Rating Stats</option>
            <option value="RecentSubmissions">Recent Submissions</option>
            <option value="ProblemSolved">Problem Solved</option>
          </select>
        </li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;