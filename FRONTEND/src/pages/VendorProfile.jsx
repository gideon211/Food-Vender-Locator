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

  // NEW — State for multiple dishes
  const [dishes, setDishes] = useState([{ name: "", image: null }]);

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
        toast.success("Feched Successfully");
      },
      (error) => {
        console.error("Location error:", error);
        setLoadingLocation(false);
        toast.error("Failed to fetch location");
      }
    );
  };

  // NEW — Handle dish changes
  const handleDishChange = (index, field, value) => {
    const updated = [...dishes];
    updated[index][field] = value;
    setDishes(updated);
  };

  // NEW — Add new dish row
  const handleAddDish = () => {
    setDishes([...dishes, { name: "", image: null }]);
  };

  // NEW — Remove dish row
  const handleRemoveDish = (index) => {
    setDishes(dishes.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col lg:flex-row w-ful min-h-screen">
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
      <div className="w-full lg:w-full flex  justify-center bg-amber-50 p-6 lg:p-12">
        <div className="w-full max-w-xl bg-amber-50 rounded-md  p-8">
          <h2 className="text-3xl font-semibold text-gray-900 mb-2 leading-4xl">
            Let us help your business grow!
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Already a partner?{" "}
            <a href="#" className="text-orange-400 font-medium">
              Log in
            </a>
          </p>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {/* Business Name */}
            <div>
              <label className="block text-gray-800 font-medium mb-1">
                Business name
              </label>
              <input
                type="text"
                placeholder="Enter business name"
                className="bg-white border rounded-md px-4 py-3 w-full"
              />
            </div>

            {/* Business Type */}
            <div>
              <label className="block text-gray-800 font-medium mb-1">
                Business type
              </label>
              <select className="bg-white border rounded-md px-4 py-3 w-full text-gray-700">
                <option value="">Select business type</option>
                <option value="restaurant">Restaurant</option>
                <option value="local">Local</option>
              </select>
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label className="block text-gray-800 font-medium mb-1">
                City
              </label>
              <input
                type="text"
                placeholder="Enter your venue address"
                className="bg-white border rounded-md px-4 py-3 w-full"
              />
            </div>

            {/* Get Location Button */}
            <div className="md:col-span-2">
              <button
                type="button"
                onClick={handleGetLocation}
                className="w- border bg-orange-200 hover:bg-orange-200 rounded-md px-4 py-3 text-left"
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
                Profile image
              </label>
              <input
                type="file"
                accept="image/*"
                className="bg-white border rounded-md px-4 py-3 w-full cursor-pointer"
              />
              <p className="text-xs text-gray-500 mt-1">
                Upload a clear image of your restaurant, shop, or logo.
              </p>
            </div>

            {/* NEW — Multiple Dishes Section */}
{/* Dishes Section */}
<div className="mt-4">
  <h3 className="text-lg font-semibold mb-3">Dishes</h3>
  
  {dishes.map((dish, index) => (
    <div key={index} className="flex gap-4 mb-4">
      {/* Dish Name */}
      <input
        type="text"
        placeholder="Dish Name"
        value={dish.name}
        onChange={(e) =>
          handleDishChange(index, "name", e.target.value)
        }
        className="border p-2 flex-1 rounded"
      />

      {/* Dish Price */}
      <input
        type="number"
        placeholder="Price"
        value={dish.price}
        onChange={(e) =>
          handleDishChange(index, "price", e.target.value)
        }
        className="border p-2 w-28 rounded"
      />

      {/* Dish Image */}
      <input
        type="file"
        accept="image/*"
        onChange={(e) =>
          handleDishImageChange(index, e.target.files[0])
        }
        className="border p-2 w-38 text-xm"
      />
    </div>
  ))}

<button
  type="button"
  onClick={handleAddDish}  // ✅ This matches your defined function
  className="bg-orange-300 text-white px-4 py-2 rounded hover:bg-orange-400"
>
  +
</button>

</div>


            {/* Phone Number */}
            <div className="md:col-span-2">
              <label className="block text-gray-800 font-medium mb-1">
                Phone number
              </label>
              <div className="flex items-center gap-2">
                <select className="bg-white border rounded-md px-4 py-3 text-sm">
                  <option value="+233">🇬🇭 +233</option>
                </select>
                <input
                  type="text"
                  placeholder="Mobile number"
                  className="bg-white border rounded-md px-4 py-3 w-full text-sm"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="md:col-span-2">
              <button className="mt-6 bg-orange-500 hover:bg-orange-600 text-white w-full py-3 rounded-full font-medium cursor-pointer">
                Get started
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
