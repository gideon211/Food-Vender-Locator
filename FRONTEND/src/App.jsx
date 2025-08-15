import React from 'react';
import { BrowserRouter, Routes, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes/AppRoutes';
import { AnimatePresence } from 'framer-motion';


// Custom wrapper to use AnimatePresence with location
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <AppRoutes key={location.pathname} location={location} />
    </AnimatePresence>
  );
}

function App() {
  return (
   
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <AnimatedRoutes />
        </div>
      </AuthProvider>
  
  );
}

export default App;
