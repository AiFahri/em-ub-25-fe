// ProkerList.tsx
'use client';

import React, { useState } from 'react';
import ProkerCardMain from './ProkerCardMain';
import { ChevronLeft, ChevronRight, Search, ChevronDown } from 'lucide-react';
import { useQuery } from '@apollo/client';
import { LIST_WORK_PROGRAMS } from '@/graphql/queries/proker/prokerQueries'; 
import ProkerCardSkeleton from './ProkerCardSkeleton'; 
import { cn } from '@/lib/utils';
import Link from 'next/link'; 


const ITEMS_PER_PAGE = 6;
const IMAGE_BASE_URL = 'https://is3.cloudhost.id/em-ub-2025/';


const ProkerList: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);

  const { loading, error, data } = useQuery(LIST_WORK_PROGRAMS);



  const workPrograms = data?.listWorkPrograms?.workPrograms || [];
  const totalPages = Math.ceil(workPrograms.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = workPrograms.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <section className="relative w-full min-h-screen bg-gradient-to-b from-white via-blue-100 to-[#C2D4FF]">
     
      {/* Konten utama */}
      <div className="relative z-10 px-4 md:px-10 lg:px-20 py-20 md:py-24">
        {/* Filter & Search */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8 max-w-7xl mx-auto">
          {/* Dropdown */}
          <div className="relative w-full sm:w-auto">
            <select className="appearance-none w-full sm:w-[240px] px-6 py-4 rounded-xl border-2 border-gray-200 bg-white text-gray-800 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
              <option value="all">Semua</option>
              <option value="open">Open Recruitment</option>
              <option value="mega">Mega Besar</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-5 text-gray-500">
              <ChevronDown className="w-6 h-6" />
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex items-center w-full sm:w-auto md:w-[350px] rounded-xl border-2 border-gray-200 bg-white overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all">
            <input
              type="text"
              placeholder="Search Program Kerja..."
              className="w-full flex-grow px-6 py-4 bg-transparent text-gray-800 text-lg font-semibold focus:outline-none"
            />
            <button className="flex-shrink-0 flex items-center justify-center w-16 h-16 text-white bg-[#0047FF] hover:bg-blue-700 transition-colors">
              <Search className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Cards Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16 max-w-7xl mx-auto min-h-[50vh]">
          {loading && 
            Array.from({ length: 6 }).map((_, idx) => <ProkerCardSkeleton key={idx} />)
          }
          {error &&
            <p className="col-span-3 text-center text-red-500">Terjadi kesalahan: {error.message}</p>
          }
          
           {!loading && !error && currentItems.map((proker: any, idx: number) => (
                      
                        <Link href={`/proker/${proker.slug}`} key={proker.slug || idx} className="group">
                          
                                <ProkerCardMain
                                    title={proker.title}
                                    type={proker.isMegaBesar ? 'Mega Besar' : 'Open Recruitment'} 
                                    department={proker.ministryName}
                                    imageUrl={proker.imageUrls && proker.imageUrls.length > 0 ? `${IMAGE_BASE_URL}${proker.imageUrls[0]}` : undefined}
                                />
                           
                        </Link>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4">
            <button 
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-lg text-blue-600 transition-all duration-200 border border-blue-200 hover:border-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <div className="flex gap-3">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={cn(
                    'w-4 h-4 rounded-full transition-all duration-200',
                    currentPage === page 
                      ? 'bg-blue-600 shadow-md' 
                      : 'bg-blue-300 hover:bg-blue-400'
                  )}
                />
              ))}
            </div>

            <button 
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-lg text-blue-600 transition-all duration-200 border border-blue-200 hover:border-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProkerList;