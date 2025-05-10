import React from "react";
import Navbar from "../../components/Navbar";
import UserNavbar from "../../components/UserNavbar";
import VolunteerNavbar from "../../components/VolunteerNavbar";
import AdminNavbar from "../../components/AdminNavbar";
import Footer from "../../components/Footer";
import "./disasterhistory.css";

import earthquakeIcon from "../../assets/icons/earthquake.png";
import tsunamiIcon from "../../assets/icons/tsunami.png";
import floodIcon from "../../assets/icons/flood.png";
import cycloneIcon from "../../assets/icons/cyclone.png";
import landslideIcon from "../../assets/icons/landslide.png";

function DisasterHistory() {
  const role = localStorage.getItem("role");

  const renderNavbar = () => {
    if (role === "USER") return <UserNavbar />;
    if (role === "VOLUNTEER") return <VolunteerNavbar />;
    if (role === "ADMIN") return <AdminNavbar />;
    return <Navbar />;
  };

  const disasters = [
    {
      year: "2024",
      title: "Himachal Pradesh Hydro-Meteorological Disasters",
      type: "Flood/Landslide",
      icon: floodIcon,
      description: "Himachal Pradesh faced severe hydro-meteorological disasters in 2024, including floods and landslides, leading to the highest casualties in India that year.",
      impact: "408 deaths reported, significant damage to infrastructure and homes."
    },
    {
      year: "2024",
      title: "Kerala Hydro-Meteorological Disasters",
      type: "Flood/Landslide",
      icon: floodIcon,
      description: "Kerala experienced devastating hydro-meteorological disasters in 2024, with heavy rainfall causing widespread flooding and landslides.",
      impact: "355 deaths, thousands displaced, and extensive property damage."
    },
    {
      year: "2023",
      title: "Sikkim Glacial Lake Outburst Flood",
      type: "Flood",
      icon: floodIcon,
      description: "A glacial lake outburst in Sikkim in October 2023 led to the collapse of a hydroelectric dam, causing massive flooding.",
      impact: "Over 100 deaths, 88,000 displaced, major infrastructure damage."
    },
    {
      year: "2023",
      title: "Assam Floods",
      type: "Flood",
      icon: floodIcon,
      description: "Heavy monsoon rains in June 2023 caused widespread flooding across 20 districts in Assam, displacing thousands.",
      impact: "91,000 displaced, significant agricultural losses."
    },
    {
      year: "2023",
      title: "Cyclone Biparjoy (Gujarat and Rajasthan)",
      type: "Cyclone",
      icon: cycloneIcon,
      description: "Cyclone Biparjoy struck in June 2023, causing widespread flooding in Gujarat and Rajasthan.",
      impact: "105,000 displaced, extensive damage to crops and homes."
    },
    {
      year: "2013",
      title: "Uttarakhand Flash Floods",
      type: "Flood/Landslide",
      icon: floodIcon,
      description: "Heavy rainfall and cloudbursts in June 2013 caused flash floods and landslides in Uttarakhand, trapping over 100,000 pilgrims near Kedarnath.",
      impact: "5,700 deaths, thousands missing, massive destruction."
    },
    {
      year: "2004",
      title: "Indian Ocean Tsunami",
      type: "Tsunami",
      icon: tsunamiIcon,
      description: "A massive tsunami triggered by an undersea earthquake hit southern India and the Andaman Nicobar Islands in December 2004.",
      impact: "Over 12,000 deaths in India, widespread destruction in coastal areas."
    },
    {
      year: "2001",
      title: "Gujarat Earthquake",
      type: "Earthquake",
      icon: earthquakeIcon,
      description: "A 7.6-7.9 magnitude earthquake struck Gujarat on January 26, 2001, during Republic Day celebrations.",
      impact: "Around 20,000 deaths, 167,000 injured, 400,000 homeless."
    },
    {
      year: "1999",
      title: "Odisha Super Cyclone",
      type: "Cyclone",
      icon: cycloneIcon,
      description: "The 1999 Odisha Super Cyclone, one of the deadliest in the Indian Ocean, struck Odisha with wind speeds of 260 km/h.",
      impact: "Over 10,000 deaths, 1.67 million homeless, 275,000 houses destroyed."
    }
  ];

  return (
    <div className="disaster-history-container">
      {renderNavbar()}
      <div className="disaster-history-content">
        <div className="disaster-history-header">
          <h2>Disaster History of India</h2>
          <p>A timeline of major natural disasters that have shaped India's history, highlighting the resilience of its people.</p>
        </div>
        <div className="timeline">
          {disasters.map((disaster, index) => (
            <div key={index} className={`timeline-item ${index % 2 === 0 ? "left" : "right"}`}>
              <div className="timeline-content">
                <div className="disaster-icon-wrapper">
                  <img src={disaster.icon} alt={`${disaster.type} icon`} className="disaster-icon" />
                </div>
                <h3>{disaster.year} - {disaster.title}</h3>
                <p className="disaster-type">{disaster.type}</p>
                <p className="disaster-description">{disaster.description}</p>
                <p className="disaster-impact"><strong>Impact:</strong> {disaster.impact}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default DisasterHistory;