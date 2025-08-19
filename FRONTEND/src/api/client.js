// src/api/client.js
import axios from "axios";

export const API_BASE_URL = "https://food-vender-locator.onrender.com/api";

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export default client;
