import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import logo from "../assets/images/AppLogo.png";

function AdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="PralaySetu Logo" className="logo" />
        <span className="app-name">PralaySetu: Bridging Crisis to Safety</span>
      </div>
      <ul className="navbar-links">
        <li><Link to="/admin-dashboard">Dashboard</Link></li>
        <li><Link to="/manage-users">Manage Users</Link></li>
        <li><Link to="/resource-allocation">Resource Allocation</Link></li>
        <li><Link to="/volunteer-management">Volunteer Management</Link></li>
        <li><Link to="/analytics-dashboard">Analytics Dashboard</Link></li>
        <li><Link to="/real-time-alerts">Real-Time Alerts</Link></li>
        <li><Link to="/safety-tips">Safety Tips</Link></li>
        <li><Link to="/emergency-contacts">Emergency Contacts</Link></li>
        <li><Link to="/disaster-history">Disaster History</Link></li>
        <li onClick={handleLogout}><a>Logout</a></li>
      </ul>
    </nav>
  );
}

export default AdminNavbar;