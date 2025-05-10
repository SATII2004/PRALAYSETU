import React, { useState, useEffect } from "react";
import UserNavbar from "../../components/UserNavbar";
import Footer from "../../components/Footer";
import "./myhelprequests.css";

function MyHelpRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const response = await fetch("http://localhost:8080/api/help-requests/user", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await response.json();
      setRequests(data);
    };
    fetchRequests();
  }, []);

  return (
    <div className="my-help-requests-container">
      <UserNavbar />
      <div className="my-help-requests-content">
        <h2>My Help Requests</h2>
        <div className="requests-list">
          {requests.length > 0 ? (
            requests.map((request) => (
              <div key={request.id} className="request-item">
                <h3>{request.title}</h3>
                <p>Date: {request.date}</p>
                <p>Description: {request.description}</p>
                <p>Status: {request.status}</p>
              </div>
            ))
          ) : (
            <p>You have not submitted any help requests yet.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MyHelpRequests;