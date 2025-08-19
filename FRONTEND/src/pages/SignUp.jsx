// src/pages/Signup.jsx
import {
  FaFacebookF, FaLinkedinIn, FaGoogle, FaEnvelope,
} from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoaderSpinner from "../components/LoaderSpinner";
import { motion } from "framer-motion";
import { useAuth } from "../hooks/useAuth";

const Signup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [slideOut, setSlideOut] = useState(false);
  const navigate = useNavigate();
  const { signup, error, clearError, loading } = useAuth();

  const handleChange = (e) => {
    clearError?.();
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;
    if (password !== confirmPassword) return alert("Passwords do not match");
    try {
      await signup({ name, email, password });
      navigate("/login");
    } catch (err) {
        alert(error.response?.data || "sign up failed")
    }
  };

  const goToLogin = () => {
    setSlideOut(true);
    setTimeout(() => navigate("/login"), 500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-orange-100">
      <div className="relative w-full max-w-4xl h-[600px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: slideOut ? 400 : 0 }}
          transition={{ type: "spring", stiffness: 70 }}
          className="hidden md:flex w-2/5 relative flex-col items-center justify-center p-10 text-white"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1540377904109-89bf2d99918a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8d2FpdGVyfGVufDB8MXwwfHx8Mg%3D%3D')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/40 bg-opacity-50 rounded-lg"></div>
          <div className="relative z-10 flex flex-col items-center">
            <h2 className="text-3xl font-bold mb-2">Welcome Back!</h2>
            <div className="border-2 w-10 rounded-full border-white mb-4"></div>
            <p className="mb-5 text-sm">Already have an account?</p>
            <button
              onClick={goToLogin}
              className="border-2 border-white rounded-full px-12 py-2 font-semibold hover:bg-white hover:text-orange-500 transition-all duration-200"
            >
              Sign In
            </button>
          </div>
        </motion.div>

        <div className="w-full md:w-3/5 flex flex-col items-center justify-center p-10">
          <h2 className="text-3xl font-bold text-orange-600 mb-2">Create Account</h2>
          <div className="border-2 w-10 rounded-full border-orange-500 mb-4"></div>

          <div className="flex justify-center my-2">
            <button className="border-2 border-gray-200 rounded-full p-3 mx-1 hover:bg-orange-100">
              <FaFacebookF className="text-sm text-orange-500" />
            </button>
            <button className="border-2 border-gray-200 rounded-full p-3 mx-1 hover:bg-orange-100">
              <FaLinkedinIn className="text-sm text-orange-500" />
            </button>
            <button className="border-2 border-gray-200 rounded-full p-3 mx-1 hover:bg-orange-100">
              <FaGoogle className="text-sm text-orange-500" />
            </button>
          </div>

          <p className="text-gray-400 my-3">or use your email for registration</p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-md mb-3">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <label className="bg-orange-50 w-64 p-2 flex items-center mb-3 rounded-md">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                value={formData.name}
                onChange={handleChange}
                className="bg-transparent outline-none text-sm flex-1 text-gray-800 "
              />
            </label>

            <label className="bg-orange-50 w-64 p-2 flex items-center mb-3 rounded-md">
              <FaEnvelope className=" m-2" />
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
              <MdLockOutline className=" m-2" />
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

            <label className="bg-orange-50 w-64 p-4 flex items-center mb-3 rounded-md text-center">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="bg-transparent outline-none text-sm flex-1  text-gray-800"
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className="border-2 border-orange-500 text-orange-600 rounded-full px-12 py-2 font-semibold hover:bg-orange-500 hover:text-white disabled:opacity-50 transition-all duration-200"
            >
              {loading ? <LoaderSpinner /> : "Sign Up"}
            </button>
          </form>

          <p className="md:hidden mt-6 text-gray-400 text-sm">
            Already have an account?{" "}
            <button onClick={goToLogin} className="hover:text-orange-500 font-medium">
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
