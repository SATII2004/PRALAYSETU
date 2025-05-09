import React, { useState } from "react";
import AdminSidebar from "../../components/Sidebar";
import "./admindashboard.css";

const AdminDashboard = () => {
  const [selectedPage, setSelectedPage] = useState("Dashboard");

  const renderPageContent = () => {
    switch (selectedPage) {
      case "Manage Volunteers":
        return <p>Here you can add, update, or remove volunteers.</p>;
      case "Resource Management":
        return <p>Manage relief materials, food supplies, and other critical resources here.</p>;
      case "Ongoing Operations":
        return <p>Track all ongoing rescue and relief operations.</p>;
      case "SOS Alerts":
        return <p>View and respond to urgent SOS alerts from citizens.</p>;
      case "Access Control":
        return <p>Grant or revoke system access to team members.</p>;
      default:
        return <p>Welcome to the Admin Dashboard. Manage everything from here.</p>;
    }
  };

  return (
    <div className="admin-dashboard">
      <AdminSidebar setSelectedPage={setSelectedPage} />
      <div className="admin-content">
        <h1>{selectedPage}</h1>
        <div className="page-details">
          {renderPageContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
