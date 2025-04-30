import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import RatingStatsTable from "./RatingStats";
import RecentSubmissions from "./RecentSubmissions";
import UserProblemStats from "./UserProblemStats"; // NEW

const rankColors = {
  newbie: "#808080",
  pupil: "#008000",
  specialist: "#03a89e",
  expert: "#0000ff",
  "candidate master": "#aa00aa",
  master: "#ff8c00",
  "international master": "#ff8c00",
  grandmaster: "#ff0000",
  "international grandmaster": "#ff0000",
  "legendary grandmaster": "#aa0000",
};

const CodeTrackr = () => {
  const [handle, setHandle] = useState("");
  const [userData, setUserData] = useState(null);
  const [ratingData, setRatingData] = useState([]);
  const [ratingDataRaw, setRatingDataRaw] = useState([]);
  const [error, setError] = useState(null);

  const fetchUserData = async () => {
    try {
      setError(null);

      const userRes = await fetch(
        `https://codeforces.com/api/user.info?handles=${handle}`
      );
      const userJson = await userRes.json();
      if (userJson.status !== "OK") throw new Error("User not found");
      setUserData(userJson.result[0]);

      const ratingRes = await fetch(
        `https://codeforces.com/api/user.rating?handle=${handle}`
      );
      const ratingJson = await ratingRes.json();
      if (ratingJson.status !== "OK")
        throw new Error("Rating data fetch error");

      const raw = ratingJson.result;
      setRatingDataRaw(raw);

      const transformed = raw.map((entry, index) => ({
        name: entry.contestName,
        rating: entry.newRating,
        index,
      }));
      setRatingData(transformed);
    } catch (err) {
      setError(err.message);
      setUserData(null);
      setRatingData([]);
      setRatingDataRaw([]);
    }
  };

  return (
    <div id="userInfo"
      style={{
        padding: "20px",
        maxWidth: "900px",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <img
        src="//codeforces.org/s/18636/images/codeforces-sponsored-by-ton.png"
        alt="Codeforces Logo"
        style={{ maxWidth: "250px", display: "block", margin: "0 auto 20px",marginTop:'45px' }}
      />

      {/* <h1
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        CodeTrackr
      </h1> */}

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter Codeforces handle"
          value={handle}
          onChange={(e) => setHandle(e.target.value)}
          style={{ flex: 1, padding: "8px", fontSize: "16px" }}
        />
        <button
          onClick={fetchUserData}
          style={{ padding: "8px 16px", fontSize: "16px", cursor: "pointer" }}
        >
          Track
        </button>
      </div>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {userData && (
        <div
          style={{
            border: "1px solid #ddd",
            padding: "16px",
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <img
            src={userData.titlePhoto}
            alt="User Avatar"
            style={{ width: "150px", height: "190px", borderRadius: "8px" }}
          />

          <div>
            <h2
              style={{
                fontSize: "1.5rem",
                marginBottom: "10px",
                color: rankColors[userData.rank] || "#000",
                textTransform: "capitalize",
              }}
            >
              {userData.rank ? userData.rank : "Unrated"}: {userData.handle}
            </h2>
            <p>
              <strong>Max Rating:</strong> {userData.maxRating}
            </p>
            <p>
              <strong>Current Rating:</strong> {userData.rating}
            </p>
            <p>
              <strong>Max Rank:</strong> {userData.maxRank}
            </p>
            <p>
              <strong>Current Rank:</strong> {userData.rank}
            </p>
            <p>
              <strong>Contribution:</strong> {userData.contribution}
            </p>
          </div>
        </div>
      )}

      {ratingData.length > 0 && (
        <div style={{ height: "400px", marginBottom: "40px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={ratingData}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="index" hide />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="rating"
                stroke="#8884d8"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {ratingDataRaw.length > 0 && (
        <RatingStatsTable ratingData={ratingDataRaw} />
      )}

      {userData && (
        <>
          <RecentSubmissions handle={userData.handle} />
          <UserProblemStats handle={userData.handle} />
        </>
      )}
    </div>
  );
};

export default CodeTrackr;
