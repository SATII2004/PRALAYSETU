import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./reportdisaster.css";

const ReportDisaster = () => {
  const [formData, setFormData] = useState({
    disasterType: "",
    location: "",
    description: "",
    latitude: null,
    longitude: null,
    images: [],
  });

  const [imagePreviews, setImagePreviews] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      alert("You can upload a maximum of 5 images.");
      return;
    }

    setFormData({ ...formData, images: files });

    // Generate preview URLs
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Disaster Reported:", formData);
    alert("Disaster report submitted successfully!");

    // TODO: Convert to FormData and send to backend if needed
  };

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setFormData((prevData) => ({
          ...prevData,
          latitude: e.latlng.lat,
          longitude: e.latlng.lng,
          location: `Lat: ${e.latlng.lat}, Lng: ${e.latlng.lng}`,
        }));
      },
    });

    return formData.latitude && formData.longitude ? (
      <Marker position={[formData.latitude, formData.longitude]} />
    ) : null;
  };

  return (
    <div className="report-disaster-container">
      <h2>Report a Disaster</h2>
      <form onSubmit={handleSubmit} className="report-form">
        <label>Disaster Type:</label>
        <select name="disasterType" value={formData.disasterType} onChange={handleChange} required>
          <option value="">Select Disaster</option>
          <option value="Earthquake">Earthquake</option>
          <option value="Flood">Flood</option>
          <option value="Wildfire">Wildfire</option>
          <option value="Cyclone">Cyclone</option>
          <option value="Landslide">Landslide</option>
        </select>

        <label>Location:</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Type address or click on the map"
        />

        <div className="map-container">
          <MapContainer center={[20, 78]} zoom={4} style={{ height: "100%", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <LocationMarker />
          </MapContainer>
        </div>

        <label>Description:</label>
        <textarea name="description" value={formData.description} onChange={handleChange} required></textarea>

        <label>Upload Images (max 5):</label>
        <input
          type="file"
          name="images"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
        />
        <div className="image-preview-container">
          {imagePreviews.map((src, index) => (
            <img key={index} src={src} alt={`Preview ${index + 1}`} className="preview-image" />
          ))}
        </div>

        <button type="submit" className="submit-btn">Submit Report</button>
      </form>
    </div>
  );
};

export default ReportDisaster;
