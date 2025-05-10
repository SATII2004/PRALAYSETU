import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./signup.css";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    location: { lat: 51.505, lng: -0.09 },
    role: "USER", // Fixed to "USER" as per original requirement
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const userData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
      email: formData.email,
      password: formData.password,
      address: formData.address,
      location: formData.location,
      role: formData.role,
    };

    const response = await fetch("http://localhost:8080/api/auth/register/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      alert("Signup successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1000);
    } else {
      alert("Signup failed!");
    }
  };

  function LocationMarker() {
    useMapEvents({
      click(e) {
        setFormData({
          ...formData,
          location: e.latlng,
          address: `Lat: ${e.latlng.lat}, Lng: ${e.latlng.lng}`,
        });
      },
    });
    return formData.location ? <Marker position={formData.location} /> : null;
  }

  return (
    <div className="signup-container">
      <Navbar />
      <div className="signup-form-container">
        <form className="signup-form" onSubmit={handleSignup}>
          <h2>Join Us Today</h2>
          <div className="name-row">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address or Click Map"
            value={formData.address}
            onChange={handleChange}
          />
          <div className="map-container">
            <p>📍 Click on the map to set your location</p>
            <MapContainer
              center={[51.505, -0.09]}
              zoom={13}
              style={{ height: "250px", width: "100%" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <LocationMarker />
            </MapContainer>
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Signup;