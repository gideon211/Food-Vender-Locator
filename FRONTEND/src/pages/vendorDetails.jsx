import React, { useState, useEffect } from "react";
import { Pencil } from "lucide-react";

const VendorDetails = () => {
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingField, setEditingField] = useState("");
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchVendor = async () => {
      try {
        const res = await fetch(
          "https://food-vender-locator.onrender.com/api/vendors/my-vendor",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!res.ok) throw new Error("Failed to fetch vendor details");
        const data = await res.json();
        setVendor(data);
        setFormData(data);
      } catch (err) {
        console.error("Error fetching vendor:", err);
        setError("Could not load vendor details. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchVendor();
  }, []);

  const handleEditClick = (field) => setEditingField(field);
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (field) => {
    try {
      const res = await fetch(
        "https://food-vender-locator.onrender.com/api/vendors/update/my-vendor",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ [field]: formData[field] }),
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to update vendor");
      }

      const updatedVendor = await res.json();
      setVendor(updatedVendor);
      setEditingField("");
    } catch (err) {
      console.error("Error updating vendor:", err);
      alert(err.message || "Could not save changes. Please try again.");
    }
  };

  if (loading)
    return (
      <p className="text-center text-orange-600 mt-10 font-semibold text-lg">
        Loading shop details...
      </p>
    );

  if (error)
    return (
      <p className="text-center text-red-500 mt-10 font-semibold text-lg">
        {error}
      </p>
    );

  if (!vendor)
    return (
      <p className="text-center text-gray-700 mt-10 font-semibold text-lg">
        No shop found for this user.
      </p>
    );

  const renderField = (label, field, type = "text") => (
    <div className="flex flex-col w-full gap-1">
      <span className="font-semibold text-orange-500">{label}:</span>
      {editingField === field ? (
        <div className="flex gap-2 items-center w-full">
          {type === "textarea" ? (
            <textarea
              className="flex-1 border rounded p-2 resize-none bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
              rows={3}
              value={formData[field] || ""}
              onChange={(e) => handleChange(field, e.target.value)}
            />
          ) : (
            <input
              type={type}
              className="flex-1 border rounded p-2 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
              value={formData[field] || ""}
              onChange={(e) => handleChange(field, e.target.value)}
            />
          )}
          <button
            onClick={() => handleSave(field)}
            className="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded transition-colors cursor-pointer"
          >
            Save
          </button>
        </div>
      ) : (
        <div className="flex gap-2 items-center w-full border rounded p-2 bg-orange-50">
          <span className="flex-1 text-gray-700">{vendor[field] ?? "Not set"}</span>
          <button onClick={() => handleEditClick(field)}>
            <Pencil size={18} className="text-orange-500 hover:text-orange-600" />
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center py-10">
      <div className="p-6 bg-orange-50 rounded-2xl border border-orange-200 w-full max-w-md flex flex-col items-center gap-6">
        
        {/* Image */}
        {vendor.imageUrl ? (
          <img
            src={vendor.imageUrl}
            alt={vendor.restaurantEmail}
            className="w-[40rem] h-[13rem] object-cover rounded-md shadow-sm"
          />
        ) : (
          <div className="w-48 h-48 flex items-center justify-center bg-orange-200 rounded-xl border-2 border-orange-300">
            <span className="text-orange-600 font-semibold">No Image</span>
          </div>
        )}

        {/* Restaurant Name */}
        <h1 className="text-3xl font-bold text-orange-600 mt-2 text-center">
          {vendor.restaurantName ?? "My Shop"}
        </h1>

        {/* Editable Fields */}
        <div className="w-full flex flex-col gap-4 mt-4">
          {renderField("Email", "restaurantEmail")}
          {renderField("Phone", "phoneNumber")}
          {renderField("Type", "restaurantType")}
          {renderField("Description", "description", "textarea")}
          {renderField("Latitude", "latitude", "number")}
          {renderField("Longitude", "longitude", "number")}
        </div>
      </div>
    </div>
  );
};

export default VendorDetails;
