import React from "react";
import "./home.css"; // Importing the CSS file
import vid from "/src/assets/videos/vid.mp4"; // Correct file path

const Home = () => {
  return (
    <div className="home-container">
      {/* Background Video */}
      <video className="background-video" autoPlay loop>
        <source src={vid} type="video/mp4" />
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

        {/* Welcome Message */}
        <div className="welcome-section">
          <h1>Welcome to <span>PralaySetu</span></h1>
          <p>
            "Bridging Crisis to Safety" - Stay informed, stay prepared, and help
            make a difference in disaster management.
          </p>
          <button className="explore-btn">Explore More</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
