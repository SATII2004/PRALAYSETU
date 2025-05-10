import React from "react";
import { Link } from "react-router-dom";
import "../styles/footer.css"; // Importing the CSS file

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Left Section - Brand Info */}
        <div className="footer-brand">
          <h2>PralaySetu</h2>
          <p>Bridging Crisis to Safety</p>
        </div>

        {/* Middle Section - Quick Links */}
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Right Section - Contact Info */}
        <div className="footer-contact">
          <h3>Contact Us</h3>
          <p>Email: support@pralaysetu.com</p>
          <p>Phone: +91 98765 43210</p>
          <p>Address: Vijayawada, India</p>
        </div>
      </div>

      {/* Bottom Section - Copyright */}
      <div className="footer-bottom">
        <p>© 2025 PralaySetu Team. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
