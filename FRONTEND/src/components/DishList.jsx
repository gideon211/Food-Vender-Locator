import React from 'react';
import { Link } from 'react-router-dom';

const DishList = ({ vendors }) => {
  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6 shadow-white">
      {vendors.slice(0, 10).map((vendor) => (
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
              <h2 className="text-lg font-semibold text-gray-900">
                {vendor.name}
              </h2>
              <p className="text-sm text-gray-600">{vendor.city}</p>

              {/* Description */}
              <p className="mt-1 text-sm text-gray-700 line-clamp-2 italic">
                {vendor.description}
              </p>

              {/* Tags */}
              <div className="mt-1 flex flex-wrap gap-2">
                {vendor.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-orange-100 text-gray-800 font-medium text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Dishes preview */}
              <div className="mt-2">
                <p className="text-sm text-gray-800 font-medium truncate">
                  {[...new Set(vendor.dishes.map((d) => d.name))].join(' • ')}
                </p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default DishList;
