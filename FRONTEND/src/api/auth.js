// src/api/auth.js
import client from "./client";

export const authService = {
  login: async (credentials) => {
    const { data } = await client.post("/login", credentials, {
      headers: { "Content-Type": "application/json" },
    });
    if (data.token) {
      localStorage.setItem("token", data.token);
    }
    return data;
  },

  signup: async (userData) => {
    const { data } = await client.post(
      "/register",
      {
        name: userData.name,
        email: userData.email,
        password: userData.password,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    if (data.token) {
      localStorage.setItem("token", data.token);
    }
    return data;
  },

  logout: () => {
    localStorage.removeItem("token");
  },
};
