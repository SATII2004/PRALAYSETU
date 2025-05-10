import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import UserNavbar from "../../components/UserNavbar";
import VolunteerNavbar from "../../components/VolunteerNavbar";
import AdminNavbar from "../../components/AdminNavbar";
import Footer from "../../components/Footer";
import "./safetytips.css";

import earthquakeIcon from "../../assets/icons/earthquake.png";
import floodIcon from "../../assets/icons/flood.png";
import fireIcon from "../../assets/icons/fire.png";
import cycloneIcon from "../../assets/icons/cyclone.png";
import tornadoIcon from "../../assets/icons/tornado.png";
import tsunamiIcon from "../../assets/icons/tsunami.png";

function SafetyTips() {
  const role = localStorage.getItem("role");
  const [activeIndex, setActiveIndex] = useState(null);

  const renderNavbar = () => {
    if (role === "USER") return <UserNavbar />;
    if (role === "VOLUNTEER") return <VolunteerNavbar />;
    if (role === "ADMIN") return <AdminNavbar />;
    return <Navbar />;
  };

  const safetyTips = [
    {
      title: "Earthquake Safety",
      icon: earthquakeIcon,
      tips: [
        "Drop, cover, and hold on during an earthquake.",
        "Stay away from windows, mirrors, and heavy objects that could fall.",
        "If outdoors, move to an open area away from buildings and power lines.",
        "After the shaking stops, be prepared for aftershocks and check for injuries.",
      ],
    },
    {
      title: "Flood Safety",
      icon: floodIcon,
      tips: [
        "Move to higher ground and avoid walking or driving through floodwaters.",
        "Do not touch electrical equipment if you are wet or standing in water.",
        "If trapped by rising water, go to the highest point of the building.",
        "Listen to emergency alerts and follow evacuation orders.",
      ],
    },
    {
      title: "Fire Safety",
      icon: fireIcon,
      tips: [
        "Evacuate immediately if a fire breaks out; do not try to fight large fires.",
        "Stay low to the ground to avoid smoke inhalation.",
        "Check doors for heat before opening them; use an alternate exit if hot.",
        "Once out, stay out—never go back into a burning building.",
      ],
    },
    {
      title: "Cyclone Safety",
      icon: cycloneIcon,
      tips: [
        "Stay indoors and away from windows during a cyclone.",
        "Secure heavy objects that could be blown away by strong winds.",
        "Have an emergency kit ready with food, water, and medical supplies.",
        "Follow evacuation orders if issued by local authorities.",
      ],
    },
    {
      title: "Tornado Safety",
      icon: tornadoIcon,
      tips: [
        "Go to a basement or an interior room on the lowest floor of a sturdy building.",
        "Avoid windows and protect yourself with sturdy objects like a mattress.",
        "If outside, lie flat in a ditch and cover your head.",
        "Monitor weather alerts for tornado warnings.",
      ],
    },
    {
      title: "Tsunami Safety",
      icon: tsunamiIcon,
      tips: [
        "Move to high ground or inland as quickly as possible after an earthquake.",
        "Avoid coastal areas and river mouths during a tsunami warning.",
        "If you see the ocean receding unusually, evacuate immediately.",
        "Stay tuned to emergency broadcasts for updates.",
      ],
    },
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="safety-tips-container">
      {renderNavbar()}
      <div className="safety-tips-content">
        <div className="safety-tips-header">
          <h2>Safety Tips for Disasters</h2>
          <p>Stay prepared and stay safe with these essential tips for various disasters.</p>
        </div>
        <div className="tips-list">
          {safetyTips.map((tip, index) => (
            <div key={index} className="tip-item">
              <div
                className={`tip-header ${activeIndex === index ? "active" : ""}`}
                onClick={() => toggleAccordion(index)}
              >
                <img src={tip.icon} alt={`${tip.title} icon`} className="tip-icon" />
                <h3>{tip.title}</h3>
                <span className="accordion-icon">{activeIndex === index ? "−" : "+"}</span>
              </div>
              <div className={`tip-content ${activeIndex === index ? "show" : ""}`}>
                <ul>
                  {tip.tips.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SafetyTips;