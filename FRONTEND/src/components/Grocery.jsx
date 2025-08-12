import React from 'react'
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

function Grocery({ vendors}) {
  return (
    <div>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6 shadow-white">
      {vendors.slice(28, 40).map((vendor) => (
        <Link
          to={`/vendor/${vendor.id}`}
          key={vendor.id}
          className="flex gap-2 items-start overflow-hidden hover:cursor-pointer transform transition duration-300 hover:scale-102"
        >
          {/* Vendor Image */}
          <div className="w-[15rem] mr-4 h-[10rem]">
            <img
              src={vendor.dishes[0]?.img}
              alt={vendor.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Vendor Info */}
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{vendor.name}</h2>
              <p className="text-sm text-gray-600">{vendor.city}</p>
               <div className="mt-2">
                <p className="text-sm text-gray-800 font-medium truncate">
                  {[...new Set(vendor.dishes.map((d) => d.name))].join(" • ")}
                </p>
              </div>

              {/* Rating */}
              {vendor.rating && (
                <div className="flex items-center gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < Math.floor(vendor.rating)
                          ? "text-yellow-300 fill-yellow-500"
                          : i < vendor.rating
                          ? "text-yellow-500 fill-yellow-500 opacity-50"
                          : "text-gray-300"
                      }
                    />
                  ))}
                  <span className="text-sm text-gray-500 ml-1">{vendor.rating}</span>
                </div>
              )}

              {/* Dishes preview */}
             
            </div>
          </div>
        </Link>
      ))}
    </div>
    </div>
  )
}

export default Grocery