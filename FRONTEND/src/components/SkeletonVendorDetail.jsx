// src/components/SkeletonVendorDetail.jsx
export default function SkeletonVendorDetail() {
  return (
    <div className="p-6 animate-pulse">
      {/* Vendor Name */}
      <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
      <div className="h-4 bg-gray-100 rounded w-1/4 mb-4"></div>

      {/* Dishes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="rounded p-4">
            <div className="w-full h-32 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-1"></div>
            <div className="h-3 bg-gray-100 rounded w-1/2"></div>
          </div>
        ))}
      </div>

      {/* Map Placeholder */}
      <div className="mt-6 w-full h-64 bg-gray-320 rounded"></div>
    </div>
  );
}
