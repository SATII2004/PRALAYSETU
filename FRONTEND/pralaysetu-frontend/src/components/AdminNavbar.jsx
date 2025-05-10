import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("authHeader");
    navigate("/login");
  };

  return (
    <nav className="navbar admin-navbar">
      <div className="navbar-logo">
        <Link to="/admin-dashboard">PralaySetu Admin</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/admin-dashboard">Dashboard</Link></li>
        <li><Link to="/real-time-alerts">Real-Time Alerts</Link></li>
        <li>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavbar;