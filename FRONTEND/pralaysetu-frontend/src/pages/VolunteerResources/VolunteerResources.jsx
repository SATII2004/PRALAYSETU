import React from "react";
import VolunteerNavbar from "../../components/VolunteerNavbar";
import Footer from "../../components/Footer";
import "./volunteerresources.css";

function VolunteerResources() {
  return (
    <div className="volunteer-resources-container">
      <VolunteerNavbar />
      <div className="volunteer-resources-content">
        <h2>Volunteer Resources</h2>
        <div className="resources-list">
          <div className="resource-item">
            <h3>First Aid Kit</h3>
            <p>Available at the local disaster relief center.</p>
          </div>
          <div className="resource-item">
            <h3>Training Manual</h3>
            <p>Download the volunteer training manual for disaster response.</p>
          </div>
          <div className="resource-item">
            <h3>Communication Devices</h3>
            <p>Radios available for coordination during operations.</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default VolunteerResources;