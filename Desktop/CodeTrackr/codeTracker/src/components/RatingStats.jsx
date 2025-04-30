import React from "react";

const RatingStatsTable = ({ ratingData }) => {
  if (!ratingData || ratingData.length === 0) return null;

  const tableHeader = {
    borderBottom: "2px solid #ccc",
    padding: "10px",
    textAlign: "left",
  };

  const tableCell = {
    padding: "10px",
    borderBottom: "1px solid #eee",
  };

  return (
    <div id="RatingStats" style={{ marginTop: "30px" }}>
      <h3 style={{ fontSize: "1.2rem", marginBottom: "10px" }}>
        Rating Change per Contest
      </h3>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f4f4f4" }}>
            <th style={tableHeader}>Contest ID</th>
            <th style={tableHeader}>Contest Name</th>
            <th style={tableHeader}>Rank</th>
            <th style={tableHeader}>Old Rating</th>
            <th style={tableHeader}>New Rating</th>
            <th style={tableHeader}>Change</th>
            <th style={tableHeader}>Time</th>
          </tr>
        </thead>
        <tbody>
          {ratingData.map((entry, index) => {
            const change = entry.newRating - entry.oldRating;
            const date = new Date(
              entry.ratingUpdateTimeSeconds * 1000
            ).toLocaleDateString();
            return (
              <tr
                key={index}
                style={{
                  backgroundColor: index % 2 === 0 ? "#fff" : "#f9f9f9",
                }}
              >
                <td style={tableCell}>{entry.contestId}</td>
                <td style={tableCell}>{entry.contestName}</td>
                <td style={tableCell}>{entry.rank}</td>
                <td style={tableCell}>{entry.oldRating}</td>
                <td style={tableCell}>{entry.newRating}</td>
                <td
                  style={{
                    ...tableCell,
                    color: change >= 0 ? "green" : "red",
                  }}
                >
                  {change > 0 ? "+" : ""}
                  {change}
                </td>
                <td style={tableCell}>{date}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RatingStatsTable;
