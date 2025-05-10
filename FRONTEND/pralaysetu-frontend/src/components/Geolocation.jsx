import React, { useState, useEffect } from "react";

function Geolocation({ onLocationFetched }) {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          if (onLocationFetched) {
            onLocationFetched({ latitude, longitude });
          }
        },
        (error) => {
          console.error("Error fetching location:", error);
        }
      );
    }
  }, [onLocationFetched]);

  return (
    <div>
      {location ? (
        <p>
          Location: {location.latitude}, {location.longitude}
        </p>
      ) : (
        <p>Fetching location...</p>
      )}
    </div>
  );
}

export default Geolocation;