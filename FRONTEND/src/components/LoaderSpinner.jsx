// Loading spinner component - Shows a spinning loader for async operations
import React from 'react';

const LoaderSpinner = () => {

  return (
   <div className="animate-pulse space-y-4 w-full max-w-sm mx-auto">
      {/* Username field skeleton */}
      <div className="h-10 bg-gray-300 rounded"></div>

      {/* Password field skeleton */}
      <div className="h-10 bg-gray-300 rounded"></div>

      {/* Button skeleton */}
      <div className="h-10 bg-gray-400 rounded"></div>
    </div>
  );
};

export default LoaderSpinner;