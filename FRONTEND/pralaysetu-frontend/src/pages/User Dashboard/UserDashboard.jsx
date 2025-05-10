import React from "react";
import "./userdashboard.css";

const UserDashboard = () => {
  return (
    <div className="dashboard-container">
      <h1>👤 User Dashboard</h1>
      <div className="dashboard-section">
        <h2>⚠️ Report a Disaster</h2>
        <p>Submit a disaster report for immediate response.</p>
        <button>Report Now</button>
      </div>
      <div className="dashboard-section">
        <h2>🚨 Real-Time Alerts</h2>
        <p>Stay updated with live disaster alerts in your area.</p>
        <button>View Alerts</button>
      </div>
      <div className="dashboard-section">
        <h2>🆘 Request Help</h2>
        <p>Request emergency assistance for you or others.</p>
        <button>Request Help</button>
      </div>
    </div>
  );
};

export default UserDashboard;
