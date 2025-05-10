AlertCard.jsx

DisasCard.jsx

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




import { useState, useEffect } from "react";

const Geolocation = ({ onLocationUpdate }) => {
  const [location, setLocation] = useState({ lat: null, lng: null });

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setLocation(newLocation);
          if (onLocationUpdate) onLocationUpdate(newLocation);
        },
        (error) => console.error("Geolocation error:", error),
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div>
      <p>
        <strong>Your Location:</strong>{" "}
        {location.lat && location.lng
          ? `${location.lat}, ${location.lng}`
          : "Fetching..."}
      </p>
    </div>
  );
};

export default Geolocation;


import React from "react";

const Layer = ({ alerts }) => {
  return (
    <div className="layer-container">
      <h3>Live Disaster Alerts</h3>
      <ul>
        {alerts.length > 0 ? (
          alerts.map((alert, index) => (
            <li key={index} className="alert-item">
              <strong>{alert.type}</strong> - {alert.location} ({alert.time})
            </li>
          ))
        ) : (
          <p>No active alerts</p>
        )}
      </ul>
    </div>
  );
};

export default Layer;


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



import React from "react";
import { Link } from "react-router-dom";
import "../styles/sidebar.css";

const AdminSidebar = ({ setSelectedPage }) => {
  return (
    <div className="sidebar">
      <h2>Admin Panel</h2>
      <ul>
        <li><Link to="/admin" onClick={() => setSelectedPage("Dashboard")}>Dashboard</Link></li>
        <li><Link to="/admin/volunteers" onClick={() => setSelectedPage("Manage Volunteers")}>Manage Volunteers</Link></li>
        <li><Link to="/admin/resources" onClick={() => setSelectedPage("Resource Management")}>Resource Management</Link></li>
        <li><Link to="/admin/operations" onClick={() => setSelectedPage("Ongoing Operations")}>Ongoing Operations</Link></li>
        <li><Link to="/admin/alerts" onClick={() => setSelectedPage("SOS Alerts")}>SOS Alerts</Link></li>
        <li><Link to="/admin/access" onClick={() => setSelectedPage("Access Control")}>Access Control</Link></li>
      </ul>
    </div>
  );
};

export default AdminSidebar;


import React, { useState } from "react";
import AdminSidebar from "../../components/Sidebar";
import "./admindashboard.css";

const AdminDashboard = () => {
  const [selectedPage, setSelectedPage] = useState("Dashboard");

  return (
    <div className="admin-dashboard">
      <AdminSidebar setSelectedPage={setSelectedPage} />
      <div className="admin-content">
        <h1>{selectedPage}</h1>
        <p>Welcome to the Admin Dashboard. Manage everything from here.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;


.admin-dashboard {
  display: flex;
  height: 100vh;
  background: #f4f4f4;
}

.admin-content {
  flex: 1;
  padding: 20px;
  background: white;
  border-radius: 10px;
  margin: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}


import React, { useState } from "react";
import "./helprequest.css";

const HelpRequest = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    location: "",
    priority: "Moderate",
    message: "",
  });
  
  const [isEmergency, setIsEmergency] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Help Request Submitted:", formData);
    alert("Your help request has been submitted.");
  };
  
  return (
    <div className="help-request-container">
      <h2>Request Help</h2>
      <form onSubmit={handleSubmit} className="help-form">
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label>Contact Number:</label>
        <input type="text" name="contact" value={formData.contact} onChange={handleChange} required />

        <label>Location:</label>
        <input type="text" name="location" value={formData.location} onChange={handleChange} required />
        
        <label>Priority Level:</label>
        <select name="priority" value={formData.priority} onChange={handleChange}>
          <option value="Critical">Critical</option>
          <option value="Moderate">Moderate</option>
          <option value="Low">Low</option>
        </select>
        
        <label>Message:</label>
        <textarea name="message" value={formData.message} onChange={handleChange} required></textarea>
        
        <button type="submit" className="submit-btn">Submit Request</button>
        
        <div className="emergency-section">
          <p>Need immediate help?</p>
          <button type="button" className="emergency-btn" onClick={() => setIsEmergency(true)}>
            Activate Emergency Mode
          </button>
        </div>
      </form>
    </div>
  );
};

export default HelpRequest;

