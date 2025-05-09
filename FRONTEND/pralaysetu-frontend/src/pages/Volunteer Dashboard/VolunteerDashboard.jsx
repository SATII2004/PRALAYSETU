import React from "react";
import "./volunteerdashboard.css";

const VolunteerDashboard = () => {
  return (
    <div className="dashboard-container">
      <h1>🙌 Volunteer Dashboard</h1>
      <div className="dashboard-section">
        <h2>📋 Assigned Tasks</h2>
        <p>View your assigned rescue tasks and updates.</p>
        <button>View Tasks</button>
      </div>
      <div className="dashboard-section">
        <h2>🆘 Pending Requests</h2>
        <p>Respond to people needing urgent help.</p>
        <button>Check Requests</button>
      </div>
      <div className="dashboard-section">
        <h2>🚑 Rescue Operations</h2>
        <p>Coordinate with teams for disaster response.</p>
        <button>Start Operation</button>
      </div>
    </div>
  );
};

export default VolunteerDashboard;
