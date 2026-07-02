import { useEffect, useState } from 'react';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const apiUrl = import.meta.env.VITE_CODESPACE_NAME
          ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
          : 'http://localhost:8000/api/workouts/';
        const response = await fetch(apiUrl);
        const data = await response.json();
        setWorkouts(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        setError('Unable to load workouts.');
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <div className="container py-4">
      <h2 className="mb-3">Workouts</h2>
      {error ? <p className="text-danger">{error}</p> : null}
      <div className="row g-3">
        {workouts.map((workout) => (
          <div className="col-md-6" key={workout._id || workout.title}>
            <div className="card h-100">
              <div className="card-body">
                <h3 className="h5">{workout.title}</h3>
                <p className="text-muted">{workout.category || 'Fitness'}</p>
                <p className="mb-0">{workout.description || 'A dedicated workout plan.'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