.help-request-container {
    max-width: 500px;
    margin: 40px auto;
    padding: 20px;
    background: #f8f9fa;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
  }
  
  .help-form {
    display: flex;
    flex-direction: column;
  }
  
  label {
    font-weight: bold;
    margin-top: 10px;
  }
  
  input, select, textarea {
    padding: 10px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
  }
  
  textarea {
    resize: vertical;
    min-height: 80px;
  }
  
  .submit-btn {
    background-color: #007bff;
    color: white;
    font-size: 18px;
    padding: 10px;
    margin-top: 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s;
  }
  
  .submit-btn:hover {
    background-color: #0056b3;
  }
  
  .emergency-section {
    text-align: center;
    margin-top: 20px;
  }
  
  .emergency-btn {
    background-color: red;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s;
  }
  
  .emergency-btn:hover {
    background-color: darkred;
  }
  
  @media (max-width: 768px) {
    .help-request-container {
      width: 90%;
      padding: 15px;
    }
  }
  


import React from "react";
import "./home.css"; // Importing the CSS file
import vid from "/src/assets/videos/vid.mp4"; // Correct file path

const Home = () => {
  return (
    <div className="home-container">
      {/* Background Video */}
      <video className="background-video" autoPlay loop>
        <source src={vid} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay Content */}
      <div className="overlay">
        {/* Scrolling News Ticker */}
        <div className="news-ticker">
          <p>
            🔴 Cyclone Alert in Coastal Areas | 🔥 Wildfire in California | 🌊
            Heavy Flooding in Mumbai | 🏔️ Earthquake in Japan | 🌀 Tornado
            Warning in Texas | 🚨 Stay Safe, Stay Informed!
          </p>
        </div>

        {/* Welcome Message */}
        <div className="welcome-section">
          <h1>Welcome to <span>PralaySetu</span></h1>
          <p>
            "Bridging Crisis to Safety" - Stay informed, stay prepared, and help
            make a difference in disaster management.
          </p>
          <button className="explore-btn">Explore More</button>
        </div>
      </div>
    </div>
  );
};

export default Home;


/* Home Page Container */
.home-container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

/* Background Video */
.background-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}

/* Overlay to Ensure Content is Readable */
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: rgba(0, 0, 0, 0.5); /* Dark Overlay for Readability */
}

/* Scrolling News Ticker */
.news-ticker {
  position: absolute;
  top: 20px;
  width: 100%;
  background: linear-gradient(90deg, #ff0000, #c70039); /* Stronger contrast */
  color: #fff; /* Bright white text for visibility */
  padding: 14px;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  font-size: 1.4rem; /* Bigger text */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.4);
  border-bottom: 2px solid #fff; /* Makes ticker more distinct */
}

/* Ticker Text */
.news-ticker p {
  display: inline-block;
  white-space: nowrap;
  animation: ticker 12s linear infinite;
  font-size: 1.5rem; /* Increased size */
  font-weight: bold;
  color: #ffffcc; /* Soft yellow for better contrast */
  letter-spacing: 1.5px;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.6); /* Stronger shadow for readability */
}

/* Ticker Animation */
@keyframes ticker {
  from {
      transform: translateX(100%);
  }
  to {
      transform: translateX(-100%);
  }
}

/* Welcome Section */
.welcome-section {
  max-width: 600px;
  padding: 20px;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  backdrop-filter: blur(5px);
  color: white;
}

.welcome-section h1 {  
  font-size: 2.5rem;
}

.welcome-section h1 span {
  color: #ffcc00;
}

.welcome-section p {
  font-size: 1.2rem;
  margin-top: 10px;
}

/* Explore More Button */
.explore-btn {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  color: black;
  background: #ffcc00;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
}

.explore-btn:hover {
  background: #ff9900;
}

