import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import UserNavbar from "../../components/UserNavbar";
import VolunteerNavbar from "../../components/VolunteerNavbar";
import AdminNavbar from "../../components/AdminNavbar";
import Footer from "../../components/Footer";
import DisasterCard from "../../components/DisasterCard";
import "./disasterhistory.css";

function DisasterHistory() {
  const [disasters, setDisasters] = useState([]);
  const role = localStorage.getItem("role");

  useEffect(() => {
    const fetchDisasters = async () => {
      const response = await fetch("http://localhost:8080/api/disasters", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await response.json();
      setDisasters(data);
    };
    fetchDisasters();
  }, []);

  const renderNavbar = () => {
    if (role === "USER") return <UserNavbar />;
    if (role === "VOLUNTEER") return <VolunteerNavbar />;
    if (role === "ADMIN") return <AdminNavbar />;
    return <Navbar />;
  };

  return (
    <div className="disaster-history-container">
      {renderNavbar()}
      <div className="disaster-history-content">
        <h2>Disaster History</h2>
        <div className="disaster-list">
          {disasters.length > 0 ? (
            disasters.map((disaster) => (
              <DisasterCard
                key={disaster.id}
                type={disaster.type}
                date={disaster.date}
                location={disaster.location}
                impact={disaster.impact}
              />
            ))
          ) : (
            <p>No disaster history available.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default DisasterHistory;