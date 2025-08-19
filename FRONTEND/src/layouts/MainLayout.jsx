// Main layout - Layout wrapper for authenticated pages with navbar and footer
import React from 'react';


const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navigation */}
      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}

    </div>
  );
};

export default MainLayout;