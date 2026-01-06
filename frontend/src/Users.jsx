import { useEffect, useState } from 'react';
import api from "./api/axios";

function Users() {
  const [users, setTasks] = useState([]);

  useEffect(() => {
    api.get('/tasks')
      .then(res => setTasks(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Tasks</h2>
      <select>
        {users.map(user => (
          <option key={user.id}>
            {user.email}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Users;