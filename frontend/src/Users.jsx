import { useEffect, useState } from 'react';
import api from "./api/axios";
import Tasks from './Tasks';

function Users() {
  const [users, setTasks] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('all');

  useEffect(() => {
    api.get('/user')
      .then(res => setTasks(res.data))
      .catch(err => console.error(err));
  }, []);

  const filterByUser = (userId) => {
    setSelectedUserId(userId);
  }

  return (
    <div>
      <h2>Tasks</h2>
      <select value={selectedUserId} onChange={e => filterByUser(e.target.value)}>
        <option value="all" key="all">All users</option>
        {users.map(user => (
          <option value={user.id} key={user.id}>
            {user.email}
          </option>
        ))}
      </select>

      <Tasks selectedUserId={selectedUserId} />
    </div>
  );
}

export default Users;