import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import ProtectedRoute from "../components/ProtectedRoute";
import { Toaster } from "react-hot-toast";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/SignUp";
import Dashboard from "../pages/Dashboard";
import VendorProfile from "../pages/VendorProfile";
import UpdateVendorProfile from "../pages/UpdateVendorProfile";
import NotFound from "../pages/NotFound";
import VendorDetail from "../pages/VendorDetail";
import Recent from "../pages/RecentlyAdded"
import MyShopRouter from "../pages/MyShopRouter"; 
const AppRoutes = () => {
  const location = useLocation();

  return (
    <>
      <Toaster />
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/vendor/:id" element={<VendorDetail />} />
          <Route path="/RecentlyAdded" element={<Recent />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />



<Route
  path="/my-shop/:email"
  element={
    <ProtectedRoute>
      <MyShopRouter />
    </ProtectedRoute>
  }
/>









          <Route
            path="/vendor-profile"
            element={
              <ProtectedRoute>
                <VendorProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/update-vendor-profile"
            element={
              <ProtectedRoute>
                <UpdateVendorProfile />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default AppRoutes;
