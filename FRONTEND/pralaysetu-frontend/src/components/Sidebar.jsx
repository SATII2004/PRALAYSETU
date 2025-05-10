import React from "react";
import { Link } from "react-router-dom";
import "../styles/sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Admin Panel</h2>
      <ul>
        <li><Link to="/admin-dashboard">Overview</Link></li>
        <li><Link to="/real-time-alerts">Manage Alerts</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;