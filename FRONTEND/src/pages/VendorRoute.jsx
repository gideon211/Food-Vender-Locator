import React from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import FullPageLoader from "./FullPageLoader";

const VendorRoute = ({ children }) => {
  const { authUser, loading } = useAuthContext();
  const location = useLocation();
  const { email } = useParams();

  if (loading) {
    return <FullPageLoader message="Checking vendor access..." />;
  }

  if (!authUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (authUser.role !== "vendor") {
    return <Navigate to="/" replace />;
  }

  if (authUser.email !== email) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default VendorRoute;
