// src/api/auth.js
import client from "./client";

export const authService = {
  login: async (credentials) => {
    const { data } = await client.post("/users/login", credentials);
    return data; // expected { user }
  },

signup: async (userData) => {
  const { data } = await client.post("/users", {
    name: userData.name,   // must match backend
    email: userData.email, // must match backend
    password: userData.password,
  });
  return data;
},


  logout: async () => {
    await client.post("/users/logout");
  },

//   getCurrentUser: async () => {
//     const { data } = await client.get("/me");
//     return data; // expected { user }
//   },
};