/* Responsive Design */
@media (max-width: 768px) {
  .welcome-section h1 {
      font-size: 2rem;
  }
  .welcome-section p {
      font-size: 1rem;
  }
  .explore-btn {
      font-size: 0.9rem;
  }
}



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const [role, setRole] = useState("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [registeredEmail, setRegisteredEmail] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login Attempt:", { email, password, role });
    if (role === "user") navigate("/user-dashboard");
    else if (role === "volunteer") navigate("/volunteer-dashboard");
    else if (role === "admin") navigate("/admin-dashboard");
  };

  const handleForgotPassword = () => {
    if (registeredEmail === "example@gmail.com") {
      setOtpSent(true);
      alert("OTP sent to your registered email.");
    } else {
      alert("Email not registered.");
    }
  };

  const handleResetPassword = () => {
    if (otp === "123456") {
      alert("Password Reset Successful!");
      setShowForgotPassword(false);
    } else {
      alert("Invalid OTP!");
    }
  };

  return (
    <div className="login-container">
      {showForgotPassword && (
        <div className="forgot-password-modal">
          <div className="modal-content">
            {!otpSent ? (
              <>
                <h3>Forgot Password</h3>
                <input
                  type="email"
                  placeholder="Enter your registered email"
                  value={registeredEmail}
                  onChange={(e) => setRegisteredEmail(e.target.value)}
                  required
                />
                <button onClick={handleForgotPassword}>Send OTP</button>
                <button onClick={() => setShowForgotPassword(false)}>Close</button>
              </>
            ) : (
              <>
                <h3>Enter OTP</h3>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <button onClick={handleResetPassword}>Reset Password</button>
                <button onClick={() => setShowForgotPassword(false)}>Close</button>
              </>
            )}
          </div>
        </div>
      )}

      <form className="login-form" onSubmit={handleLogin}>
        <h2>Welcome to PralaySetu</h2>
        <p>Login to your account</p>
        
        <div className="role-selection">
          <label className={role === "user" ? "selected" : ""}>
            <input type="radio" name="role" value="user" checked={role === "user"} onChange={() => setRole("user")} /> User
          </label>
          <label className={role === "volunteer" ? "selected" : ""}>
            <input type="radio" name="role" value="volunteer" checked={role === "volunteer"} onChange={() => setRole("volunteer")} /> Volunteer
          </label>
          <label className={role === "admin" ? "selected" : ""}>
            <input type="radio" name="role" value="admin" checked={role === "admin"} onChange={() => setRole("admin")} /> Admin
          </label>
        </div>

        <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
        
        <div className="login-links">
          <a href="#" onClick={() => setShowForgotPassword(true)}>Forgot Password?</a>
          <span>|</span>
          <a href="#" onClick={() => navigate("/signup")}>New User? Sign Up</a>
        </div>
      </form>
    </div>
  );
};

export default Login;

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #21abc4, #fad0c4);
  font-family: "Poppins", sans-serif;
}

.login-form {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 350px;
  text-align: center;
}

h2 {
  color: #333;
  font-size: 24px;
  margin-bottom: 10px;
}

p {
  color: #777;
  font-size: 14px;
  margin-bottom: 20px;
}

.role-selection {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

.role-selection label {
  padding: 10px;
  border: 2px solid transparent;
  cursor: pointer;
  transition: 0.3s;
  border-radius: 8px;
  font-size: 14px;
  background: #eee;
}

.role-selection label.selected {
  border-color: #fc1c1c;
  background: #eb3017;
  color: white;
  font-weight: bold;
}

input[type="email"], input[type="password"], input[type="text"] {
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
}

button {
  width: 100%;
  padding: 12px;
  background: #ec3434;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;
}

button:hover {
  background: #eb2121;
}

.login-links {
  margin-top: 15px;
  font-size: 14px;
}

.login-links a {
  color: #270309;
  text-decoration: none;
  font-weight: bold;
}

.login-links a:hover {
  text-decoration: underline;
}

.forgot-password-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  text-align: center;
}

.modal-content h3 {
  margin-bottom: 15px;
}

.modal-content button {
  margin-top: 10px;
  background: #4caf50;
}

.modal-content button:hover {
  background: #43a047;
}


import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";
import "./realtimealerts.css";

