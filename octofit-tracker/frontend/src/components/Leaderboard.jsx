import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../utils/api';

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/leaderboard/`);
        const data = await response.json();
        setLeaderboard(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        setError('Unable to load leaderboard.');
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="container py-4">
      <h2 className="mb-3">Leaderboard</h2>
      {error ? <p className="text-danger">{error}</p> : null}
      <ol className="list-group list-group-numbered">
        {leaderboard.map((entry) => (
          <li className="list-group-item d-flex justify-content-between align-items-start" key={entry._id || entry.user?.name || entry.name}>
            <div>
              <strong>{entry.user?.name || entry.name || 'Unknown'}</strong>
            </div>
            <span className="badge bg-primary rounded-pill">{entry.score || 0}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
