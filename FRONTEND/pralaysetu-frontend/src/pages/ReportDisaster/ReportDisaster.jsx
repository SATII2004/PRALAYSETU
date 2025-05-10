import React, { useState } from "react";
import UserNavbar from "../../components/UserNavbar";
import Footer from "../../components/Footer";
import Geolocation from "../../components/Geolocation";
import "./reportdisaster.css";

function ReportDisaster() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const report = { title, description, location };
    const response = await fetch("http://localhost:8080/api/reports", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(report),
    });
    if (response.ok) {
      alert("Disaster reported successfully!");
      setTitle("");
      setDescription("");
      setLocation(null);
    } else {
      alert("Failed to report disaster!");
    }
  };

  return (
    <div className="report-disaster-container">
      <UserNavbar />
      <div className="report-disaster-content">
        <h2>Report a Disaster</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Disaster Title"
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
          <Geolocation onLocationFetched={setLocation} />
          <button type="submit">Submit Report</button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default ReportDisaster;