// Fix Leaflet default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const RealTimeAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [filteredAlerts, setFilteredAlerts] = useState([]);
  const [filterType, setFilterType] = useState("All");
  const [userLocation, setUserLocation] = useState(null);
  const [nearbyDisaster, setNearbyDisaster] = useState(null);
  const [role, setRole] = useState("user");
  const [locationPrompt, setLocationPrompt] = useState(true);

  // Haversine formula to calculate distance between two coordinates (in km)
  const haversineDistance = (coords1, coords2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Earth's radius in km
    const dLat = toRad(coords2.lat - coords1.lat);
    const dLng = toRad(coords2.lng - coords1.lng);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(coords1.lat)) * Math.cos(toRad(coords2.lat)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Fetch real-time disaster data from USGS Earthquake API
  const fetchDisasterData = async () => {
    try {
      const response = await axios.get("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson");
      const earthquakeData = response.data.features.map((feature) => {
        const [longitude, latitude] = feature.geometry.coordinates;
        const magnitude = feature.properties.mag;
        let severity;
        if (magnitude >= 6) severity = "Critical";
        else if (magnitude >= 4) severity = "High";
        else if (magnitude >= 2) severity = "Moderate";
        else severity = "Low";

        return {
          type: "Earthquake",
          location: feature.properties.place,
          timestamp: new Date(feature.properties.time).toISOString(),
          severity: severity,
          description: `Magnitude ${magnitude} earthquake detected.`,
          latitude: latitude,
          longitude: longitude,
        };
      });
      setAlerts(earthquakeData);

      // Filter alerts within 100 km of user location
      if (userLocation) {
        const nearbyAlerts = earthquakeData.filter((alert) => {
          const distance = haversineDistance(userLocation, {
            lat: alert.latitude,
            lng: alert.longitude,
          });
          return distance <= 100; // Within 100 km
        });

        // Apply type filter after distance filter
        const finalAlerts = filterType === "All" ? nearbyAlerts : nearbyAlerts.filter(alert => alert.type === filterType);
        setFilteredAlerts(finalAlerts);

        // Check for nearby disaster for SOS
        nearbyAlerts.forEach((alert) => {
          const distance = haversineDistance(userLocation, {
            lat: alert.latitude,
            lng: alert.longitude,
          });
          if (distance <= 100) {
            setNearbyDisaster(alert);
            if (Notification.permission === "granted") {
              new Notification(`${role.charAt(0).toUpperCase() + role.slice(1)}: Disaster Nearby!`, {
                body: `A ${alert.type} has occurred in ${alert.location}. ${alert.description}`,
              });
            }
          }
        });
      }
    } catch (err) {
      console.error("Failed to fetch real-time disaster data:", err);
    }
  };

  useEffect(() => {
    // Determine role based on route
    const path = window.location.hash;
    if (path.includes("/volunteer")) {
      setRole("volunteer");
    } else {
      setRole("user");
    }

    // Request notification permission
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }

    // Request user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLoc = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(userLoc);
          setLocationPrompt(false);

          // Fetch disaster data after getting location
          fetchDisasterData();
          const interval = setInterval(fetchDisasterData, 5 * 60 * 1000); // 5 minutes
          return () => clearInterval(interval); // Clean up interval on unmount
        },
        () => {
          console.warn("Location permission denied");
          setLocationPrompt(true);
        }
      );
    } else {
      console.warn("Geolocation not supported");
      setLocationPrompt(true);
    }
  }, []);

  useEffect(() => {
    // Reapply type filter when filterType changes
    if (userLocation && alerts.length > 0) {
      const nearbyAlerts = alerts.filter((alert) => {
        const distance = haversineDistance(userLocation, {
          lat: alert.latitude,
          lng: alert.longitude,
        });
        return distance <= 100;
      });
      const finalAlerts = filterType === "All" ? nearbyAlerts : nearbyAlerts.filter(alert => alert.type === filterType);
      setFilteredAlerts(finalAlerts);
    }
  }, [filterType, alerts, userLocation]);

  const handleRequestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLoc = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(userLoc);
          setLocationPrompt(false);

          // Fetch disaster data after getting location
          fetchDisasterData();
          const interval = setInterval(fetchDisasterData, 5 * 60 * 1000); // 5 minutes
          return () => clearInterval(interval);
        },
        () => {
          console.warn("Location permission denied again");
        }
      );
    }
  };

  const getMarkerColor = (type) => {
    const colorMap = {
      Earthquake: "#dc2626",
      Flood: "#1e3a8a",
      Cyclone: "#16a34a",
      Wildfire: "#f97316",
      Landslide: "#6b7280",
    };
    return colorMap[type] || "#9ca3af";
  };

  return (
    <div className="alerts-container">
      <h2>Real-Time Disaster Alerts</h2>

      {locationPrompt ? (
        <div className="location-prompt">
          <p>We need your location to show nearby disaster alerts (within 100 km).</p>
          <button onClick={handleRequestLocation}>Allow Location Access</button>
        </div>
      ) : (
        <>
          {nearbyDisaster && (
            <div className="sos-banner">
              <strong>SOS Alert:</strong> {nearbyDisaster.type} in {nearbyDisaster.location}! {nearbyDisaster.description}
            </div>
          )}

          <div className="filter-bar">
            <label>Filter by Type:</label>
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
              <option value="All">All</option>
              <option value="Earthquake">Earthquake</option>
              <option value="Flood">Flood</option>
              <option value="Cyclone">Cyclone</option>
              <option value="Wildfire">Wildfire</option>
              <option value="Landslide">Landslide</option>
            </select>
          </div>

          <div className="alerts-list">
            {filteredAlerts.length === 0 ? (
              <p>No nearby alerts within 100 km.</p>
            ) : (
              filteredAlerts.map((alert, index) => (
                <div key={index} className={`alert-card ${alert.severity.toLowerCase()}`}>
                  <h3>{alert.type}</h3>
                  <p><strong>Location:</strong> {alert.location}</p>
                  <p><strong>Time:</strong> {new Date(alert.timestamp).toLocaleString()}</p>
                  <p><strong>Severity:</strong> {alert.severity}</p>
                  <p>{alert.description}</p>
                </div>
              ))
            )}
          </div>

          <div className="map-section">
            {typeof window !== "undefined" && (
              <MapContainer center={userLocation || [20, 78]} zoom={5} className="alerts-map">
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {filteredAlerts.map((alert, index) => (
                  <Marker
                    key={index}
                    position={[alert.latitude, alert.longitude]}
                    icon={L.divIcon({
                      className: "custom-icon",
                      html: `<div style='background-color:${getMarkerColor(alert.type)}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white;'></div>`,
                    })}
                  >
                    <Popup>
                      <strong>{alert.type}</strong><br />
                      {alert.description}<br />
                      <em>{alert.location}</em><br />
                      {new Date(alert.timestamp).toLocaleString()}
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default RealTimeAlerts;


.alerts-container {
  max-width: 1000px;
  margin: 20px auto;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #1e3a8a;
}
.location-prompt {
  background: #f0f4f8;
  padding: 10px;
  text-align: center;
  margin-bottom: 15px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.location-prompt p {
  margin: 0 0 10px;
  color: #1e3a8a;
  font-weight: bold;
}
.location-prompt button {
  padding: 8px 16px;
  background: #1e3a8a;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}
.location-prompt button:hover {
  background: #dc2626;
}
.sos-banner {
  background: #dc2626;
  color: white;
  padding: 10px;
  text-align: center;
  font-weight: bold;
  margin-bottom: 15px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
.filter-bar {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  gap: 10px;
  align-items: center;
}
.filter-bar label {
  font-weight: bold;
  color: #1e3a8a;
}
.filter-bar select {
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
}
.alerts-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-bottom: 20px;
}
.alert-card {
  background: #f0f4f8;
  padding: 15px;
  border-radius: 8px;
  border-left: 5px solid #6b7280;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
}
.alert-card.critical { border-left-color: #dc2626; }
.alert-card.high { border-left-color: #f97316; }
.alert-card.moderate { border-left-color: #16a34a; }
.alert-card.low { border-left-color: #1e3a8a; }
.alert-card h3 {
  margin: 0 0 10px;
  color: #1e3a8a;
}
.alert-card p {
  margin: 5px 0;
  color: #4b5563;
}
.alert-card p strong {
  color: #1e3a8a;
}
.map-section {
  height: 400px;
}
.alerts-map {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  overflow: hidden;
}
@media (max-width: 768px) {
  .alerts-list {
    grid-template-columns: 1fr;
  }
  .filter-bar {
    flex-direction: column;
  }
}



import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./reportdisaster.css";

const ReportDisaster = () => {
  const [formData, setFormData] = useState({
    disasterType: "",
    location: "",
    description: "",
    latitude: null,
    longitude: null,
    images: [],
  });

  const [imagePreviews, setImagePreviews] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      alert("You can upload a maximum of 5 images.");
      return;
    }

    setFormData({ ...formData, images: files });

    // Generate preview URLs
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Disaster Reported:", formData);
    alert("Disaster report submitted successfully!");

    // TODO: Convert to FormData and send to backend if needed
  };

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setFormData((prevData) => ({
          ...prevData,
          latitude: e.latlng.lat,
          longitude: e.latlng.lng,
          location: `Lat: ${e.latlng.lat}, Lng: ${e.latlng.lng}`,
        }));
      },
    });

    return formData.latitude && formData.longitude ? (
      <Marker position={[formData.latitude, formData.longitude]} />
    ) : null;
  };

  return (
    <div className="report-disaster-container">
      <h2>Report a Disaster</h2>
      <form onSubmit={handleSubmit} className="report-form">
        <label>Disaster Type:</label>
        <select name="disasterType" value={formData.disasterType} onChange={handleChange} required>
          <option value="">Select Disaster</option>
          <option value="Earthquake">Earthquake</option>
          <option value="Flood">Flood</option>
          <option value="Wildfire">Wildfire</option>
          <option value="Cyclone">Cyclone</option>
          <option value="Landslide">Landslide</option>
        </select>

        <label>Location:</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Type address or click on the map"
        />

        <div className="map-container">
          <MapContainer center={[20, 78]} zoom={4} style={{ height: "100%", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <LocationMarker />
          </MapContainer>
        </div>

        <label>Description:</label>
        <textarea name="description" value={formData.description} onChange={handleChange} required></textarea>

        <label>Upload Images (max 5):</label>
        <input
          type="file"
          name="images"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
        />
        <div className="image-preview-container">
          {imagePreviews.map((src, index) => (
            <img key={index} src={src} alt={`Preview ${index + 1}`} className="preview-image" />
          ))}
        </div>

        <button type="submit" className="submit-btn">Submit Report</button>
      </form>
    </div>
  );
};

export default ReportDisaster;


.report-disaster-container {
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  background:orange;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
  animation: fadeIn 1s ease-in-out;
}

.report-form {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: bold;
  margin-top: 10px;
  font-size: 16px;
}

input, select, textarea {
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  transition: all 0.3s ease-in-out;
}

input:focus, select:focus, textarea:focus {
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

textarea {
  resize: vertical;
  min-height: 80px;
}

.map-container {
  height: 300px;
  margin-top: 10px;
  border-radius: 5px;
  overflow: hidden;
  animation: fadeIn 1.5s ease-in-out;
}

.submit-btn {
  background-color: #007bff;
  color: rgb(204, 87, 87);
  font-size: 18px;
  padding: 10px;
  margin-top: 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;
}

.submit-btn:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .report-disaster-container {
    width: 90%;
    padding: 15px;
  }
}


.image-preview-container {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  gap: 10px;
}

.preview-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 6px;
  border: 2px solid #ddd;
}



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("user");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    location: { lat: 51.505, lng: -0.09 },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert("Signup successful! Redirecting to dashboard...");

    const dashboardRoutes = {
      user: "/user-dashboard",
      volunteer: "/volunteer-dashboard",
      admin: "/admin-dashboard",
    };

    setTimeout(() => navigate(dashboardRoutes[role]), 1000);
  };

  function LocationMarker() {
    useMapEvents({
      click(e) {
        setFormData({
          ...formData,
          location: e.latlng,
          address: `Lat: ${e.latlng.lat}, Lng: ${e.latlng.lng}`,
        });
      },
    });
    return formData.location ? <Marker position={formData.location} /> : null;
  }

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSignup}>
        <h2>Join Us Today</h2>
        <div className="name-row">
          <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
          <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
        </div>
        <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
        <input type="text" name="address" placeholder="Address or Click Map" value={formData.address} onChange={handleChange} />
        <div className="map-container">
          <p>📍 Click on the map to set your location</p>
          <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "250px", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <LocationMarker />
          </MapContainer>
        </div>
        <div className="role-selection">
          {["user", "volunteer"].map((r) => (
            <label key={r}>
              <input type="radio" name="role" value={r} checked={role === r} onChange={() => setRole(r)} />
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </label>
          ))}
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;

.signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  padding: 20px;
}

.signup-form {
  background: white;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  width: 420px;
  display: flex;
  flex-direction: column;
  animation: fadeIn 0.5s ease-in-out;
}

.signup-form h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
  font-size: 24px;
}

.signup-form label {
  font-weight: bold;
  margin-top: 12px;
  color: #444;
}

.signup-form input {
  padding: 12px;
  margin-top: 5px;
  border: 2px solid #ccc;
  border-radius: 8px;
  width: 100%;
  font-size: 16px;
  transition: 0.3s;
}

.signup-form input:focus {
  border-color: #2575fc;
  outline: none;
  box-shadow: 0 0 8px rgba(37, 117, 252, 0.4);
}

.name-row {
  display: flex;
  gap: 12px;
}

.name-row div {
  flex: 1;
}

.map-container {
  margin-top: 15px;
  text-align: center;
}

.map-container p {
  font-size: 14px;
  margin-bottom: 5px;
  font-weight: bold;
}

.role-selection {
  display: flex;
  justify-content: center;
  margin-top: 12px;
  font-weight: bold;
}

.role-selection label {
  margin-left: 5px;
  color: #333;
}

button {
  margin-top: 20px;
  padding: 12px;
  border: none;
  background: linear-gradient(90deg, #ff7eb3, #ff758c);
  color: white;
  font-size: 18px;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
}

button:hover {
  background: linear-gradient(90deg, #ff5e98, #ff3e72);
  transform: scale(1.05);
}

.signup-links {
  text-align: center;
  margin-top: 12px;
}

.signup-links a {
  color: #2575fc;
  text-decoration: none;
  font-weight: bold;
}

.signup-links a:hover {
  text-decoration: underline;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 480px) {
  .signup-form {
    width: 90%;
    padding: 20px;
  }
}


import React from "react";
import "./userdashboard.css";

const UserDashboard = () => {
  return (
    <div className="dashboard-container">
      <h1>👤 User Dashboard</h1>
      <div className="dashboard-section">
        <h2>⚠️ Report a Disaster</h2>
        <p>Submit a disaster report for immediate response.</p>
        <button>Report Now</button>
      </div>
      <div className="dashboard-section">
        <h2>🚨 Real-Time Alerts</h2>
        <p>Stay updated with live disaster alerts in your area.</p>
        <button>View Alerts</button>
      </div>
      <div className="dashboard-section">
        <h2>🆘 Request Help</h2>
        <p>Request emergency assistance for you or others.</p>
        <button>Request Help</button>
      </div>
    </div>
  );
};

export default UserDashboard;


.dashboard-container {
    max-width: 900px;
    margin: 20px auto;
    padding: 20px;
    text-align: center;
    background: #e3f2fd;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  }
  
  .dashboard-container h1 {
    font-size: 26px;
    color: #1e88e5;
    margin-bottom: 20px;
  }
  
  .dashboard-section {
    background: #fff;
    padding: 20px;
    margin: 15px 0;
    border-radius: 8px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .dashboard-section h2 {
    color: #1e88e5;
  }
  
  .dashboard-section p {
    color: #666;
    font-size: 14px;
  }
  
  button {
    background: #1e88e5;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    transition: background 0.3s;
  }
  
  button:hover {
    background: #1565c0;
  }
  


import React from "react";
import "./volunteerdashboard.css";

const VolunteerDashboard = () => {
  return (
    <div className="dashboard-container">
      <h1>🙌 Volunteer Dashboard</h1>
      <div className="dashboard-section">
        <h2>📋 Assigned Tasks</h2>
        <p>View your assigned rescue tasks and updates.</p>
        <button>View Tasks</button>
      </div>
      <div className="dashboard-section">
        <h2>🆘 Pending Requests</h2>
        <p>Respond to people needing urgent help.</p>
        <button>Check Requests</button>
      </div>
      <div className="dashboard-section">
        <h2>🚑 Rescue Operations</h2>
        <p>Coordinate with teams for disaster response.</p>
        <button>Start Operation</button>
      </div>
    </div>
  );
};

export default VolunteerDashboard;


.dashboard-container {
    max-width: 900px;
    margin: 20px auto;
    padding: 20px;
    text-align: center;
    background: #e8f5e9;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  }
  
  .dashboard-container h1 {
    font-size: 26px;
    color: #388e3c;
    margin-bottom: 20px;
  }
  
  .dashboard-section {
    background: #fff;
    padding: 20px;
    margin: 15px 0;
    border-radius: 8px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .dashboard-section h2 {
    color: #388e3c;
  }
  
  .dashboard-section p {
    color: #666;
    font-size: 14px;
  }
  
  button {
    background: #388e3c;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    transition: background 0.3s;
  }
  
  button:hover {
    background: #2e7d32;
  }
  


import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import ReportDisaster from "../pages/ReportDisaster/ReportDisaster";
import RealTimeAlerts from "../pages/RealTimeAlerts/RealTimeAlerts";
import HelpRequest from "../pages/HelpRequest/HelpRequest";
import AdminDashboard from "../pages/Admin Dashboard/AdminDashboard";
import VolunteerDashboard from "../pages/Volunteer Dashboard/VolunteerDashboard";
import UserDashboard from "../pages/User Dashboard/UserDashboard";


const AppRoutes = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/report-disaster" element={<ReportDisaster />} />
        <Route path="/real-time-alerts" element={<RealTimeAlerts />} />
        <Route path="/help-request" element={<HelpRequest />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/volunteer-dashboard" element={<VolunteerDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />


      </Routes>
      <Footer />
    </Router>
  );
};

export default AppRoutes;


alertcard.css

app.css

disastercard.css

.footer {
  background-color: #8fb4d8;
  color: #ffffff;
  padding: 30px 20px;
  text-align: center;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: auto;
  padding-bottom: 15px;
  border-bottom: 1px solid #e4c9c9;
}

.footer-brand h2 {
  font-size: 24px;
  margin-bottom: 5px;
}

.footer-brand p {
  font-size: 14px;
  font-style: italic;
  opacity: 0.8;
}

.footer-links h3, 
.footer-contact h3 {
  font-size: 18px;
  margin-bottom: 10px;
}

.footer-links ul {
  list-style: none;
  padding: 0;
}

.footer-links li {
  margin-bottom: 5px;
}

.footer-links a {
  color: #ffffff;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.footer-links a:hover {
  color: #1abc9c;
}

.footer-contact p {
  margin: 5px 0;
  font-size: 14px;
}

.footer-bottom {
  padding-top: 10px;
  font-size: 14px;
  opacity: 0.8;
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    text-align: center;
  }
  
  .footer-links ul {
    padding: 0;
  }
}


.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #27b9b9;
  padding: 12px 20px;
  position: relative;
}

.logo {
  display: flex;
  align-items: center;
}

.logo img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.nav-links {
  display: flex;
  gap: 20px;
}

.nav-links a {
  text-decoration: none;
  color: #fff;
  font-weight: 500;
  font-size: 1rem;
  transition: color 0.3s ease;
}

.nav-links a:hover {
  color: #ffeb3b;
}

.hamburger {
  width: 30px;
  height: 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
}

.hamburger span {
  width: 100%;
  height: 4px;
  background: white;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.hamburger.open span:nth-child(1) {
  transform: translateY(10px) rotate(45deg);
}

.hamburger.open span:nth-child(2) {
  opacity: 0;
}

.hamburger.open span:nth-child(3) {
  transform: translateY(-10px) rotate(-45deg);
}

.mobile-menu {
  position: absolute;
  top: 60px;
  right: 20px;
  background: #0e68b1;
  width: 200px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  z-index: 100;
}

.mobile-menu a {
  padding: 10px;
  text-decoration: none;
  color: white;
  font-size: 1rem;
  transition: background 0.3s ease;
}

.mobile-menu a:hover {
  background: #3b9b1e;
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
  }
}


.sidebar {
  width: 250px;
  height: 100vh;
  background: #333;
  color: white;
  padding: 20px;
  position: fixed;
}

.sidebar h2 {
  text-align: center;
  margin-bottom: 20px;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar ul li {
  padding: 10px;
  border-bottom: 1px solid #555;
}

.sidebar ul li a {
  color: white;
  text-decoration: none;
  display: block;
}

.sidebar ul li:hover {
  background: #555;
}


import React from "react";
import AppRoutes from "./routes/AppRoutes";
import "./styles/App.css"; 

const App = () => {
  return (
    <div className="app-container">
      <AppRoutes />
    </div>
  );
};

export default App;


index.css

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


{
  "name": "pralaysetu-frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@react-google-maps/api": "^2.20.6",
    "apexcharts": "^4.5.0",
    "axios": "^1.8.1",
    "azure-maps-control": "^3.6.0",
    "leaflet": "^1.9.4",
    "ol": "^10.4.0",
    "react": "^18.3.1",
    "react-apexcharts": "^1.7.0",
    "react-dom": "^18.3.1",
    "react-icons": "^5.5.0",
    "react-leaflet": "^4.2.1",
    "react-router-dom": "^7.2.0",
    "socket.io-client": "^4.8.1"
  },
  "devDependencies": {
    "@eslint/js": "^9.17.0",
    "@types/react": "^18.3.18",
    "@types/react-dom": "^18.3.5",
    "@vitejs/plugin-react": "^4.3.4",
    "eslint": "^9.17.0",
    "eslint-plugin-react": "^7.37.2",
    "eslint-plugin-react-hooks": "^5.0.0",
    "eslint-plugin-react-refresh": "^0.4.16",
    "globals": "^15.14.0",
    "vite": "^6.0.5"
  }
}



import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://localhost:5000", // Proxy backend requests
    },
  },
});



