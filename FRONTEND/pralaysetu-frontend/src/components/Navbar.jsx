import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css"; 
import AppLogo from '../assets/images/AppLogo.png'; 

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={AppLogo} alt="App Logo" />
        <span>PralaySetu</span>
      </div>

      <div className="nav-links">
        <Link to="/">🏠 Home</Link> 
        <Link to="/signup">📝 Signup</Link>
        <Link to="/login">🔑 Login</Link>
      
      </div>

      {/* Hamburger Icon for Mobile */}
      <div className={`hamburger ${isMobileMenuOpen ? "open" : ""}`} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>🏠 Home</Link>
          <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>🔑 Login</Link>
          <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>📝 Signup</Link>
          <Link to="/report-disaster" onClick={() => setIsMobileMenuOpen(false)}>⚠️ Report Disaster</Link>
          <Link to="/real-time-alerts" onClick={() => setIsMobileMenuOpen(false)}>🚨 Real-Time Alerts</Link>
          <Link to="/user-dashboard" onClick={() => setIsMobileMenuOpen(false)}>👤 User Dashboard</Link>
          <Link to="/volunteer-dashboard" onClick={() => setIsMobileMenuOpen(false)}>🙌 Volunteer Dashboard</Link>
          <Link to="/admin-dashboard" onClick={() => setIsMobileMenuOpen(false)}>🛠 Admin Dashboard</Link>
         
        </div>
      )}
    </nav>
  );
};

export default Navbar;

