import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../utils/api';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/users/`);
        const data = await response.json();
        setUsers(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        setError('Unable to load users.');
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="container py-4">
      <h2 className="mb-3">Users</h2>
      {error ? <p className="text-danger">{error}</p> : null}
      <ul className="list-group">
        {users.map((user) => (
          <li className="list-group-item" key={user._id || user.email || user.name}>
            <strong>{user.name || user.username || 'Unknown user'}</strong>
            {user.email ? ` — ${user.email}` : ''}
          </li>
        ))}
      </ul>
    </div>
  );
}
