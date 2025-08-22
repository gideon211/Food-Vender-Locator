// src/pages/Login.jsx
import React, { useState, useEffect } from "react";
import { FaFacebookF, FaLinkedinIn, FaGoogle, FaEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import LoaderSpinner from "../components/LoaderSpinner";
import { motion } from "framer-motion";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [slideOut, setSlideOut] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login, error, clearError, loading, isAuthenticated } = useAuthContext();

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    clearError?.();
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user, token } = await login(formData);
      if (user && token) {
        const redirectTo = location.state?.from?.pathname || "/dashboard";
        if (redirectTo === "/login" || redirectTo === "/signup") {
          navigate("/dashboard", { replace: true });
        } else {
          navigate(redirectTo, { replace: true });
        }
      }
    } catch (_) {}
  };

  const goToSignup = () => {
    setSlideOut(true);
    setTimeout(() => navigate("/signup"), 500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-orange-100">
      <div className="relative w-full max-w-4xl h-[600px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        <div className="w-full md:w-3/5 flex flex-col items-center justify-center p-10">
          <h2 className="text-3xl font-bold text-orange-600 mb-2">Sign In</h2>
          <div className="border-2 w-10 border-orange-500 rounded-full mb-4"></div>

          <div className="flex justify-center my-2">
            {[FaFacebookF, FaLinkedinIn, FaGoogle].map((Icon, i) => (
              <button
                key={i}
                className="border-2 border-gray-200 rounded-full p-3 mx-1 hover:bg-orange-100"
              >
                <Icon className="text-sm text-orange-500" />
              </button>
            ))}
          </div>

          <p className="text-gray-400 my-3">or use your email account</p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-md mb-3">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <label className="bg-orange-50 w-64 p-2 flex items-center mb-3 rounded-md">
              <FaEnvelope className="text-black m-2" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={handleChange}
                className="bg-transparent outline-none text-sm flex-1 text-gray-800"
              />
            </label>

            <label className="bg-orange-50 w-64 p-2 flex items-center mb-3 rounded-md">
              <MdLockOutline className="text-black m-2" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                value={formData.password}
                onChange={handleChange}
                className="bg-transparent outline-none text-sm flex-1 text-gray-800"
              />
            </label>

            <div className="flex justify-between w-64 mb-5 text-sm">
              <label className="flex items-center text-gray-500">
                <input type="checkbox" className="mr-1" /> Remember me
              </label>
              <a href="#" className="text-xs text-orange-500 hover:underline">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="border-2 border-orange-500 text-orange-600 rounded-full px-12 py-2 font-semibold hover:bg-orange-500 hover:text-white disabled:opacity-50 transition-all duration-200"
            >
              {loading ? <LoaderSpinner size="sm" color="gray" /> : "Sign In"}
            </button>
          </form>

          <p className="md:hidden mt-6 text-gray-400 text-xs">
            Don’t have an account?{" "}
            <button onClick={goToSignup} className="hover:text-orange-500 font-medium">
              Sign up
            </button>
          </p>
        </div>

        <motion.div
          initial={{ x: 0 }}
          animate={{ x: slideOut ? -400 : 0 }}
          transition={{ type: "spring", stiffness: 70 }}
          className="hidden md:flex w-2/4 relative flex-col items-center justify-center p-10 text-white"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&auto=format&fit=crop&q=60')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/30 rounded-lg"></div>
          <div className="relative z-10 flex flex-col items-center">
            <h2 className="text-3xl font-bold mb-2">Hello, Friend!</h2>
            <div className="border-2 w-10 border-white rounded-full mb-4"></div>
            <p className="mb-5 text-xs text-center">Don’t have an account? Join us.</p>
            <button
              onClick={goToSignup}
              className="border-2 border-white rounded-full px-12 py-2 font-semibold hover:bg-white hover:text-orange-600 transition-all duration-200"
            >
              Sign Up
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
