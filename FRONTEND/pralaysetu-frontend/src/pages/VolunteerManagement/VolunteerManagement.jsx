import React, { useState, useEffect } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import Footer from "../../components/Footer";
import "./volunteermanagement.css";

function VolunteerManagement() {
  const [volunteers, setVolunteers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ volunteerEmail: "", title: "", description: "", location: "" });

  useEffect(() => {
    const fetchVolunteersAndTasks = async () => {
      const volunteersResponse = await fetch("http://localhost:8080/api/users/volunteers", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const volunteersData = await volunteersResponse.json();
      setVolunteers(volunteersData);

      const tasksResponse = await fetch("http://localhost:8080/api/tasks", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const tasksData = await tasksResponse.json();
      setTasks(tasksData);
    };
    fetchVolunteersAndTasks();
  }, []);

  const handleAssignTask = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8080/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(newTask),
    });
    if (response.ok) {
      setTasks([...tasks, newTask]);
      setNewTask({ volunteerEmail: "", title: "", description: "", location: "" });
    } else {
      alert("Failed to assign task!");
    }
  };

  return (
    <div className="volunteer-management-container">
      <AdminNavbar />
      <div className="volunteer-management-content">
        <h2>Volunteer Management</h2>
        <div className="assign-task-form">
          <h3>Assign Task to Volunteer</h3>
          <form onSubmit={handleAssignTask}>
            <select
              value={newTask.volunteerEmail}
              onChange={(e) => setNewTask({ ...newTask, volunteerEmail: e.target.value })}
              required
            >
              <option value="">Select Volunteer</option>
              {volunteers.map((volunteer) => (
                <option key={volunteer.email} value={volunteer.email}>
                  {volunteer.email}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Task Title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Description"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Location"
              value={newTask.location}
              onChange={(e) => setNewTask({ ...newTask, location: e.target.value })}
              required
            />
            <button type="submit">Assign Task</button>
          </form>
        </div>
        <div className="tasks-list">
          <h3>Assigned Tasks</h3>
          {tasks.length > 0 ? (
            tasks.map((task, index) => (
              <div key={index} className="task-item">
                <h3>{task.title}</h3>
                <p>Volunteer: {task.volunteerEmail}</p>
                <p>Description: {task.description}</p>
                <p>Location: {task.location}</p>
              </div>
            ))
          ) : (
            <p>No tasks assigned yet.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default VolunteerManagement;