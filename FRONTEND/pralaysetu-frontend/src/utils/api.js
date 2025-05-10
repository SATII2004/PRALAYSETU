const API_BASE_URL = "http://localhost:8080/api";

const apiRequest = async (endpoint, method = "GET", body = null, token = null) => {
  const headers = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    method,
    headers,
  };
  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "API request failed");
    }
    return data;
  } catch (error) {
    throw error;
  }
};

// Authentication
export const login = (email, password) =>
  apiRequest("/auth/login", "POST", { email, password });

export const registerUser = (email, password) =>
  apiRequest("/auth/register/user", "POST", { email, password, role: "USER" });

export const registerVolunteer = (email, password, token) =>
  apiRequest("/auth/register/volunteer", "POST", { email, password, role: "VOLUNTEER" }, token);

// Users
export const getUsers = (token) => apiRequest("/users", "GET", null, token);

export const deleteUser = (email, token) =>
  apiRequest(`/users/${email}`, "DELETE", null, token);

export const getVolunteers = (token) => apiRequest("/users/volunteers", "GET", null, token);

// Disasters
export const getDisasters = (token) => apiRequest("/disasters", "GET", null, token);

// Reports
export const getUserReports = (token) => apiRequest("/reports/user", "GET", null, token);

export const createReport = (report, token) =>
  apiRequest("/reports", "POST", report, token);

// Help Requests
export const getUserHelpRequests = (token) =>
  apiRequest("/help-requests/user", "GET", null, token);

export const createHelpRequest = (request, token) =>
  apiRequest("/help-requests", "POST", request, token);

// Alerts
export const getAlerts = (token) => apiRequest("/alerts", "GET", null, token);

// Tasks
export const getVolunteerTasks = (token) =>
  apiRequest("/tasks/volunteer", "GET", null, token);

export const getAllTasks = (token) => apiRequest("/tasks", "GET", null, token);

export const assignTask = (task, token) => apiRequest("/tasks", "POST", task, token);

// Resources
export const getResources = (token) => apiRequest("/resources", "GET", null, token);

export const allocateResource = (resource, token) =>
  apiRequest("/resources", "POST", resource, token);

// Analytics
export const getAnalytics = (token) => apiRequest("/analytics", "GET", null, token);