import axios from "axios";

// Use your Render backend URL
// const API_BASE = "https://phishing-app-74g2.onrender.com/api";
const API_BASE = "http://localhost:5000/api";


export const checkUrl = async (url) => {
  const res = await axios.post(`${API_BASE}/predict`, { url });
  return res.data;
};

export const checkBatch = async (urls) => {
  const res = await axios.post(`${API_BASE}/batch`, { urls });
  return res.data;
};

export const getRecent = async () => {
  const res = await axios.get(`${API_BASE}/recent`);
  return res.data;
};

export const getStats = async () => {
  const res = await axios.get(`${API_BASE}/stats`);
  return res.data;
};

export const clearRecords = async () => {
  const res = await axios.delete(`${API_BASE}/clear`);
  return res.data;
};