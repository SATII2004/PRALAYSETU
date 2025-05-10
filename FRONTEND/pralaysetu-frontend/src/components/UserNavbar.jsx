import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";

const UserNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("authHeader");
    navigate("/login");
  };

  return (
    <nav className="navbar user-navbar">
      <div className="navbar-logo">
        <Link to="/user-dashboard">PralaySetu User</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/user-dashboard">Dashboard</Link></li>
        <li><Link to="/real-time-alerts">Real-Time Alerts</Link></li>
        <li><Link to="/report-disaster">Report Disaster</Link></li>
        <li><Link to="/help-request">Request Help</Link></li>
        <li>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default UserNavbar;