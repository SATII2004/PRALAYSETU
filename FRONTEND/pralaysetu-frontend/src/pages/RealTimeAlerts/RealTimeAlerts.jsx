import React, { useState, useEffect, useMemo } from 'react';
import './realtimealerts.css';

const RealTimeAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [userLocation, setUserLocation] = useState(null);
  const [sosAlert, setSosAlert] = useState(false);
  const [loading, setLoading] = useState(true);

  const APIs = {
    eonet: 'https://eonet.gsfc.nasa.gov/api/v2.1/events',
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(APIs.eonet);
        const data = await response.json();

        const events = data.events.map(event => ({
          id: event.id,
          title: event.title,
          type: event.categories[0]?.title || "Unknown",
          country: event.description?.split(',').pop()?.trim() || "Unknown",
          date: new Date(event.geometries[0]?.date),
          coordinates: event.geometries[0]?.coordinates || [],
          url: event.link,
        }));

        setAlerts(events.sort((a, b) => b.date - a.date));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching EONET data:', error);
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 300000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      setUserLocation({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
    });
  }, []);

  useEffect(() => {
    if (userLocation) {
      const isNearby = alerts.some(alert => {
        if (!alert.coordinates.length) return false;
        const [lon, lat] = alert.coordinates;
        const distance = getDistance(userLocation.lat, userLocation.lon, lat, lon);
        return distance <= 50;
      });
      setSosAlert(isNearby);
    }
  }, [alerts, userLocation]);

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const filteredAlerts = useMemo(() => {
    return alerts.filter(alert => {
      const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType === 'all' || alert.type === selectedType;
      const matchesCountry = selectedCountry === 'all' || alert.country === selectedCountry;
      return matchesSearch && matchesType && matchesCountry;
    });
  }, [alerts, searchTerm, selectedType, selectedCountry]);

  const icons = {
    Earthquake: '🌍', Wildfire: '🔥', Flood: '🌊', Storm: '⛈️', Volcano: '🌋', Unknown: '⚠️'
  };

  if (loading) return <div className="loading">Fetching real-time disaster alerts...</div>;

  return (
    <div className="disaster-alerts">
      {sosAlert && <div className="sos-alert">⚠️ SOS: A disaster is detected within 50km of your location! Stay alert! ⚠️</div>}
      <div className="filters">
        <input type="text" placeholder="Search alerts..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
          <option value="all">All Disasters</option>
          <option value="Earthquake">Earthquakes</option>
          <option value="Wildfire">Wildfires</option>
          <option value="Flood">Floods</option>
          <option value="Storm">Storms</option>
          <option value="Volcano">Volcanic Eruptions</option>
        </select>
        <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
          <option value="all">All Countries</option>
          {[...new Set(alerts.map(a => a.country))].map(country => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
      </div>

      <div className="alert-grid">
        {filteredAlerts.map(alert => (
          <div key={alert.id} className="alert-card">
            <div className="alert-header">
              <span className="alert-icon">{icons[alert.type] || '⚠️'}</span>
              <h3>{alert.title}</h3>
            </div>
            <div className="alert-details">
              <p><strong>Type:</strong> {alert.type}</p>
              <p><strong>Country:</strong> {alert.country}</p>
              <p><strong>Date:</strong> {alert.date.toLocaleString()}</p>
              <a href={alert.url} target="_blank" rel="noopener noreferrer">More Details</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RealTimeAlerts;