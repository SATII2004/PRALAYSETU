import React, { useState, useEffect } from "react";
import VolunteerNavbar from "../../components/VolunteerNavbar";
import Footer from "../../components/Footer";
import "./assignedtasks.css";

function AssignedTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("http://localhost:8080/api/tasks/volunteer", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await response.json();
      setTasks(data);
    };
    fetchTasks();
  }, []);

  return (
    <div className="assigned-tasks-container">
      <VolunteerNavbar />
      <div className="assigned-tasks-content">
        <h2>Assigned Tasks</h2>
        <div className="tasks-list">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <div key={task.id} className="task-item">
                <h3>{task.title}</h3>
                <p>Description: {task.description}</p>
                <p>Location: {task.location}</p>
                <p>Status: {task.status}</p>
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

export default AssignedTasks;