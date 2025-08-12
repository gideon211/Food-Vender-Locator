// Logout utility function - Handles user logout process
import { removeToken } from './tokenUtils';

export const handleLogout = () => {
  // Remove authentication token
  removeToken();
  
  // Clear any cached user data
  localStorage.removeItem('userData');
  
  // Clear session storage if used
  sessionStorage.clear();
  
  // Optional: Clear any other app-specific storage
  // localStorage.removeItem('preferences');
  // localStorage.removeItem('appSettings');
  
  // Optional: Make API call to logout endpoint
  // This could be handled in the AuthContext instead
  console.log('User logged out successfully');
};

export default handleLogout;