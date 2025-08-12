// Navigation bar component - Contains main site navigation and user menu
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { handleLogout } from '../utils/handleLogout';

const Navbar = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const onLogout = () => {
    handleLogout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold text-white hover:text-gray-300">
              VendorApp
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">
                Home
              </Link>
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">
                    Dashboard
                  </Link>
                  <Link to="/vendor-profile" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">
                    Profile
                  </Link>
                  <button
                    onClick={onLogout}
                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">
                    Login
                  </Link>
                  <Link to="/signup" className="px-3 py-2 rounded-md text-sm font-medium bg-blue-600 hover:bg-blue-700">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-300 hover:text-white">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;