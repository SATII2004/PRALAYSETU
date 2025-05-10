import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";
import "./realtimealerts.css";

// Fix Leaflet default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const RealTimeAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [filteredAlerts, setFilteredAlerts] = useState([]);
  const [filterType, setFilterType] = useState("All");
  const [userLocation, setUserLocation] = useState(null);
  const [nearbyDisaster, setNearbyDisaster] = useState(null);
  const [role, setRole] = useState("user");
  const [locationPrompt, setLocationPrompt] = useState(true);

  // Haversine formula to calculate distance between two coordinates (in km)
  const haversineDistance = (coords1, coords2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Earth's radius in km
    const dLat = toRad(coords2.lat - coords1.lat);
    const dLng = toRad(coords2.lng - coords1.lng);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(coords1.lat)) * Math.cos(toRad(coords2.lat)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Fetch real-time disaster data from USGS Earthquake API
  const fetchDisasterData = async () => {
    try {
      const response = await axios.get("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson");
      const earthquakeData = response.data.features.map((feature) => {
        const [longitude, latitude] = feature.geometry.coordinates;
        const magnitude = feature.properties.mag;
        let severity;
        if (magnitude >= 6) severity = "Critical";
        else if (magnitude >= 4) severity = "High";
        else if (magnitude >= 2) severity = "Moderate";
        else severity = "Low";

        return {
          type: "Earthquake",
          location: feature.properties.place,
          timestamp: new Date(feature.properties.time).toISOString(),
          severity: severity,
          description: `Magnitude ${magnitude} earthquake detected.`,
          latitude: latitude,
          longitude: longitude,
        };
      });
      setAlerts(earthquakeData);

      // Filter alerts within 100 km of user location
      if (userLocation) {
        const nearbyAlerts = earthquakeData.filter((alert) => {
          const distance = haversineDistance(userLocation, {
            lat: alert.latitude,
            lng: alert.longitude,
          });
          return distance <= 100; // Within 100 km
        });

        // Apply type filter after distance filter
        const finalAlerts = filterType === "All" ? nearbyAlerts : nearbyAlerts.filter(alert => alert.type === filterType);
        setFilteredAlerts(finalAlerts);

        // Check for nearby disaster for SOS
        nearbyAlerts.forEach((alert) => {
          const distance = haversineDistance(userLocation, {
            lat: alert.latitude,
            lng: alert.longitude,
          });
          if (distance <= 100) {
            setNearbyDisaster(alert);
            if (Notification.permission === "granted") {
              new Notification(`${role.charAt(0).toUpperCase() + role.slice(1)}: Disaster Nearby!`, {
                body: `A ${alert.type} has occurred in ${alert.location}. ${alert.description}`,
              });
            }
          }
        });
      }
    } catch (err) {
      console.error("Failed to fetch real-time disaster data:", err);
    }
  };

  useEffect(() => {
    // Determine role based on route
    const path = window.location.hash;
    if (path.includes("/volunteer")) {
      setRole("volunteer");
    } else {
      setRole("user");
    }

    // Request notification permission
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }

    // Request user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLoc = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(userLoc);
          setLocationPrompt(false);

          // Fetch disaster data after getting location
          fetchDisasterData();
          const interval = setInterval(fetchDisasterData, 5 * 60 * 1000); // 5 minutes
          return () => clearInterval(interval); // Clean up interval on unmount
        },
        () => {
          console.warn("Location permission denied");
          setLocationPrompt(true);
        }
      );
    } else {
      console.warn("Geolocation not supported");
      setLocationPrompt(true);
    }
  }, []);

  useEffect(() => {
    // Reapply type filter when filterType changes
    if (userLocation && alerts.length > 0) {
      const nearbyAlerts = alerts.filter((alert) => {
        const distance = haversineDistance(userLocation, {
          lat: alert.latitude,
          lng: alert.longitude,
        });
        return distance <= 100;
      });
      const finalAlerts = filterType === "All" ? nearbyAlerts : nearbyAlerts.filter(alert => alert.type === filterType);
      setFilteredAlerts(finalAlerts);
    }
  }, [filterType, alerts, userLocation]);

  const handleRequestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLoc = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(userLoc);
          setLocationPrompt(false);

          // Fetch disaster data after getting location
          fetchDisasterData();
          const interval = setInterval(fetchDisasterData, 5 * 60 * 1000); // 5 minutes
          return () => clearInterval(interval);
        },
        () => {
          console.warn("Location permission denied again");
        }
      );
    }
  };

  const getMarkerColor = (type) => {
    const colorMap = {
      Earthquake: "#dc2626",
      Flood: "#1e3a8a",
      Cyclone: "#16a34a",
      Wildfire: "#f97316",
      Landslide: "#6b7280",
    };
    return colorMap[type] || "#9ca3af";
  };

  return (
    <div className="alerts-container">
      <h2>Real-Time Disaster Alerts</h2>

      {locationPrompt ? (
        <div className="location-prompt">
          <p>We need your location to show nearby disaster alerts (within 100 km).</p>
          <button onClick={handleRequestLocation}>Allow Location Access</button>
        </div>
      ) : (
        <>
          {nearbyDisaster && (
            <div className="sos-banner">
              <strong>SOS Alert:</strong> {nearbyDisaster.type} in {nearbyDisaster.location}! {nearbyDisaster.description}
            </div>
          )}

          <div className="filter-bar">
            <label>Filter by Type:</label>
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
              <option value="All">All</option>
              <option value="Earthquake">Earthquake</option>
              <option value="Flood">Flood</option>
              <option value="Cyclone">Cyclone</option>
              <option value="Wildfire">Wildfire</option>
              <option value="Landslide">Landslide</option>
            </select>
          </div>

          <div className="alerts-list">
            {filteredAlerts.length === 0 ? (
              <p>No nearby alerts within 100 km.</p>
            ) : (
              filteredAlerts.map((alert, index) => (
                <div key={index} className={`alert-card ${alert.severity.toLowerCase()}`}>
                  <h3>{alert.type}</h3>
                  <p><strong>Location:</strong> {alert.location}</p>
                  <p><strong>Time:</strong> {new Date(alert.timestamp).toLocaleString()}</p>
                  <p><strong>Severity:</strong> {alert.severity}</p>
                  <p>{alert.description}</p>
                </div>
              ))
            )}
          </div>

          <div className="map-section">
            {typeof window !== "undefined" && (
              <MapContainer center={userLocation || [20, 78]} zoom={5} className="alerts-map">
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {filteredAlerts.map((alert, index) => (
                  <Marker
                    key={index}
                    position={[alert.latitude, alert.longitude]}
                    icon={L.divIcon({
                      className: "custom-icon",
                      html: `<div style='background-color:${getMarkerColor(alert.type)}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white;'></div>`,
                    })}
                  >
                    <Popup>
                      <strong>{alert.type}</strong><br />
                      {alert.description}<br />
                      <em>{alert.location}</em><br />
                      {new Date(alert.timestamp).toLocaleString()}
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default RealTimeAlerts;