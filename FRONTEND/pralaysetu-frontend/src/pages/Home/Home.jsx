import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "./home.css";
import video from "../../assets/videos/vid.mp4";

function Home() {
  return (
    <div className="home-container">
      <Navbar />
      <div className="home-content">
        {/* Background Video */}
        <video autoPlay loop  className="background-video">
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay Content */}
        <div className="overlay">
          {/* Scrolling News Ticker */}
          <div className="news-ticker">
            <p>
              🔴 Cyclone Alert in Coastal Areas | 🔥 Wildfire in California | 🌊
              Heavy Flooding in Mumbai | 🏔️ Earthquake in Japan | 🌀 Tornado
              Warning in Texas | 🚨 Stay Safe, Stay Informed!
            </p>
          </div>

          {/* Welcome Section */}
          <div className="hero-text">
            <h1>
              Welcome to <span>PralaySetu</span>
            </h1>
            <p>
              "Bridging Crisis to Safety" – Stay informed, stay prepared, and
              help make a difference in disaster management.
            </p>
            <div className="button-group">
              <a href="/signup" className="cta-button">
                Get Started
              </a>
              <a href="/real-time-alerts" className="explore-btn">
                Explore More
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;