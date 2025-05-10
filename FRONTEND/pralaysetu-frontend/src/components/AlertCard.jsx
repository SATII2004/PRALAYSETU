import React from "react";
import "../styles/alertcard.css";

function AlertCard({ title, description, date }) {
  return (
    <div className="alert-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <p className="alert-date">Date: {date}</p>
    </div>
  );
}

export default AlertCard;