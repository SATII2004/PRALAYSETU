import { useState, useEffect } from "react";

const Geolocation = ({ onLocationUpdate }) => {
  const [location, setLocation] = useState({ lat: null, lng: null });

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setLocation(newLocation);
          if (onLocationUpdate) onLocationUpdate(newLocation);
        },
        (error) => console.error("Geolocation error:", error),
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div>
      <p>
        <strong>Your Location:</strong>{" "}
        {location.lat && location.lng
          ? `${location.lat}, ${location.lng}`
          : "Fetching..."}
      </p>
    </div>
  );
};

export default Geolocation;
