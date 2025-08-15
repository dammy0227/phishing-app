import axios from "axios";

const API_BASE = "http://localhost:5000/api";

export const checkUrl = async (url) => {
  const res = await axios.post(`${API_BASE}/predict`, { url });
  return res.data;
};
