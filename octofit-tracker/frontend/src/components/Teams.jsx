import { useEffect, useState } from 'react';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const apiUrl = import.meta.env.VITE_CODESPACE_NAME
          ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
          : 'http://localhost:8000/api/teams/';
        const response = await fetch(apiUrl);
        const data = await response.json();
        setTeams(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        setError('Unable to load teams.');
      }
    };

    fetchTeams();
  }, []);

  return (
    <div className="container py-4">
      <h2 className="mb-3">Teams</h2>
      {error ? <p className="text-danger">{error}</p> : null}
      <div className="row g-3">
        {teams.map((team) => (
          <div className="col-md-6" key={team._id || team.name}>
            <div className="card h-100">
              <div className="card-body">
                <h3 className="h5">{team.name}</h3>
                <p className="text-muted mb-2">{team.sport || 'Fitness team'}</p>
                <p className="mb-0">Members: {team.members?.length || 0}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
