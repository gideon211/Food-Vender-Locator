import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MapPin, Phone, Mail, Star } from "lucide-react";
import VendorCard from "../api/vendors.json"; 

export default function VendorDetail() {
  const { id } = useParams();
  const [vendor, setVendor] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const found = VendorCard.find(v => v.id === parseInt(id));
      setVendor(found);
    }, 1500); // Simulated delay
    return () => clearTimeout(timer);
  }, [id]);

  if (!vendor) {
    return <p className="text-center text-gray-500 mt-8">Loading vendor...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Header Section */}
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Vendor Image */}
          <img
            src={vendor.img || "/placeholder.jpg"}
            alt={vendor.name}
            className="w-full md:w-1/3 h-64 object-cover"
          />

          {/* Vendor Info */}
          <div className="flex-1 p-6">
            <h1 className="text-3xl font-bold text-gray-900">{vendor.name}</h1>
            <p className="mt-2 text-gray-600">{vendor.description}</p>

            {/* Rating */}
            <div className="flex items-center mt-3">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <span className="ml-2 text-gray-800 font-semibold">
                {vendor.rating || "N/A"}
              </span>
            </div>

            {/* Contact Info */}
            <div className="mt-4 space-y-2">
              <div className="flex items-center text-gray-700">
                <MapPin className="w-5 h-5 mr-2 text-red-500" />
                {vendor.city}
              </div>
              <div className="flex items-center text-gray-700">
                <Phone className="w-5 h-5 mr-2 text-green-500" />
                {vendor.phone}
              </div>
              <div className="flex items-center text-gray-700">
                <Mail className="w-5 h-5 mr-2 text-blue-500" />
                {vendor.email}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Section */}
      {vendor.dishes && vendor.dishes.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Menu</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {vendor.dishes.map((item, idx) => (
              <div
                key={idx}
                className="bg-white shadow rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
              >
                <img
                  src={item.img || "/menu-placeholder.jpg"}
                  alt={item.name}
                  className="h-40 w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                  <p className="text-gray-600 mt-1">{item.description}</p>
                  <p className="mt-2 font-semibold text-green-600">₵{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
