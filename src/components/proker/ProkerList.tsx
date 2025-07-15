'use client';

import React, { useState } from 'react';
import ProkerCardMain from './ProkerCardMain';
import { useQuery } from '@apollo/client';
import { LIST_WORK_PROGRAMS } from '@/graphql/queries/proker/prokerQueries';
import ProkerCardSkeleton from './ProkerCardSkeleton';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';

export interface WorkProgramItem {
  id: string;
  slug: string;
  title: string;
  ministryName: string;
  isMegaBesar: boolean;
  hasForm?: boolean;
  imageUrls?: string[];
}

const ITEMS_PER_PAGE = 6;
const IMAGE_BASE_URL = 'https://is3.cloudhost.id/emub/';

const ProkerList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const router = useRouter();
  const searchParams = useSearchParams();
  const kategoriParam = searchParams.get('kategori') as 'all' | 'open' | 'mega' | null;
  const [filter, setFilter] = useState<'all' | 'open' | 'mega'>(kategoriParam || 'all');
  const searchQueryParam = searchParams.get('cari') || '';
  const [inputValue, setInputValue] = useState(searchQueryParam);
  const [searchQuery, setSearchQuery] = useState(searchQueryParam);
  const { data, loading, error } = useQuery(LIST_WORK_PROGRAMS, {
    variables: {
      input: {
        keyword: searchQuery.trim(),
        hasOpenRecruitment: filter === 'open' ? true : undefined,
        isMegaBesar: filter === 'mega' ? true : undefined,
        orderBy: 'ID_DESC',
      },
    },
  });

  const workPrograms: WorkProgramItem[] = data?.listWorkPrograms?.workPrograms || [];

  const handleSearch = () => {
    const newParams = new URLSearchParams(searchParams);
    const trimmed = inputValue.trim();

    if (trimmed === '') {
      newParams.delete('cari');
    } else {
      newParams.set('cari', trimmed);
    }

    router.push(`?${newParams.toString()}`, { scroll: false });

    setSearchQuery(trimmed);
    setCurrentPage(1);
  };

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
    <section
      id="proker-list"
      className="
                relative w-full min-h-screen bg-gradient-to-b from-white via-blue-100 to-[#C2D4FF]
                before:content-[''] before:absolute before:inset-0
                before:bg-[url('/Assets/background/grid/bg-grid.svg')]
                before:bg-repeat before:z-0
            "
    >
      <div className="relative z-10 px-4 md:px-10 lg:px-20 py-20 md:py-24">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8 max-w-7xl mx-auto">
          <div className="relative w-full sm:w-auto">
            <select
              value={filter}
              onChange={(e) => {
                const selected = e.target.value as 'all' | 'open' | 'mega';
                setFilter(selected);
                setCurrentPage(1);

                const newParams = new URLSearchParams(searchParams);
                if (selected === 'all') {
                  newParams.delete('kategori');
                } else {
                  newParams.set('kategori', selected);
                }
                router.replace(`?${newParams.toString()}`, { scroll: false });
              }}
              className="appearance-none w-full sm:w-[240px] px-6 py-4 rounded-2xl text-[#0538B9] border-2 focus:outline-none border-[#0538B9] bg-white text-xl font-bold transition-all"
            >
              <option value="all">Semua</option>
              <option value="open">Open Recruitment</option>
              <option value="mega">Mega Besar</option>
            </select>

            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-5">
              <Image src="/Assets/icon/dropdown-icon.svg" alt="Chevron Down Icon" width={14} height={14} />
            </div>
          </div>

          <div className="flex items-center w-full sm:w-auto md:w-auto gap-3">
            <input
              type="text"
              placeholder="Search"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
              className="w-full md:w-[350px] px-6 py-4 text-[#0538B9] text-xl font-bold bg-white focus:outline-none border-2 border-[#0538B9] rounded-2xl"
            />

            <button onClick={handleSearch} className="flex-shrink-0 flex items-center justify-center p-4 text-white transition-colors rounded-2xl border-2 border-[#0538B9]">
              <Image src="/Assets/icon/search-icon.svg" alt="Search Icon" width={24} height={24} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16 max-w-7xl mx-auto min-h-[50vh]">
          {loading && Array.from({ length: 6 }).map((_, idx) => <ProkerCardSkeleton key={idx} />)}
          {error && <p className="col-span-3 text-center text-red-500">Terjadi kesalahan: {error.message}</p>}
          {!loading &&
            !error &&
            currentItems.map((proker: WorkProgramItem, idx: number) => (
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

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              aria-label="Halaman Sebelumnya"
              className="
      w-18 h-18 rounded-full 
      bg-[url('/Assets/icon/left-arrow-icon.svg')] 
      bg-cover bg-center 
      transition-transform hover:scale-110
      disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100
    "
            ></button>

            <div className="flex gap-3">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button key={page} onClick={() => setCurrentPage(page)} className={cn('w-4 h-4 rounded-full transition-all duration-200', currentPage === page ? 'bg-blue-600 shadow-md' : 'bg-blue-300 hover:bg-blue-400')} />
              ))}
            </div>

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              aria-label="Halaman Berikutnya"
              className="
      w-18 h-18 rounded-full 
      bg-[url('/Assets/icon/right-arrow-icon.svg')] 
      bg-cover bg-center 
      transition-transform hover:scale-110
      disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100
    "
            ></button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProkerList;