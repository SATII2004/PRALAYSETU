import React, { useState } from "react";
import "./helprequest.css";

const HelpRequest = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    location: "",
    priority: "Moderate",
    message: "",
  });
  
  const [isEmergency, setIsEmergency] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Help Request Submitted:", formData);
    alert("Your help request has been submitted.");
  };
  
  return (
    <div className="help-request-container">
      <h2>Request Help</h2>
      <form onSubmit={handleSubmit} className="help-form">
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label>Contact Number:</label>
        <input type="text" name="contact" value={formData.contact} onChange={handleChange} required />

        <label>Location:</label>
        <input type="text" name="location" value={formData.location} onChange={handleChange} required />
        
        <label>Priority Level:</label>
        <select name="priority" value={formData.priority} onChange={handleChange}>
          <option value="Critical">Critical</option>
          <option value="Moderate">Moderate</option>
          <option value="Low">Low</option>
        </select>
        
        <label>Message:</label>
        <textarea name="message" value={formData.message} onChange={handleChange} required></textarea>
        
        <button type="submit" className="submit-btn">Submit Request</button>
        
        <div className="emergency-section">
          <p>Need immediate help?</p>
          <button type="button" className="emergency-btn" onClick={() => setIsEmergency(true)}>
            Activate Emergency Mode
          </button>
        </div>
      </form>
    </div>
  );
};

export default HelpRequest;