// Protected route component - Checks authentication before rendering children
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import FullPageLoader from './FullPageLoader';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();
  
  // TODO: Add any additional authentication checks here if needed
  // Example: role-based access control, subscription status, etc.

  // Show loading spinner while checking authentication
  if (loading) {
    return <FullPageLoader message="Checking authentication..." />;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Render children if authenticated
  return children;
};

export default ProtectedRoute;