import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import "./signup.css";

const Signup = () => 
  {
  const navigate = useNavigate();
  const [role, setRole] = useState("user");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    location: { lat: 51.505, lng: -0.09 },
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

    const username = `${formData.firstName.toLowerCase()}.${formData.lastName.toLowerCase()}`;
    const registerData = {
      username: username,
      password: formData.password,
      role: role.toUpperCase(),
      address: formData.address,
      latitude: formData.location.lat,
      longitude: formData.location.lng,
      email: formData.email,
    };

    try {
      const response = await axios.post("http://localhost:5000/auth/register", registerData);
      alert(response.data);
      const dashboardRoutes = {
        user: "/user-dashboard",
        volunteer: "/volunteer-dashboard",
        admin: "/admin-dashboard",
      };
      setTimeout(() => navigate(dashboardRoutes[role]), 1000);
    } catch (error) {
      console.error("Signup error:", error);
      alert("Signup failed! Please try again.");
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
      <form className="signup-form" onSubmit={handleSignup}>
        <h2>Join Us Today</h2>
        <div className="name-row">
          <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
          <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
        </div>
        <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
        <input type="text" name="address" placeholder="Address or Click Map" value={formData.address} onChange={handleChange} />
        <div className="map-container">
          <p>📍 Click on the map to set your location</p>
          <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "250px", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <LocationMarker />
          </MapContainer>
        </div>
        <div className="role-selection">
          {["user", "volunteer"].map((r) => (
            <label key={r}>
              <input type="radio" name="role" value={r} checked={role === r} onChange={() => setRole(r)} />
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </label>
          ))}
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;