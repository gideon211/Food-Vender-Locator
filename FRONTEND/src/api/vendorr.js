import axios from "axios";

const API_URL = "https://food-vender-locator.onrender.com/api/vendors"; 

export const vendorService = {
  addVendor: async (vendor, token) => {
    const res = await axios.post(`${API_URL}/add`, vendor, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  },

  getAllVendors: async () => {
    const res = await axios.get(`${API_URL}/vendors`);
    return res.data;
  },
};
