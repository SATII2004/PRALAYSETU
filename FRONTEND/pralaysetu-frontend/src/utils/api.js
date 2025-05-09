import axios from "axios";

const API_BASE_URL = "https://your-backend-api.com"; // Replace with actual backend URL

export const fetchDisasterAlerts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/alerts`);
    return response.data;
  } catch (error) {
    console.error("Error fetching disaster alerts:", error);
    return [];
  }
};

export const reportDisaster = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/report`, data);
    return response.data;
  } catch (error) {
    console.error("Error reporting disaster:", error);
    return null;
  }
};
