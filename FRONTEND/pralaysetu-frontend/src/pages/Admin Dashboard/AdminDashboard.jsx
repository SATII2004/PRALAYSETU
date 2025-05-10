import React from "react";
import AdminNavbar from "../../components/AdminNavbar";
import Footer from "../../components/Footer";
import "./admindashboard.css";

function AdminDashboard() {
  return (
    <div className="admin-dashboard-container">
      <AdminNavbar />
      <div className="dashboard-content">
        <h2>Admin Dashboard</h2>
        <div className="dashboard-cards">
          <div className="card">
            <h3>Manage Users</h3>
            <p>View and manage users and volunteers.</p>
            <a href="/manage-users" className="card-button">Go</a>
          </div>
          <div className="card">
            <h3>Resource Allocation</h3>
            <p>Allocate resources to disaster-affected areas.</p>
            <a href="/resource-allocation" className="card-button">Go</a>
          </div>
          <div className="card">
            <h3>Volunteer Management</h3>
            <p>Assign tasks to volunteers and monitor activities.</p>
            <a href="/volunteer-management" className="card-button">Go</a>
          </div>
          <div className="card">
            <h3>Analytics Dashboard</h3>
            <p>View disaster and resource analytics.</p>
            <a href="/analytics-dashboard" className="card-button">Go</a>
          </div>
          <div className="card">
            <h3>Real-Time Alerts</h3>
            <p>Monitor disaster alerts in real-time.</p>
            <a href="/real-time-alerts" className="card-button">Go</a>
          </div>
          <div className="card">
            <h3>Safety Tips</h3>
            <p>Learn how to stay safe during disasters.</p>
            <a href="/safety-tips" className="card-button">Go</a>
          </div>
          <div className="card">
            <h3>Emergency Contacts</h3>
            <p>Access important emergency numbers.</p>
            <a href="/emergency-contacts" className="card-button">Go</a>
          </div>
          <div className="card">
            <h3>Disaster History</h3>
            <p>View past disaster records.</p>
            <a href="/disaster-history" className="card-button">Go</a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AdminDashboard;