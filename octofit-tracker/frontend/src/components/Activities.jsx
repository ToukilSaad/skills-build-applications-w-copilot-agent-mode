import { useEffect, useState } from 'react';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const apiUrl = import.meta.env.VITE_CODESPACE_NAME
          ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
          : 'http://localhost:8000/api/activities/';
        const response = await fetch(apiUrl);
        const data = await response.json();
        setActivities(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        setError('Unable to load activities.');
      }
    };

    fetchActivities();
  }, []);

  return (
    <div className="container py-4">
      <h2 className="mb-3">Activities</h2>
      {error ? <p className="text-danger">{error}</p> : null}
      <ul className="list-group">
        {activities.map((activity) => (
          <li className="list-group-item" key={activity._id || activity.date}>
            <strong>{activity.type || 'Activity'}</strong>
            {activity.durationMinutes ? ` • ${activity.durationMinutes} min` : ''}
            {activity.caloriesBurned ? ` • ${activity.caloriesBurned} kcal` : ''}
          </li>
        ))}
      </ul>
    </div>
  );
}
