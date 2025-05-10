import React from "react";
import VolunteerNavbar from "../../components/VolunteerNavbar";
import Footer from "../../components/Footer";
import "./volunteerdashboard.css";

function VolunteerDashboard() {
  return (
    <div className="volunteer-dashboard-container">
      <VolunteerNavbar />
      <div className="dashboard-content">
        <h2>Volunteer Dashboard</h2>
        <div className="dashboard-cards">
          <div className="card">
            <h3>Real-Time Alerts</h3>
            <p>Stay updated with the latest disaster alerts.</p>
            <a href="/real-time-alerts" className="card-button">Go</a>
          </div>
          <div className="card">
            <h3>Help Requests</h3>
            <p>View and respond to help requests.</p>
            <a href="/help-request" className="card-button">Go</a>
          </div>
          <div className="card">
            <h3>Assigned Tasks</h3>
            <p>View tasks assigned to you.</p>
            <a href="/assigned-tasks" className="card-button">Go</a>
          </div>
          <div className="card">
            <h3>Volunteer Resources</h3>
            <p>Access resources for volunteers.</p>
            <a href="/volunteer-resources" className="card-button">Go</a>
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

export default VolunteerDashboard;