// src/api/client.js
import axios from "axios";

export const API_BASE_URL = "https://food-vender-locator.onrender.com/auth";

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Add interceptor to inject token in headers
client.interceptors.request.use((config) => {
  if (!config.url.includes("/register") && !config.url.includes("/login")) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
}
  return config;
});

export default client;
