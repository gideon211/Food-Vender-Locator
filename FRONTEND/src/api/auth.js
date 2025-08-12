// Authentication API calls - Handles login, signup, and auth-related requests
// This mock version lets you log in and sign up without a backend

export const authService = {
  // Mock login function
  login: async (credentials) => {
    const { email, password } = credentials;

    // Simulate server delay
    await new Promise((res) => setTimeout(res, 500));

    // Check against dummy user
    if (email === "test@example.com" && password === "password123") {
      const mockUser = {
        id: 1,
        name: "Test User",
        email: "test@example.com",
      };
      const mockToken = "fake-jwt-token";

      // Save token
      localStorage.setItem("authToken", mockToken);
      return { user: mockUser, token: mockToken };
    } else {
      throw new Error("Invalid email or password");
    }
  },

  // Mock signup function
  signup: async (userData) => {
    // Simulate server delay
    await new Promise((res) => setTimeout(res, 500));

    const mockUser = {
      id: 2,
      name: userData.name || "New User",
      email: userData.email,
    };
    const mockToken = "fake-jwt-token-signup";

    localStorage.setItem("authToken", mockToken);
    return { user: mockUser, token: mockToken };
  },

  // Mock logout function
  logout: async () => {
    localStorage.removeItem("authToken");
    return { success: true };
  },

  // Mock get current user function
  getCurrentUser: async () => {
    const token = localStorage.getItem("authToken");

    // Simulate token validation
    if (token) {
      return {
        id: 1,
        name: "Test User",
        email: "test@example.com",
      };
    } else {
      throw new Error("Unauthorized");
    }
  },

  // Mock refresh token
  refreshToken: async () => {
    // No real refresh, just return a new fake token
    const newToken = "fake-new-token";
    localStorage.setItem("authToken", newToken);
    return { token: newToken };
  },
};

export default authService;
