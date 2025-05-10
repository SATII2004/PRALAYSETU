import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import "./helprequest.css";

const HelpRequest = () => {
  const [sosData, setSosData] = useState({
    message: "",
    location: { lat: 51.505, lng: -0.09 },
  });
  const [username, setUsername] = useState("");
  const authHeader = localStorage.getItem("authHeader");

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      setUsername(email.split("@")[0]);
    }
  }, []);

  const handleChange = (e) => {
    setSosData({ ...sosData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sosRequest = {
      username,
      message: sosData.message,
      latitude: sosData.location.lat,
      longitude: sosData.location.lng,
    };
    try {
      const response = await axios.post("http://localhost:5000/user/sos", sosRequest, {
        headers: {
          Authorization: authHeader,
        },
      });
      alert(response.data);
    } catch (error) {
      console.error("Error sending SOS:", error);
      alert("Failed to send SOS. Please log in again.");
    }
  };

  function LocationMarker() {
    useMapEvents({
      click(e) {
        setSosData({
          ...sosData,
          location: e.latlng,
        });
      },
    });
    return sosData.location ? <Marker position={sosData.location} /> : null;
  }

  return (
    <div className="help-request-container">
      <form className="help-request-form" onSubmit={handleSubmit}>
        <h2>Request Help</h2>
        <textarea
          name="message"
          placeholder="Describe your emergency..."
          value={sosData.message}
          onChange={handleChange}
          required
        />
        <div className="map-container">
          <p>📍 Click on the map to set your location</p>
          <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "250px", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <LocationMarker />
          </MapContainer>
        </div>
        <button type="submit">Send SOS</button>
      </form>
    </div>
  );
};

export default HelpRequest;