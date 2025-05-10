import React from "react";
import "../styles/sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <h3>Sidebar</h3>
      <ul>
        <li>Quick Links</li>
        <li>Notifications</li>
        <li>Settings</li>
      </ul>
    </div>
  );
}

export default Sidebar;