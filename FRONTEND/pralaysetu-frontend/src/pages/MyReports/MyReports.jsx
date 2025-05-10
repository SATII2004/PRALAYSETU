import React, { useState, useEffect } from "react";
import UserNavbar from "../../components/UserNavbar";
import Footer from "../../components/Footer";
import "./myreports.css";

function MyReports() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      const response = await fetch("http://localhost:8080/api/reports/user", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await response.json();
      setReports(data);
    };
    fetchReports();
  }, []);

  return (
    <div className="my-reports-container">
      <UserNavbar />
      <div className="my-reports-content">
        <h2>My Disaster Reports</h2>
        <div className="reports-list">
          {reports.length > 0 ? (
            reports.map((report) => (
              <div key={report.id} className="report-item">
                <h3>{report.title}</h3>
                <p>Date: {report.date}</p>
                <p>Location: {report.location}</p>
                <p>Description: {report.description}</p>
                <p>Status: {report.status}</p>
              </div>
            ))
          ) : (
            <p>You have not submitted any reports yet.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MyReports;