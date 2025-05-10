import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import logo from "../assets/images/AppLogo.png";

function UserNavbar() {
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
        <li><Link to="/user-dashboard">Dashboard</Link></li>
        <li><Link to="/report-disaster">Report Disaster</Link></li>
        <li><Link to="/real-time-alerts">Real-Time Alerts</Link></li>
        <li><Link to="/help-request">Help Request</Link></li>
        <li><Link to="/my-reports">My Reports</Link></li>
        <li><Link to="/my-help-requests">My Help Requests</Link></li>
        <li><Link to="/safety-tips">Safety Tips</Link></li>
        <li><Link to="/emergency-contacts">Emergency Contacts</Link></li>
        <li><Link to="/disaster-history">Disaster History</Link></li>
        <li onClick={handleLogout}><a>Logout</a></li>
      </ul>
    </nav>
  );
}

export default UserNavbar;