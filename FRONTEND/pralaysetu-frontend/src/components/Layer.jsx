import React from "react";

const Layer = ({ alerts }) => {
  return (
    <div className="layer-container">
      <h3>Live Disaster Alerts</h3>
      <ul>
        {alerts.length > 0 ? (
          alerts.map((alert, index) => (
            <li key={index} className="alert-item">
              <strong>{alert.type}</strong> - {alert.location} ({alert.time})
            </li>
          ))
        ) : (
          <p>No active alerts</p>
        )}
      </ul>
    </div>
  );
};

export default Layer;
