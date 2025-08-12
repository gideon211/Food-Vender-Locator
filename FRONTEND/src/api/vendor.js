// Vendor API calls - Handles vendor-related requests and operations
import axios from 'axios';

// TODO: Replace with your actual backend API URL
const API_BASE_URL = 'http://localhost:3001/api'; // CHANGE THIS TO YOUR BACKEND URL

// Create axios instance for vendor operations
const vendorAPI = axios.create({
  baseURL: `${API_BASE_URL}/vendors`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
vendorAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Vendor API methods
export const vendorService = {
  // Get all vendors
  // TODO: Update endpoint and response format to match your backend
  getAllVendors: async () => {
    const response = await vendorAPI.get('/');
    // TODO: Adjust response structure based on your API response format
    return response.data;
  },

  // Get vendor by ID
  // TODO: Update endpoint and response format to match your backend
  getVendorById: async (vendorId) => {
    const response = await vendorAPI.get(`/${vendorId}`);
    // TODO: Adjust response structure based on your API response format
    return response.data;
  },

  // Create new vendor profile
  // TODO: Update endpoint and request/response format to match your backend
  createVendor: async (vendorData) => {
    const response = await vendorAPI.post('/', vendorData);
    // TODO: Adjust response structure based on your API response format
    return response.data;
  },

  // Update vendor profile
  // TODO: Update endpoint and request/response format to match your backend
  updateVendor: async (vendorId, vendorData) => {
    const response = await vendorAPI.put(`/${vendorId}`, vendorData);
    // TODO: Adjust response structure based on your API response format
    return response.data;
  },

  // Delete vendor
  // TODO: Update endpoint and response format to match your backend
  deleteVendor: async (vendorId) => {
    const response = await vendorAPI.delete(`/${vendorId}`);
    // TODO: Adjust response structure based on your API response format
    return response.data;
  },
};

export default vendorService;