import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import "./admindashboard.css";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [newAlert, setNewAlert] = useState({
    type: "",
    description: "",
    latitude: 0,
    longitude: 0,
  });
  const authHeader = localStorage.getItem("authHeader");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await axios.get("http://localhost:5000/admin/users", {
          headers: { Authorization: authHeader },
        });
        setUsers(usersResponse.data);

        const tasksResponse = await axios.get("http://localhost:5000/admin/tasks", {
          headers: { Authorization: authHeader },
        });
        setTasks(tasksResponse.data);
      } catch (error) {
        console.error("Error fetching admin data:", error);
        alert("Failed to fetch data. Please log in again.");
      }
    };
    fetchData();
  }, [authHeader]);

  const handleAlertChange = (e) => {
    setNewAlert({ ...newAlert, [e.target.name]: e.target.value });
  };

  const handleCreateAlert = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/admin/alerts", newAlert, {
        headers: { Authorization: authHeader },
      });
      alert(response.data);
    } catch (error) {
      console.error("Error creating alert:", error);
      alert("Failed to create alert. Please log in again.");
    }
  };

  return (
    <div className="admin-dashboard-container">
      <Sidebar />
      <div className="admin-content">
        <h2>Admin Dashboard</h2>
        <div className="section">
          <h3>Users</h3>
          <ul>
            {users.map((user) => (
              <li key={user.username}>
                {user.username} ({user.role})
              </li>
            ))}
          </ul>
        </div>
        <div className="section">
          <h3>Tasks</h3>
          <ul>
            {tasks.map((task) => (
              <li key={task.id}>
                {task.description} (Assigned to: {task.volunteerUsername})
              </li>
            ))}
          </ul>
        </div>
        <div className="section">
          <h3>Create Alert</h3>
          <form onSubmit={handleCreateAlert}>
            <input
              type="text"
              name="type"
              placeholder="Alert Type"
              value={newAlert.type}
              onChange={handleAlertChange}
              required
            />
            <textarea
              name="description"
              placeholder="Description"
              value={newAlert.description}
              onChange={handleAlertChange}
              required
            />
            <input
              type="number"
              name="latitude"
              placeholder="Latitude"
              value={newAlert.latitude}
              onChange={handleAlertChange}
              required
            />
            <input
              type="number"
              name="longitude"
              placeholder="Longitude"
              value={newAlert.longitude}
              onChange={handleAlertChange}
              required
            />
            <button type="submit">Create Alert</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;