import { useEffect, useState } from 'react';
import api from "./api/axios";

function Tasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    api.get('/tasks')
      .then(res => setTasks(res.data))
      .catch(err => console.error(err));
  }, []);

  const tickBox = async (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    setTasks(tasks.map(t =>
      t.id === taskId ? { ...t, isDone: "loading" } : t
    ));

    try {
      const res = await api.put(`/tasks/${taskId}`, {
        title: task.title,
        isDone: !task.isDone
      });
      setTasks(tasks.map(t =>
        t.id === taskId ? { ...t, isDone: res.data.isDone } : t
      ));
    } catch (err) {
      console.error(err);
      setTasks(tasks.map(t =>
        t.id === taskId ? { ...t, isDone: false } : t
      ));
    }
  };

  return (
    <div>
      <h2>Tasks</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <div>{task.title}</div>
            <button onClick={() => tickBox(task.id)}>
              {task.isDone === "loading"
                ? "⏳"
                : task.isDone
                ? "✅"
                : "❌"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tasks;