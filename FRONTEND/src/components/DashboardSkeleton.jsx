// DashboardSkeleton.jsx
import React from "react";

const DashboardSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* Carousel placeholder */}
      <div className="h-64 bg-gray-200 rounded mb-8"></div>

      {/* Section heading */}
      <div className="h-8 bg-gray-200 w-1/2 mx-auto mb-8 rounded"></div>

      {/* Dish circles */}
      <div className="flex flex-wrap gap-8 justify-center mb-12">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="w-32 h-32 bg-gray-200 rounded-full"></div>
        ))}
      </div>

      {/* Vendors list placeholder */}
      <div className="space-y-4 px-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-40 bg-gray-200 rounded"></div>
        ))}
      </div>
    </div>
  );
};

export default DashboardSkeleton;
