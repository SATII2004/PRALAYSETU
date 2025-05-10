import React from "react";
import "./home.css"; 
import vid from "/src/assets/videos/vid.mp4"; 

const Home = () => {
  return (
    <div className="home-container">
      <video className="background-video" autoPlay loop>
        <source src={vid} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="overlay">
        <div className="news-ticker">
          <p>
            🔴 Cyclone Alert in Coastal Areas | 🔥 Wildfire in California | 🌊
            Heavy Flooding in Mumbai | 🏔️ Earthquake in Japan | 🌀 Tornado
            Warning in Texas | 🚨 Stay Safe, Stay Informed!
          </p>
        </div>

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
