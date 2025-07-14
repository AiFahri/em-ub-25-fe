// src/components/proker/ProkerSideCardSkeleton.tsx

import React from 'react';

const ProkerSideCardSkeleton: React.FC = () => {
  return (
    <div className="w-full p-4 rounded-2xl bg-gray-200">
      <div className="flex flex-col gap-3">
        {/* Skeleton untuk 'type' */}
        <div className="h-3 bg-gray-300 rounded w-1/4 ml-auto"></div>
        
        {/* Skeleton untuk 'title' */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-4/6"></div>
        </div>
        
        {/* Skeleton untuk 'department' */}
        <div className="h-6 bg-gray-400 rounded-full w-1/2 mt-1"></div>
      </div>
    </div>
  );
};

export default ProkerSideCardSkeleton;