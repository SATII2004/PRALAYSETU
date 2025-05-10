import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import AdminNavbar from "../components/AdminNavbar";
import UserNavbar from "../components/UserNavbar";
import VolunteerNavbar from "../components/VolunteerNavbar";
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
import About from "../pages/About/About";
import Services from "../pages/Services/Services";
import Contact from "../pages/Contact/Contact";

const AppRoutes = () => {
  const [userRole, setUserRole] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    setUserRole(role);
  }, []);

  const isPublicPage = () => {
    const publicPaths = ["/", "/login", "/signup", "/about", "/services", "/contact"];
    return publicPaths.includes(location.pathname);
  };

  const renderNavbar = () => {
    if (isPublicPage()) {
      return <Navbar />;
    }
    if (userRole === "admin") {
      return <AdminNavbar />;
    }
    if (userRole === "volunteer") {
      return <VolunteerNavbar />;
    }
    if (userRole === "user") {
      return <UserNavbar />;
    }
    return <Navbar />;
  };

  return (
    <>
      {renderNavbar()}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUserRole={setUserRole} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/report-disaster" element={<ReportDisaster />} />
        <Route path="/real-time-alerts" element={<RealTimeAlerts />} />
        <Route path="/help-request" element={<HelpRequest />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/volunteer-dashboard" element={<VolunteerDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </>
  );
};

const AppRoutesWrapper = () => (
  <Router>
    <AppRoutes />
  </Router>
);

export default AppRoutesWrapper;