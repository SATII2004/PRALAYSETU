import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import UserDashboard from "../pages/User Dashboard/UserDashboard";
import VolunteerDashboard from "../pages/Volunteer Dashboard/VolunteerDashboard";
import AdminDashboard from "../pages/Admin Dashboard/AdminDashboard";
import ManageUsers from "../pages/ManageUsers/ManageUsers";
import ReportDisaster from "../pages/ReportDisaster/ReportDisaster";
import RealTimeAlerts from "../pages/RealTimeAlerts/RealTimeAlerts";
import HelpRequest from "../pages/HelpRequest/HelpRequest";
import SafetyTips from "../pages/SafetyTips/SafetyTips";
import EmergencyContacts from "../pages/EmergencyContacts/EmergencyContacts";
import DisasterHistory from "../pages/DisasterHistory/DisasterHistory";
import MyReports from "../pages/MyReports/MyReports";
import MyHelpRequests from "../pages/MyHelpRequests/MyHelpRequests";
import AssignedTasks from "../pages/AssignedTasks/AssignedTasks";
import VolunteerResources from "../pages/VolunteerResources/VolunteerResources";
import ResourceAllocation from "../pages/ResourceAllocation/ResourceAllocation";
import VolunteerManagement from "../pages/VolunteerManagement/VolunteerManagement";
import AnalyticsDashboard from "../pages/AnalyticsDashboard/AnalyticsDashboard";

function ProtectedRoute({ children, allowedRole }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token || (allowedRole && role !== allowedRole)) {
    return <Navigate to="/login" />;
  }
  return children;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/safety-tips" element={<SafetyTips />} />
      <Route path="/emergency-contacts" element={<EmergencyContacts />} />
      <Route path="/disaster-history" element={<DisasterHistory />} />
      <Route
        path="/user-dashboard"
        element={
          <ProtectedRoute allowedRole="USER">
            <UserDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/volunteer-dashboard"
        element={
          <ProtectedRoute allowedRole="VOLUNTEER">
            <VolunteerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute allowedRole="ADMIN">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/manage-users"
        element={
          <ProtectedRoute allowedRole="ADMIN">
            <ManageUsers />
          </ProtectedRoute>
        }
      />
      <Route
        path="/resource-allocation"
        element={
          <ProtectedRoute allowedRole="ADMIN">
            <ResourceAllocation />
          </ProtectedRoute>
        }
      />
      <Route
        path="/volunteer-management"
        element={
          <ProtectedRoute allowedRole="ADMIN">
            <VolunteerManagement />
          </ProtectedRoute>
        }
      />
      <Route
        path="/analytics-dashboard"
        element={
          <ProtectedRoute allowedRole="ADMIN">
            <AnalyticsDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/report-disaster"
        element={
          <ProtectedRoute allowedRole="USER">
            <ReportDisaster />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-reports"
        element={
          <ProtectedRoute allowedRole="USER">
            <MyReports />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-help-requests"
        element={
          <ProtectedRoute allowedRole="USER">
            <MyHelpRequests />
          </ProtectedRoute>
        }
      />
      <Route
        path="/assigned-tasks"
        element={
          <ProtectedRoute allowedRole="VOLUNTEER">
            <AssignedTasks />
          </ProtectedRoute>
        }
      />
      <Route
        path="/volunteer-resources"
        element={
          <ProtectedRoute allowedRole="VOLUNTEER">
            <VolunteerResources />
          </ProtectedRoute>
        }
      />
      <Route
        path="/real-time-alerts"
        element={<ProtectedRoute><RealTimeAlerts /></ProtectedRoute>}
      />
      <Route
        path="/help-request"
        element={<ProtectedRoute><HelpRequest /></ProtectedRoute>}
      />
    </Routes>
  );
}

export default AppRoutes;