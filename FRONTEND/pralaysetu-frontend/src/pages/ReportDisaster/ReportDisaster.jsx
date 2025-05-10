import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import "./reportdisaster.css";

const ReportDisaster = () => {
  const [disasterData, setDisasterData] = useState({
    type: "",
    description: "",
    location: { lat: 51.505, lng: -0.09 },
  });
  const authHeader = localStorage.getItem("authHeader");

  const handleChange = (e) => {
    setDisasterData({ ...disasterData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reportData = {
      type: disasterData.type,
      description: disasterData.description,
      latitude: disasterData.location.lat,
      longitude: disasterData.location.lng,
    };
    try {
      const response = await axios.post("http://localhost:5000/user/report-disaster", reportData, {
        headers: {
          Authorization: authHeader,
        },
      });
      alert(response.data);
    } catch (error) {
      console.error("Error reporting disaster:", error);
      alert("Failed to report disaster. Please log in again.");
    }
  };

  function LocationMarker() {
    useMapEvents({
      click(e) {
        setDisasterData({
          ...disasterData,
          location: e.latlng,
        });
      },
    });
    return disasterData.location ? <Marker position={disasterData.location} /> : null;
  }

  return (
    <div className="report-disaster-container">
      <form className="report-disaster-form" onSubmit={handleSubmit}>
        <h2>Report a Disaster</h2>
        <input
          type="text"
          name="type"
          placeholder="Disaster Type (e.g., Flood, Earthquake)"
          value={disasterData.type}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={disasterData.description}
          onChange={handleChange}
          required
        />
        <div className="map-container">
          <p>📍 Click on the map to set the disaster location</p>
          <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "250px", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <LocationMarker />
          </MapContainer>
        </div>
        <button type="submit">Report Disaster</button>
      </form>
    </div>
  );
};

export default ReportDisaster;