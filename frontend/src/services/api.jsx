import axios from "axios";

// Use your Render backend URL
const API_BASE = "https://phishing-app-74g2.onrender.com/api";

export const checkUrl = async (url) => {
  try {
    const res = await axios.post(`${API_BASE}/predict`, { url });
    return res.data;
  } catch (error) {
    console.error("Error checking URL:", error);
    return null;
  }
};
