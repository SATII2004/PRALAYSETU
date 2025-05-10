import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";
import logo from "../assets/images/AppLogo.png";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="PralaySetu Logo" className="logo" />
        <span className="app-name">PralaySetu: Bridging Crisis to Safety</span>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">Signup</Link></li>
        <li><Link to="/safety-tips">Safety Tips</Link></li>
        <li><Link to="/emergency-contacts">Emergency Contacts</Link></li>
        <li><Link to="/disaster-history">Disaster History</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;