// components/Proker/ProkerCardSkeleton.tsx
import React from 'react';

const ProkerCardSkeleton: React.FC = () => {
  return (
    <div className="w-full bg-white rounded-4xl shadow-lg overflow-hidden animate-pulse">

      <div className="aspect-video bg-gray-300"></div>
 
      <div className="p-5">
        <div className="flex justify-end mb-4">
          <div className="h-6 w-24 bg-gray-300 rounded-full"></div>
        </div>
        <div className="h-6 w-3/4 bg-gray-300 rounded-md mb-4"></div>
        <div className="h-6 w-1/2 bg-gray-300 rounded-md mb-4"></div>
        <div className="h-8 w-28 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  );
};

export default ProkerCardSkeleton;