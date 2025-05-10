import React from "react";
import "../styles/alertcard.css";

const AlertCard = ({ alert }) => {
  return (
    <div className="alert-card">
      <h3>{alert.type}</h3>
      <p>{alert.description}</p>
      <p>Location: ({alert.latitude}, {alert.longitude})</p>
      <p>Time: {new Date(alert.timestamp).toLocaleString()}</p>
    </div>
  );
};

export default AlertCard;