import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import ReportDisaster from "../pages/ReportDisaster/ReportDisaster";
import RealTimeAlerts from "../pages/RealTimeAlerts/RealTimeAlerts";
import HelpRequest from "../pages/HelpRequest/HelpRequest";
import AdminDashboard from "../pages/Admin Dashboard/AdminDashboard";
import VolunteerDashboard from "../pages/Volunteer Dashboard/VolunteerDashboard";
import UserDashboard from "../pages/User Dashboard/UserDashboard";


const AppRoutes = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/report-disaster" element={<ReportDisaster />} />
        <Route path="/real-time-alerts" element={<RealTimeAlerts />} />
        <Route path="/help-request" element={<HelpRequest />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/volunteer-dashboard" element={<VolunteerDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />


      </Routes>
      <Footer />
    </Router>
  );
};

export default AppRoutes;
