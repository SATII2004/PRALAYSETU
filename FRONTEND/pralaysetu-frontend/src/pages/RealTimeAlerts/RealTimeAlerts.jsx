import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import UserNavbar from "../../components/UserNavbar";
import VolunteerNavbar from "../../components/VolunteerNavbar";
import AdminNavbar from "../../components/AdminNavbar";
import Footer from "../../components/Footer";
import AlertCard from "../../components/AlertCard";
import "./realtimealerts.css";

function RealTimeAlerts() {
  const [alerts, setAlerts] = useState([]);
  const role = localStorage.getItem("role");

  useEffect(() => {
    const fetchAlerts = async () => {
      const response = await fetch("http://localhost:8080/api/alerts", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await response.json();
      setAlerts(data);
    };
    fetchAlerts();
  }, []);

  const renderNavbar = () => {
    if (role === "USER") return <UserNavbar />;
    if (role === "VOLUNTEER") return <VolunteerNavbar />;
    if (role === "ADMIN") return <AdminNavbar />;
    return <Navbar />;
  };

  return (
    <div className="real-time-alerts-container">
      {renderNavbar()}
      <div className="real-time-alerts-content">
        <h2>Real-Time Alerts</h2>
        <div className="alerts-list">
          {alerts.length > 0 ? (
            alerts.map((alert) => (
              <AlertCard
                key={alert.id}
                title={alert.title}
                description={alert.description}
                date={alert.date}
              />
            ))
          ) : (
            <p>No alerts available.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default RealTimeAlerts;