import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./volunteerdashboard.css";

const VolunteerDashboard = () => {
  const [sosRequests, setSosRequests] = useState([]);
  const [available, setAvailable] = useState(false);
  const authHeader = localStorage.getItem("authHeader");
  const username = localStorage.getItem("userEmail")?.split("@")[0] || "";

  useEffect(() => {
    const fetchSosRequests = async () => {
      try {
        const response = await axios.get("http://localhost:5000/volunteer/sos-requests", {
          headers: { Authorization: authHeader },
        });
        setSosRequests(response.data);
      } catch (error) {
        console.error("Error fetching SOS requests:", error);
        alert("Failed to fetch SOS requests. Please log in again.");
      }
    };
    fetchSosRequests();
  }, [authHeader]);

  const handleAvailability = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/volunteer/availability",
        null,
        {
          params: { username, available: !available },
          headers: { Authorization: authHeader },
        }
      );
      alert(response.data);
      setAvailable(!available);
    } catch (error) {
      console.error("Error updating availability:", error);
      alert("Failed to update availability. Please log in again.");
    }
  };

  return (
    <div className="volunteer-dashboard-container">
      <h2>Volunteer Dashboard</h2>
      <div className="dashboard-options">
        <Link to="/real-time-alerts" className="dashboard-btn">View Alerts</Link>
        <button onClick={handleAvailability} className="dashboard-btn">
          {available ? "Set Unavailable" : "Set Available"}
        </button>
      </div>
      <div className="sos-requests">
        <h3>SOS Requests</h3>
        <ul>
          {sosRequests.map((request) => (
            <li key={request.id}>
              {request.message} by {request.username} at ({request.latitude}, {request.longitude})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default VolunteerDashboard;