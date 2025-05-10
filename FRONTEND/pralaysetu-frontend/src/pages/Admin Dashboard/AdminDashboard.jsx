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
