// src/api/client.js
import axios from "axios";
import { getToken, removeToken } from "../utils/tokenUtils";

export const API_BASE_URL = "https://foodvendor.onrender.com/api"; 

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Attach token to every request
client.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Optional: Global 401 handling
client.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      removeToken(); // force logout locally
      // Let caller decide what to do (context will react)
    }
    return Promise.reject(err);
  }
);

export default client;
