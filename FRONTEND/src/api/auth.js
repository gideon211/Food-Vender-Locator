// src/api/auth.js
import client from "./client";

const AUTH_URL = "/auth"; // becomes `${API_BASE_URL}/auth`

export const authService = {
  login: async (credentials) => {
    const { data } = await client.post(`${AUTH_URL}/login`, credentials);
    // Expected backend response shape: { token, user }
    if (!data?.token) throw new Error("No token returned");
    localStorage.setItem("authToken", data.token);
    return { user: data.user, token: data.token };
  },

  signup: async (userData) => {
    const { data } = await client.post(`${AUTH_URL}/signup`, userData);
    if (!data?.token) throw new Error("No token returned");
    localStorage.setItem("authToken", data.token);
    return { user: data.user, token: data.token };
  },

  logout: async () => {
    try {
      await client.post(`${AUTH_URL}/logout`); // optional, if backend supports
    } catch (_) {}
    localStorage.removeItem("authToken");
    return { success: true };
  },

  getCurrentUser: async () => {
    const { data } = await client.get(`${AUTH_URL}/me`);
    // Expected: user object
    return data;
  },

  refreshToken: async () => {
    const { data } = await client.post(`${AUTH_URL}/refresh`);
    if (!data?.token) throw new Error("No new token");
    localStorage.setItem("authToken", data.token);
    return { token: data.token };
  },
};

export default authService;
