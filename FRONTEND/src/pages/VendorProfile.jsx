import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import toast from "react-hot-toast";
import L from "leaflet";

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
  const [locationSuccess, setLocationSuccess] = useState(false);

  const handleGetLocation = () => {
    setLoadingLocation(true);
    setLocationSuccess(false);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLocationSuccess(true);
        setLoadingLocation(false);
        toast.success("Location fetched");
      },
      (error) => {
        console.error("Location error:", error);
        setLoadingLocation(false);
        toast.error("Failed to fetch location");
      }
    );
  };

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen">
      {/* Left Side */}
      <div
        className="relative w-full lg:w-1/2 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1726137570707-528402375b7b?w=500&auto=format&fit=crop&q=60')",
        }}
      >
        <div className="absolute inset-0 bg-black/50 bg-opacity-40 flex items-center px-10 lg:px-24">
          <div className="text-white max-w-lg">
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
              Become an FVL merchant and grow your revenue
            </h1>
            <p className="mt-6 text-lg leading-relaxed">
              Our merchants enjoy more orders, increased sales, and unmatched visibility. Sign up today and reap the benefits!
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-6 lg:p-12">
        <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Let us help your business grow!
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Already a partner? <a href="#" className="text-green-600 font-medium">Log in</a>
          </p>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {/* Business Name */}
            <div>
              <label className="block text-gray-800 font-medium mb-1">Business name</label>
              <input
                type="text"
                placeholder="Enter business name"
                className="bg-gray-100 border rounded-md px-4 py-3 w-full"
              />
            </div>

            {/* Business Type */}
            <div>
              <label className="block text-gray-800 font-medium mb-1">Business type</label>
              <select className="bg-gray-100 border rounded-md px-4 py-3 w-full text-gray-700">
                <option value="">Select business type</option>
                <option value="restaurant">Restaurant</option>
                <option value="local">Local</option>
              </select>
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label className="block text-gray-800 font-medium mb-1">Address</label>
              <input
                type="text"
                placeholder="Enter your venue address"
                className="bg-gray-100 border rounded-md px-4 py-3 w-full"
              />
            </div>

            {/* Get Location Button */}
            <div className="md:col-span-2">
              <button
                type="button"
                onClick={handleGetLocation}
                className="w-full border bg-gray-100 hover:bg-gray-200 rounded-md px-4 py-3 text-left"
              >
                {loadingLocation
                  ? "Fetching location..."
                  : location.latitude && location.longitude
                  ? `Lat: ${location.latitude.toFixed(6)}, Lng: ${location.longitude.toFixed(6)}`
                  : "Get venue location (GPS)"}
              </button>
            </div>

            {/* Post Code */}
            <div className="md:col-span-2">
              <label className="block text-gray-800 font-medium mb-1">Post code</label>
              <input
                type="text"
                placeholder="Enter post code"
                className="bg-gray-100 border rounded-md px-4 py-3 w-full"
              />
            </div>

            {/* Email */}
            <div className="md:col-span-2">
              <label className="block text-gray-800 font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter email address"
                className="bg-gray-100 border rounded-md px-4 py-3 w-full"
              />
              <p className="text-xs text-gray-500 mt-1">Main Contact person email</p>
            </div>

            {/* Phone Number */}
            <div className="md:col-span-2">
              <label className="block text-gray-800 font-medium mb-1">Phone number</label>
              <div className="flex items-center gap-2">
                <select className="bg-gray-100 border rounded-md px-4 py-3 text-sm">
                  <option value="+233">🇬🇭 +233</option>
                </select>
                <input
                  type="text"
                  placeholder="Mobile number"
                  className="bg-gray-100 border rounded-md px-4 py-3 w-full text-sm"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="md:col-span-2">
              <button className="mt-6 bg-green-500 hover:bg-green-600 text-white w-full py-3 rounded-full font-medium">
                Get started
              </button>
            </div>
          </form>

          {/* Map Preview */}
          {locationSuccess && (
            <div className="mt-6">
              <MapContainer
                center={[location.latitude, location.longitude]}
                zoom={15}
                scrollWheelZoom={false}
                style={{ height: "200px", borderRadius: "0.5rem" }}
              >
                <TileLayer
                  attribution='&copy; OpenStreetMap contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[location.latitude, location.longitude]}>
                  <Popup>Your business location</Popup>
                </Marker>
              </MapContainer>
            </div>
          )}
        </div>
      </div>

      {/* Feature Section */}
    
    </div>
  );
}
