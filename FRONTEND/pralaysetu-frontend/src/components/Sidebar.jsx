import React from "react";
import { Link } from "react-router-dom";
import "../styles/sidebar.css";

const Sidebar = ({ setSelectedPage }) => {
  return (
    <div className="sidebar">
      <h2>Admin Panel</h2>
      <ul>
        <li>
          <Link to="/admin" onClick={() => setSelectedPage("Dashboard")}>
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/admin/volunteers" onClick={() => setSelectedPage("Manage Volunteers")}>
            Manage Volunteers
          </Link>
        </li>
        <li>
          <Link to="/admin/resources" onClick={() => setSelectedPage("Resource Management")}>
            Resource Management
          </Link>
        </li>
        <li>
          <Link to="/admin/operations" onClick={() => setSelectedPage("Ongoing Operations")}>
            Ongoing Operations
          </Link>
        </li>
        <li>
          <Link to="/admin/alerts" onClick={() => setSelectedPage("SOS Alerts")}>
            SOS Alerts
          </Link>
        </li>
        <li>
          <Link to="/admin/access" onClick={() => setSelectedPage("Access Control")}>
            Access Control
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
