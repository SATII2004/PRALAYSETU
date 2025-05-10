import React from "react";
import { Link } from "react-router-dom";
import "./userdashboard.css";

const UserDashboard = () => {
  return (
    <div className="user-dashboard-container">
      <h2>User Dashboard</h2>
      <div className="dashboard-options">
        <Link to="/real-time-alerts" className="dashboard-btn">View Alerts</Link>
        <Link to="/report-disaster" className="dashboard-btn">Report Disaster</Link>
        <Link to="/help-request" className="dashboard-btn">Request Help</Link>
      </div>
    </div>
  );
};

export default UserDashboard;