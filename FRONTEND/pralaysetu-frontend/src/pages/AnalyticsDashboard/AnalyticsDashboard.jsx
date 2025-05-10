import React, { useState, useEffect } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import Footer from "../../components/Footer";
import "./analyticsdashboard.css";

function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState({ totalDisasters: 0, totalReports: 0, totalResources: 0 });

  useEffect(() => {
    const fetchAnalytics = async () => {
      const response = await fetch("http://localhost:8080/api/analytics", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await response.json();
      setAnalytics(data);
    };
    fetchAnalytics();
  }, []);

  return (
    <div className="analytics-dashboard-container">
      <AdminNavbar />
      <div className="analytics-dashboard-content">
        <h2>Analytics Dashboard</h2>
        <div className="analytics-cards">
          <div className="analytics-card">
            <h3>Total Disasters</h3>
            <p>{analytics.totalDisasters}</p>
          </div>
          <div className="analytics-card">
            <h3>Total Reports</h3>
            <p>{analytics.totalReports}</p>
          </div>
          <div className="analytics-card">
            <h3>Total Resources Allocated</h3>
            <p>{analytics.totalResources}</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AnalyticsDashboard;