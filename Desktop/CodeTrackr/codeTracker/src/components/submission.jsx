import React, { useEffect, useState } from "react";
// import "./UserForm.css";

const getLevel = (rating) => {
  if (!rating) return "Unrated";
  if (rating < 1200) return "Newbie";
  if (rating < 1400) return "Pupil";
  if (rating < 1600) return "Specialist";
  if (rating < 1900) return "Expert";
  if (rating < 2100) return "Candidate Master";
  if (rating < 2300) return "Master";
  if (rating < 2400) return "International Master";
  if (rating < 2600) return "Grandmaster";
  if (rating < 3000) return "International Grandmaster";
  return "Legendary Grandmaster";
};

const UserForm = ({ userData }) => {
  const [levelStats, setLevelStats] = useState({});

  useEffect(() => {
    if (!userData?.userInfo?.handle) return;

    const fetchSolvedProblems = async () => {
      try {
        const res = await fetch(
          `https://codeforces.com/api/user.status?handle=${userData.userInfo.handle}`
        );
        const data = await res.json();

        if (data.status !== "OK") throw new Error("Failed to fetch status");

        const solvedSet = new Set();
        const levels = {};

        data.result.forEach((sub) => {
          if (sub.verdict === "OK") {
            const key = `${sub.problem.contestId}-${sub.problem.index}`;
            if (!solvedSet.has(key)) {
              solvedSet.add(key);
              const level = getLevel(sub.problem.rating);
              levels[level] = (levels[level] || 0) + 1;
            }
          }
        });

        setLevelStats(levels);
      } catch (err) {
        console.error("Error fetching solved problems", err);
      }
    };

    fetchSolvedProblems();
  }, [userData]);

  const levels = [
    "Newbie",
    "Pupil",
    "Specialist",
    "Expert",
    "Candidate Master",
    "Master",
    "International Master",
    "Grandmaster",
    "International Grandmaster",
    "Legendary Grandmaster",
    "Unrated",
  ];

  return (
    <div className="submissions-container">
      <h2 className="submissions-title">📊 Problems Solved by Level</h2>
      <table className="submissions-table">
        <thead>
          <tr>
            <th>Level</th>
            <th>Solved</th>
          </tr>
        </thead>
        <tbody>
          {levels.map((level) => (
            <tr key={level}>
              <td>{level}</td>
              <td>{levelStats[level] || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserForm;
