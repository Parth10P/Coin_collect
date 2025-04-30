// import { useEffect, useState } from 'react';
// import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

// const getUserSubmissions = async (username) => {
//   const response = await fetch(`https://codeforces.com/api/user.status?handle=${username}`);
//   const data = await response.json();
//   if (data.status !== 'OK') throw new Error('Failed to fetch submissions');
//   return data.result;
// };

// const analyzeProblemTags = (submissions) => {
//   const tagCount = {};
//   submissions.forEach((sub) => {
//     if (sub.verdict === 'OK') {
//       sub.problem.tags.forEach((tag) => {
//         tagCount[tag] = (tagCount[tag] || 0) + 1;
//       });
//     }
//   });
//   return Object.entries(tagCount).map(([name, value]) => ({ name, value }));
// };

// const analyzeProblemRatings = (submissions) => {
//   const ratingCount = {};
//   const seen = new Set();

//   submissions.forEach((sub) => {
//     if (
//       sub.verdict === 'OK' &&
//       sub.problem.rating &&
//       !seen.has(`${sub.problem.contestId}-${sub.problem.index}`)
//     ) {
//       ratingCount[sub.problem.rating] = (ratingCount[sub.problem.rating] || 0) + 1;
//       seen.add(`${sub.problem.contestId}-${sub.problem.index}`);
//     }
//   });

//   return ratingCount;
// };

// function UserProblemStats({ handle }) {
//   const [tagStats, setTagStats] = useState([]);
//   const [ratingStats, setRatingStats] = useState({});
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (!handle) return;

//     const fetchStats = async () => {
//       setLoading(true);
//       setError('');
//       try {
//         const submissions = await getUserSubmissions(handle);
//         setTagStats(analyzeProblemTags(submissions));
//         setRatingStats(analyzeProblemRatings(submissions));
//       } catch (err) {
//         setError('Invalid handle or failed to fetch data.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStats();
//   }, [handle]);

//   if (!handle) return null;

//   return (
//     <div>
//       <h3>User Problem Stats</h3>
//       {loading && <p>Loading stats...</p>}
//       {error && <p style={{ color: 'red' }}>{error}</p>}

//       {tagStats.length > 0 && (
//         <div>
//           <h4>Tag Distribution</h4>
//           <ResponsiveContainer width="100%" height={300}>
//             <PieChart>
//               <Pie data={tagStats} dataKey="value" nameKey="name" outerRadius={100}>
//                 {tagStats.map((entry, index) => (
//                   <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Tooltip />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>
//       )}

//       {Object.keys(ratingStats).length > 0 && (
//         <div>
//           <h4>Rating Breakdown</h4>
//           <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
//             {Object.entries(ratingStats).map(([rating, count]) => (
//               <div key={rating} style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '8px' }}>
//                 <strong>{rating}</strong>: {count}
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default UserProblemStats;







































import { useEffect, useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const getUserSubmissions = async (username) => {
  const response = await fetch(`https://codeforces.com/api/user.status?handle=${username}`);
  const data = await response.json();
  if (data.status !== 'OK') throw new Error('Failed to fetch submissions');
  return data.result;
};

const analyzeProblemTags = (submissions) => {
  const tagCount = {};
  submissions.forEach((sub) => {
    if (sub.verdict === 'OK') {
      sub.problem.tags.forEach((tag) => {
        tagCount[tag] = (tagCount[tag] || 0) + 1;
      });
    }
  });
  return Object.entries(tagCount).map(([name, value]) => ({ name, value }));
};

const analyzeProblemRatings = (submissions) => {
  const ratingCount = {};
  const seen = new Set();

  submissions.forEach((sub) => {
    if (
      sub.verdict === 'OK' &&
      sub.problem.rating &&
      !seen.has(`${sub.problem.contestId}-${sub.problem.index}`)
    ) {
      ratingCount[sub.problem.rating] = (ratingCount[sub.problem.rating] || 0) + 1;
      seen.add(`${sub.problem.contestId}-${sub.problem.index}`);
    }
  });

  return ratingCount;
};

function UserProblemStats({ handle }) {
  const [tagStats, setTagStats] = useState([]);
  const [ratingStats, setRatingStats] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!handle) return;

    const fetchStats = async () => {
      setLoading(true);
      setError('');
      try {
        const submissions = await getUserSubmissions(handle);
        setTagStats(analyzeProblemTags(submissions));
        setRatingStats(analyzeProblemRatings(submissions));
      } catch (err) {
        setError('Invalid handle or failed to fetch data.');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [handle]);

  if (!handle) return null;

  const ratingArray = Object.entries(ratingStats)
    .map(([rating, count]) => ({ rating, count }))
    .sort((a, b) => parseInt(a.rating) - parseInt(b.rating));

  return (
    <div id='ProblemSolved' style={{ padding: '24px', borderTop: '1px solid #eee', marginTop: '40px' }}>
      <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>User Problem Stats</h2>

      {loading && <p>Loading stats...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {tagStats.length > 0 && (
        <div style={{ marginBottom: '40px' }}>
          <h3 style={{ marginBottom: '16px' }}>Tag Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={tagStats} dataKey="value" nameKey="name" outerRadius={100}>
                {tagStats.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      {ratingArray.length > 0 && (
        <div style={{ marginBottom: '40px' }}>
          <h3 style={{ marginBottom: '16px' }}>Rating Breakdown</h3>

          {/* Rating Boxes */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '24px' }}>
            {ratingArray.map(({ rating, count }) => (
              <div
                key={rating}
                style={{
                  padding: '12px 16px',
                  border: '1px solid #ccc',
                  borderRadius: '10px',
                  fontWeight: 'bold',
                  backgroundColor: '#f9f9f9',
                }}
              >
                {rating}: {count}
              </div>
            ))}
          </div>

          {/* Rating Bar Chart */}
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ratingArray}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="rating" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

export default UserProblemStats;
