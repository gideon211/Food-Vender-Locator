import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import L from "leaflet";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

// Fix leaflet marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export default function VendorProfileForm() {
  const [location, setLocation] = useState({ latitude: "", longitude: "" });
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { token } = useAuthContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    restaurantName: "",
    restaurantEmail: "",
    phoneNumber: "",
    imageUrl: "",
    restaurantType: "",
    description: "",
  });

  const handleGetLocation = () => {
    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLoadingLocation(false);
        toast.success("Fetched Successfully");
      },
      (error) => {
        console.error("Location error:", error);
        setLoadingLocation(false);
        toast.error("Failed to fetch location");
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const vendor = {
        restaurantName: formData.restaurantName,
        restaurantEmail: formData.restaurantEmail,
        phoneNumber: formData.phoneNumber,
        imageUrl: formData.imageUrl,
        restaurantType: formData.restaurantType,
        description: formData.description,
        latitude: parseFloat(location.latitude),
        longitude: parseFloat(location.longitude),
      };

      console.log("Sending vendor payload:", vendor);

      const res = await fetch(
        "https://food-vender-locator.onrender.com/api/vendors/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : undefined,
          },
          body: JSON.stringify(vendor),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to save vendor");
      }

      const data = await res.json();
      toast.success("Vendor added successfully!");
      console.log("Created vendor:", data);

      setSubmitted(true);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Error adding vendor");
    }
  };

  // Redirect after 1 second when submitted
  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => {
        navigate("/Dashboard");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [submitted, navigate]);

  // Success screen
  if (submitted) {
    return (
      <div className="flex items-center justify-center h-screen bg-amber-50">
        <h1 className="text-xl font-bold text-green-600">
          Shop created successfully. Redirecting...
        </h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen">
      {/* Left Side */}
      <div
        className="relative w-full lg:w-full bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1726137570707-528402375b7b?w=500&auto=format&fit=crop&q=60')",
        }}
      >
        <div className="absolute inset-0 bg-black/50 bg-opacity-40 flex items-center px-10 lg:px-24">
          <div className="text-white max-w-2xl">
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
              Become an FVL merchant and grow your revenue
            </h1>
            <p className="mt-6 text-lg leading-relaxed">
              Our merchants enjoy more orders, increased sales, and unmatched
              visibility. Sign up today and reap the benefits!
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-full flex justify-center bg-amber-50 p-6 lg:p-12">
        <div className="w-full max-w-xl bg-amber-50 rounded-md p-8">
          <h2 className="text-3xl font-semibold text-gray-900 mb-2 leading-4xl">
            Let us help your business grow!
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Already a partner?{" "}
            <a href="#" className="text-orange-400 font-medium">
              Log in
            </a>
          </p>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm"
          >
            {/* Restaurant Name */}
            <div className="md:col-span-2">
              <label className="block text-gray-800 font-medium mb-1">
                Restaurant name
              </label>
              <input
                type="text"
                placeholder="Enter restaurant name"
                className="bg-white border rounded-md px-4 py-3 w-full"
                value={formData.restaurantName}
                onChange={(e) =>
                  setFormData({ ...formData, restaurantName: e.target.value })
                }
              />
            </div>

            {/* Restaurant Email */}
            <div className="md:col-span-2">
              <label className="block text-gray-800 font-medium mb-1">
                Restaurant Email
              </label>
              <input
                type="email"
                placeholder="Enter email"
                className="bg-white border rounded-md px-4 py-3 w-full"
                value={formData.restaurantEmail}
                onChange={(e) =>
                  setFormData({ ...formData, restaurantEmail: e.target.value })
                }
              />
            </div>

            {/* Phone */}
            <div className="md:col-span-2">
              <label className="block text-gray-800 font-medium mb-1">
                Phone
              </label>
              <input
                type="text"
                placeholder="Enter phone number"
                className="bg-white border rounded-md px-4 py-3 w-full"
                value={formData.phoneNumber}
                onChange={(e) =>
                  setFormData({ ...formData, phoneNumber: e.target.value })
                }
              />
            </div>

            {/* Restaurant Type */}
            <div className="md:col-span-2">
              <label className="block text-gray-800 font-medium mb-1">
                Restaurant Type
              </label>
              <input
                type="text"
                placeholder="e.g. Fast Food, Cafe"
                className="bg-white border rounded-md px-4 py-3 w-full"
                value={formData.restaurantType}
                onChange={(e) =>
                  setFormData({ ...formData, restaurantType: e.target.value })
                }
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-gray-800 font-medium mb-1">
                Description
              </label>
              <textarea
                placeholder="Short description"
                className="bg-white border rounded-md px-4 py-3 w-full"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>

            {/* Get Location Button */}
            <div className="md:col-span-2">
              <button
                type="button"
                onClick={handleGetLocation}
                className="w-full border bg-orange-200 hover:bg-orange-200 rounded-md px-4 py-3 text-left"
              >
                {loadingLocation
                  ? "Fetching location..."
                  : location.latitude && location.longitude
                  ? `Lat: ${location.latitude.toFixed(
                      6
                    )}, Lng: ${location.longitude.toFixed(6)}`
                  : "Get venue location (GPS)"}
              </button>
            </div>

            {/* Vendor Profile Image */}
            <div className="md:col-span-2">
              <label className="block text-gray-800 font-medium mb-1">
                Profile image (URL)
              </label>
              <input
                type="text"
                className="bg-white border rounded-md px-4 py-3 w-full cursor-text"
                value={formData.imageUrl}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    imageUrl: e.target.value,
                  })
                }
              />
              <p className="text-xs text-gray-500 mt-1">
                Upload a clear image of your restaurant, shop, or logo.
              </p>
            </div>

            {/* Submit */}
            <div className="md:col-span-2">
              <button
                type="submit"
                className="mt-6 bg-orange-500 hover:bg-orange-600 text-white w-full py-3 rounded-full font-medium cursor-pointer"
              >
                Get started
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
