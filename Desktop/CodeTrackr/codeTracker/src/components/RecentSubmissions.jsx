import React, { useEffect, useState } from "react";

const RecentSubmissions = ({ handle }) => {
  const [submissions, setSubmissions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!handle) return;

    const fetchSubmissions = async () => {
      try {
        setError(null);
        const res = await fetch(
          `https://codeforces.com/api/user.status?handle=${handle}&from=1&count=10`
        );
        const data = await res.json();

        if (data.status !== "OK") throw new Error("Failed to fetch submissions");

        setSubmissions(data.result.slice(0, 10));
      } catch (err) {
        setError(err.message);
        setSubmissions([]);
      }
    };

    fetchSubmissions();
  }, [handle]);

  return (
    <div id="RecentSubmissions" style={{ marginTop: "30px" }}>
      <h2 style={{ fontSize: "1.5rem", marginBottom: "10px", textAlign: "center" }}>
        Recent Submissions
      </h2>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {submissions.length > 0 && (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={thStyle}>#</th>
              <th style={thStyle}>Problem</th>
              <th style={thStyle}>Index</th>
              <th style={thStyle}>Verdict</th>
              <th style={thStyle}>Language</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((sub, i) => (
              <tr key={i} style={{ textAlign: "center" }}>
                <td style={tdStyle}>{i + 1}</td>
                <td style={tdStyle}>{sub.problem.name}</td>
                <td style={tdStyle}>{sub.problem.index}</td>
                <td style={{ ...tdStyle, color: verdictColor(sub.verdict) }}>
                  {sub.verdict}
                </td>
                <td style={tdStyle}>{sub.programmingLanguage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const thStyle = {
  borderBottom: "2px solid #ccc",
  padding: "10px",
  backgroundColor: "#f2f2f2",
};

const tdStyle = {
  padding: "10px",
  borderBottom: "1px solid #ddd",
};

const verdictColor = (verdict) => {
  if (verdict === "OK") return "green";
  if (verdict.includes("WRONG") || verdict.includes("FAILED")) return "red";
  if (verdict.includes("TIME_LIMIT")) return "orange";
  return "black";
};

export default RecentSubmissions;
