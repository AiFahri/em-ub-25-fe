// src/components/proker/ProkerDetailSkeleton.tsx

import React from 'react';
import ProkerSideCardSkeleton from './ProkerSideCardSkeleton'; // Impor skeleton card

const ProkerDetailSkeleton: React.FC = () => {
  return (
    <main className="w-full min-h-screen bg-gradient-to-r from-white via-white to-[#E3F1FF]">
      <div className="relative z-10 animate-pulse">
        <header className="pt-24 pb-16 md:pt-32 md:pb-24 container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Skeleton untuk Judul Utama */}
          <div className="h-16 bg-gray-300 rounded-lg w-3/4 max-w-2xl mx-auto"></div>
        </header>

        <div className="mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-12 xl:gap-x-16 gap-y-12 items-start">
            
            {/* Skeleton untuk GAMBAR UTAMA */}
            <div className="lg:col-span-2 bg-gray-200/80 backdrop-blur-md rounded-[2.5rem] p-8 md:p-12 flex flex-col">
              <div className="w-full aspect-video bg-gray-300 rounded-3xl mb-12"></div>
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-gray-300 rounded-2xl"></div>
                <div className="h-8 bg-gray-300 rounded-lg w-1/3"></div>
              </div>
            </div>

            {/* Skeleton untuk MASKOT */}
            <div className="hidden lg:flex flex-col gap-8 items-center">
              <div className="relative w-full h-96 bg-gray-300 rounded-3xl"></div>
            </div>
            
            {/* Skeleton untuk DESKRIPSI */}
            <div className="lg:col-span-2 bg-gray-200/80 backdrop-blur-md p-8 md:p-12 rounded-3xl">
              <div className="space-y-3">
                <div className="h-4 bg-gray-300 rounded w-full"></div>
                <div className="h-4 bg-gray-300 rounded w-11/12"></div>
                <div className="h-4 bg-gray-300 rounded w-full"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                <div className="h-4 bg-gray-300 rounded w-full"></div>
                <div className="h-4 bg-gray-300 rounded w-10/12"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </div>
            </div>

            {/* Skeleton untuk DAFTAR PROKER LAIN */}
            <div className="hidden lg:flex flex-col gap-6 w-full max-w-sm mx-auto">
              {/* Tampilkan 5 buah skeleton card */}
              {[...Array(5)].map((_, i) => (
                <ProkerSideCardSkeleton key={i} />
              ))}
            </div>

          </div>
        </div>
      </div>
    </main>
  );
};

export default ProkerDetailSkeleton;