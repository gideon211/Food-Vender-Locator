import React, { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function RecentlyAddedShops() {
  const { token } = useAuthContext();
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchShops = async () => {
      setLoading(true);
      try {
        if (!token) throw new Error("No authentication token found");

        const res = await fetch("https://food-vender-locator.onrender.com/api/vendors", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        const text = await res.text();
        let data;
        try {
          data = JSON.parse(text);
        } catch {
          data = text;
        }

        if (!res.ok) {
          console.error("Backend response:", data);
          throw new Error(data?.message || "Failed to fetch shops");
        }

        setShops(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
        toast.error(error.message || "Error fetching shops");
        setShops([]);
      } finally {
        setLoading(false);
      }
    };

    fetchShops();
  }, [token]);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-600">
        Loading recently added shops...
      </div>
    );
  }

  if (!shops.length) {
    return (
      <div className="p-8 text-center text-gray-600">
        No shops added recently.
      </div>
    );
  }

  return (
    <div className="relative py-4 px-6">
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-gray-100 z-10"
      >
        <ArrowLeft size={20} />
      </button>

      <div
        ref={containerRef}
        className="flex space-x-4 overflow-hidden"
      >
        {shops.map((shop) => (
          <div
            key={shop.id}
            className="relative flex-shrink-0 w-[13rem] h-[15rem] rounded-sm overflow-hidden cursor-pointer"
          >
            <img
              src={shop.imageUrl || "https://via.placeholder.com/400"}
              alt={shop.restaurantName}
              className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-center text-white p-4">
              <h3 className="text-lg font-semibold">{shop.restaurantName}</h3>
              <p className="text-sm">{shop.restaurantType}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-gray-100 z-10"
      >
        <ArrowRight size={20} />
      </button>
    </div>
  );
}
