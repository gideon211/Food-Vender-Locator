// Token utility functions - Manages authentication tokens in localStorage

// TODO: Update TOKEN_KEY if your backend uses a different token storage key
const TOKEN_KEY = 'authToken';

// Get token from localStorage
export const getToken = () => {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error('Error getting token:', error);
    return null;
  }
};

// Set token in localStorage
export const setToken = (token) => {
  try {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error setting token:', error);
    return false;
  }
};

// Remove token from localStorage
export const removeToken = () => {
  try {
    localStorage.removeItem(TOKEN_KEY);
    return true;
  } catch (error) {
    console.error('Error removing token:', error);
    return false;
  }
};

// Check if token exists
export const hasToken = () => {
  return !!getToken();
};

// Check if token is expired (basic check - you might want to decode JWT for better validation)
export const isTokenExpired = (token) => {
  if (!token) return true;
  
  // TODO: Update this function based on your token format
  // This example assumes JWT tokens - modify if you use different token format
  try {
    // For JWT tokens, you would decode and check exp claim
    // This is a basic implementation
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    
    return payload.exp < currentTime;
  } catch (error) {
    // If token can't be parsed, consider it expired
    return true;
  }
};

// Get token payload (for JWT tokens)
export const getTokenPayload = (token = null) => {
  const authToken = token || getToken();
  
  if (!authToken) return null;
  
  // TODO: Update this function based on your token format
  // This example assumes JWT tokens - modify if you use different token format
  try {
    // Decode JWT payload
    const payload = JSON.parse(atob(authToken.split('.')[1]));
    return payload;
  } catch (error) {
    console.error('Error decoding token payload:', error);
    return null;
  }
};

export default {
  getToken,
  setToken,
  removeToken,
  hasToken,
  isTokenExpired,
  getTokenPayload,
};