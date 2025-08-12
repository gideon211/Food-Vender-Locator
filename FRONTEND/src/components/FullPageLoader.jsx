// Full page loader component - Shows loading state that covers the entire page
import React from 'react';
import LoaderSpinner from './LoaderSpinner';

const FullPageLoader = ({ message = 'Loading...' }) => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
      <div className="text-center">
        <LoaderSpinner size="xl" color="blue" />
        <p className="mt-4 text-lg text-gray-600 font-medium">{message}</p>
      </div>
    </div>
  );
};

export default FullPageLoader;