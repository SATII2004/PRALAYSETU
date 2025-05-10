import React from "react";
import UserNavbar from "../../components/UserNavbar";
import Footer from "../../components/Footer";
import "./userdashboard.css";

function UserDashboard() {
  return (
    <div className="user-dashboard-container">
      <UserNavbar />
      <div className="dashboard-content">
        <h2>User Dashboard</h2>
        <div className="dashboard-cards">
          <div className="card">
            <h3>Report a Disaster</h3>
            <p>Submit details of a disaster in your area.</p>
            <a href="/report-disaster" className="card-button">Go</a>
          </div>
          <div className="card">
            <h3>Real-Time Alerts</h3>
            <p>Stay updated with the latest disaster alerts.</p>
            <a href="/real-time-alerts" className="card-button">Go</a>
          </div>
          <div className="card">
            <h3>Request Help</h3>
            <p>Seek assistance during a crisis.</p>
            <a href="/help-request" className="card-button">Go</a>
          </div>
          <div className="card">
            <h3>My Reports</h3>
            <p>View and manage your disaster reports.</p>
            <a href="/my-reports" className="card-button">Go</a>
          </div>
          <div className="card">
            <h3>My Help Requests</h3>
            <p>Track the status of your help requests.</p>
            <a href="/my-help-requests" className="card-button">Go</a>
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

export default UserDashboard;