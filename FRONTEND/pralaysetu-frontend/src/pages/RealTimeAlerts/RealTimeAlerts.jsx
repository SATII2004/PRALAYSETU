import React, { useState, useEffect } from "react";
import axios from "axios";
import AlertCard from "../../components/AlertCard";
import "./realtimealerts.css";

const RealTimeAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const userRole = localStorage.getItem("userRole");
  const authHeader = localStorage.getItem("authHeader");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => {
        console.error("Geolocation error:", error);
        setLatitude(51.505);
        setLongitude(-0.09);
      }
    );
  }, []);

  useEffect(() => {
    const fetchAlerts = async () => {
      if (latitude === 0 && longitude === 0) return;
      const endpoint = userRole === "volunteer" ? "/volunteer/alerts" : "/user/alerts";
      try {
        const response = await axios.get(`http://localhost:5000${endpoint}`, {
          params: { latitude, longitude },
          headers: {
            Authorization: authHeader,
          },
        });
        setAlerts(response.data);
      } catch (error) {
        console.error("Error fetching alerts:", error);
        alert("Failed to fetch alerts. Please log in again.");
      }
    };
    fetchAlerts();
  }, [latitude, longitude, userRole, authHeader]);

  return (
    <div className="alerts-container">
      <h2>Real-Time Disaster Alerts</h2>
      <div className="alerts-list">
        {alerts.length > 0 ? (
          alerts.map((alert) => (
            <AlertCard key={alert.id} alert={alert} />
          ))
        ) : (
          <p>No alerts in your area.</p>
        )}
      </div>
    </div>
  );
};

export default RealTimeAlerts;