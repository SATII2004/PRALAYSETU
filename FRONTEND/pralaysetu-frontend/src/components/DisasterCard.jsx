import React from "react";
import "../styles/disastercard.css";

function DisasterCard({ type, date, location, impact }) {
  return (
    <div className="disaster-card">
      <h3>{type}</h3>
      <p>Date: {date}</p>
      <p>Location: {location}</p>
      <p>Impact: {impact}</p>
    </div>
  );
}

export default DisasterCard;