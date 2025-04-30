import React from "react";
import CodeTrackr from "./components/code";
import RatingStatsTable from "./components/RatingStats";
import UserProblemStats from "./components/UserProblemStats";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div>
      <CodeTrackr />
      <UserProblemStats />
      <RatingStatsTable />
      <Navbar/>
      <Footer/>
    </div>
  );
};

export default App;





// import React from "react";
// import Navbar from "./components/Navbar";
// import CodeTrackr from "./components/CodeforcesTracker"; // rename if needed
// import GitHubTracker from "./components/GitHubTracker"; // you created this
// // import LeetCodeTracker and CodeChefTracker if available

// const App = () => {
//   return (
//     <div style={{ scrollBehavior: "smooth" }}>
//       <Navbar />
//       <section id="codeforces" style={sectionStyle}>
//         <CodeTrackr />
//       </section>
//       <section id="github" style={sectionStyle}>
//         <GitHubTracker />
//       </section>
//       {/* Add more when ready */}
//     </div>
//   );
// };

// const sectionStyle = {
//   padding: "40px 20px",
//   borderBottom: "1px solid #ccc",
// };

// export default App;
