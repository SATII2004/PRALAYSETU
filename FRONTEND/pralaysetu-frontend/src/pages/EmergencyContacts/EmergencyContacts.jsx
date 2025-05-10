import React from "react";
import Navbar from "../../components/Navbar";
import UserNavbar from "../../components/UserNavbar";
import VolunteerNavbar from "../../components/VolunteerNavbar";
import AdminNavbar from "../../components/AdminNavbar";
import Footer from "../../components/Footer";
import "./emergencycontacts.css";

// Importing icons for emergency contacts
import policeIcon from "../../assets/icons/police.png";
import ambulanceIcon from "../../assets/icons/ambulance.png";
import fireBrigadeIcon from "../../assets/icons/fire-brigade.png";
import emergencyIcon from "../../assets/icons/emergency.png";
import disasterIcon from "../../assets/icons/disaster.png";
import hospitalIcon from "../../assets/icons/hospital.png";

function EmergencyContacts() {
  const role = localStorage.getItem("role");

  const renderNavbar = () => {
    if (role === "USER") return <UserNavbar />;
    if (role === "VOLUNTEER") return <VolunteerNavbar />;
    if (role === "ADMIN") return <AdminNavbar />;
    return <Navbar />;
  };

  const emergencyContacts = [
    {
      category: "General Disaster Emergencies",
      contacts: [
        { name: "All-in-One Emergency Helpline", number: "112", icon: emergencyIcon },
        { name: "Police", number: "100", icon: policeIcon },
        { name: "Fire Brigade", number: "101", icon: fireBrigadeIcon },
        { name: "Ambulance", number: "102", icon: ambulanceIcon },
        { name: "Emergency Response (Some States)", number: "108", icon: emergencyIcon },
      ],
    },
    {
      category: "Disaster Management",
      contacts: [
        { name: "National Disaster Response Force (NDRF)", number: "+91-9711077372", icon: disasterIcon },
        { name: "Disaster Management Helpline", number: "1078", icon: disasterIcon },
      ],
    },
    {
      category: "Medical and Hospital Services",
      contacts: [
        { name: "National Health Helpline", number: "1800-180-1104", icon: hospitalIcon },
        { name: "AIIMS Delhi Helpline", number: "+91-11-26588500", icon: hospitalIcon },
      ],
    },
  ];

  return (
    <div className="emergency-contacts-container">
      {renderNavbar()}
      <div className="emergency-contacts-content">
        <div className="emergency-contacts-header">
          <h2>Disaster Emergency Contacts in India</h2>
          <p>Reach out to these services for immediate assistance during disasters.</p>
        </div>
        <div className="contacts-list">
          {emergencyContacts.map((category, index) => (
            <div key={index} className="contact-category">
              <h3 className="category-title">{category.category}</h3>
              <div className="contact-items">
                {category.contacts.map((contact, idx) => (
                  <div key={idx} className="contact-item">
                    <img src={contact.icon} alt={`${contact.name} icon`} className="contact-icon" />
                    <div className="contact-info">
                      <h4>{contact.name}</h4>
                      <p>{contact.number}</p>
                      <a href={`tel:${contact.number}`} className="call-button">Call Now</a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default EmergencyContacts;