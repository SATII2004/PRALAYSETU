import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import UserNavbar from "../../components/UserNavbar";
import VolunteerNavbar from "../../components/VolunteerNavbar";
import AdminNavbar from "../../components/AdminNavbar";
import Footer from "../../components/Footer";
import "./helprequest.css";

function HelpRequest() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const role = localStorage.getItem("role");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const request = { title, description };
    const response = await fetch("http://localhost:8080/api/help-requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(request),
    });
    if (response.ok) {
      alert("Help request submitted successfully!");
      setTitle("");
      setDescription("");
    } else {
      alert("Failed to submit help request!");
    }
  };

  const renderNavbar = () => {
    if (role === "USER") return <UserNavbar />;
    if (role === "VOLUNTEER") return <VolunteerNavbar />;
    if (role === "ADMIN") return <AdminNavbar />;
    return <Navbar />;
  };

  return (
    <div className="help-request-container">
      {renderNavbar()}
      <div className="help-request-content">
        <h2>Request Help</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Request Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
          <button type="submit">Submit Request</button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default HelpRequest;