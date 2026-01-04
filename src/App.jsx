import React, { useEffect, useState } from "react";
import api from "./api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    dueDate: "",
    priority: "Low",
    status: "Pending"
  });
  const [editId, setEditId] = useState(null);

  const fetchTasks = async () => {
    const res = await api.get("/");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (editId) {
      await api.put(`/${editId}`, form);
      setEditId(null);
    } else {
      await api.post("/", form);
    }

    setForm({ title: "", dueDate: "", priority: "Low", status: "Pending" });
    fetchTasks();
  };

  const editTask = (task) => {
    setEditId(task._id);
    setForm(task);
  };

  const deleteTask = async (id) => {
    await api.delete(`/${id}`);
    fetchTasks();
  };

  return (
    <div>
      <h2>Task Manager</h2>

      {/* Add / Update Task Form */}
      <form onSubmit={submitHandler}>
        <input
          placeholder="Title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
        />

        <input
          type="date"
          value={form.dueDate?.substring(0, 10)}
          onChange={e => setForm({ ...form, dueDate: e.target.value })}
        />

        <select
          value={form.priority}
          onChange={e => setForm({ ...form, priority: e.target.value })}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <select
          value={form.status}
          onChange={e => setForm({ ...form, status: e.target.value })}
        >
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>

        <button type="submit">
          {editId ? "Update Task" : "Add Task"}
        </button>
      </form>

      {/* Task List */}
      <table border="1">
        <thead>
          <tr>
            <th>Title</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map(task => (
            <tr key={task._id}>
              <td>{task.title}</td>
              <td>{task.dueDate?.substring(0, 10)}</td>
              <td>{task.priority}</td>
              <td>{task.status}</td>
              <td>
                <button onClick={() => editTask(task)}>Edit</button>
                <button onClick={() => deleteTask(task._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default App;


