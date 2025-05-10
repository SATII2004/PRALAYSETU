import React, { useState, useEffect } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import Footer from "../../components/Footer";
import "./resourceallocation.css";

function ResourceAllocation() {
  const [resources, setResources] = useState([]);
  const [newResource, setNewResource] = useState({ type: "", quantity: "", location: "" });

  useEffect(() => {
    const fetchResources = async () => {
      const response = await fetch("http://localhost:8080/api/resources", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await response.json();
      setResources(data);
    };
    fetchResources();
  }, []);

  const handleAddResource = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8080/api/resources", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(newResource),
    });
    if (response.ok) {
      setResources([...resources, newResource]);
      setNewResource({ type: "", quantity: "", location: "" });
    } else {
      alert("Failed to add resource!");
    }
  };

  return (
    <div className="resource-allocation-container">
      <AdminNavbar />
      <div className="resource-allocation-content">
        <h2>Resource Allocation</h2>
        <div className="add-resource-form">
          <h3>Add Resource</h3>
          <form onSubmit={handleAddResource}>
            <input
              type="text"
              placeholder="Resource Type"
              value={newResource.type}
              onChange={(e) => setNewResource({ ...newResource, type: e.target.value })}
              required />
            <input
              type="number"
              placeholder="Quantity"
              value={newResource.quantity}
              onChange={(e) => setNewResource({ ...newResource, quantity: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Location"
              value={newResource.location}
              onChange={(e) => setNewResource({ ...newResource, location: e.target.value })}
              required
            />
            <button type="submit">Add Resource</button>
          </form>
        </div>
        <div className="resources-list">
          <h3>Allocated Resources</h3>
          {resources.length > 0 ? (
            resources.map((resource, index) => (
              <div key={index} className="resource-item">
                <h3>{resource.type}</h3>
                <p>Quantity: {resource.quantity}</p>
                <p>Location: {resource.location}</p>
              </div>
            ))
          ) : (
            <p>No resources allocated yet.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ResourceAllocation;