'use client';
import Image from 'next/image';
import { useQuery } from '@apollo/client';
import { LIST_NEWS } from '@/graphql/queries/berita/beritaQueries';
import BeritaCard from '@/components/berita/BeritaCard';

import BeritaDetailPanel from '@/components/berita/BeritaDetailSlide';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRef, useState, useMemo, useEffect } from 'react';
import { Swiper as SwiperClass } from 'swiper/types';
import ArrowLeft from '@/assets/berita/icons/arrowleftswiper-icon.svg';
import ArrowRight from '@/assets/berita/icons/arrowrightswiper-icon.svg';

import 'swiper/css';

interface NewsItem {
  id: string;
  title: string;
  content: string;
  publishedAt?: string;
  imageUrls?: string[];
  categoryName?: string;
}

export default function BeritaSwiperSection() {
  const { data, loading, error } = useQuery(LIST_NEWS);
  const [category, setCategory] = useState('Semua');
  const [search, setSearch] = useState('');
  const swiperRef = useRef<SwiperClass | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedNewsId, setSelectedNewsId] = useState<string | number | null>(null);
  const rawNewsList = data?.listNews?.news ?? [];

  const newsList = useMemo(() => {
    let filtered = [...rawNewsList];

    if (category !== 'Semua') {
      filtered = filtered.filter((item) => item.categoryName === category);
    }

    if (search.trim() !== '') {
      filtered = filtered.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()) || item.content.toLowerCase().includes(search.toLowerCase()));
    }

    return filtered;
  }, [rawNewsList, category, search]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    newsList.forEach((item: NewsItem) => {
      if (item.categoryName && item.categoryName.trim() !== '') set.add(item.categoryName);
    });
    return ['Semua', ...Array.from(set)];
  }, [newsList]);

  useEffect(() => {
    if (!selectedNewsId && newsList.length > 0) {
      setSelectedNewsId(newsList[0].id);
    }
    if (newsList.length === 0) {
      setSelectedNewsId(null);
    }
  }, [newsList, selectedNewsId]);

  if (loading) return <div className="text-center py-20 text-xl font-semibold">Loading...</div>;
  if (error) return <div className="text-center py-20 text-red-500">Error: {error.message}</div>;

  const progressPercent = newsList.length > 0 ? ((activeIndex + 4) / newsList.length) * 100 : 0;

  const goPrev = () => swiperRef.current?.slidePrev();
  const goNext = () => swiperRef.current?.slideNext();

  return (
    <section className="w-full flex flex-col min-h-screen pb-36">
      {/* Top Controls */}
      <div className="w-full max-w-[1450px] mx-auto flex flex-col md:flex-row md:justify-between md:items-center gap-5 md:gap-0 mb-12 px-6">
        {/* Dropdown kategori */}
        <div className="relative w-full md:w-auto max-w-[340px]">
          <select
            className="appearance-none border-2 border-blue-500 rounded-2xl px-8 py-4 text-lg text-blue-700 font-semibold bg-white focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all w-full"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-8 top-1/2 -translate-y-1/2 text-blue-500 text-xl">▼</span>
        </div>
        {/* Search box */}
        <div className="relative w-full md:w-auto max-w-[400px]">
          <input
            type="text"
            className="border-2 border-blue-500 rounded-2xl px-8 py-4 text-lg w-full text-blue-700 font-medium focus:outline-none focus:ring-4 focus:ring-blue-300 pr-12 transition-all"
            placeholder="Cari berita..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="absolute right-8 top-1/2 -translate-y-1/2 text-blue-500 text-xl">
            <svg width={28} height={28} fill="none" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth={2} />
              <path d="M21 21L17 17" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
            </svg>
          </span>
        </div>
      </div>

      {/* Carousel Cards */}
      <div className="w-full bg-transparent flex">
        <div className="flex-1 max-w-[1560px] mx-0 pl-8 pr-6">
          <Swiper
            slidesPerView={3} // empat card langsung
            slidesPerGroup={1} // bergerak satu-satu
            spaceBetween={20} // gap antar card (bisa ubah sesuai kebutuhan)
            loop={newsList.length > 4}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            className="w-full"
            allowTouchMove={true}
          >
            {newsList.length === 0 ? (
              <SwiperSlide>
                <div className="text-center text-gray-400 py-20 text-xl">Tidak ada berita ditemukan.</div>
              </SwiperSlide>
            ) : (
              newsList.map((news: NewsItem, idx: number) => (
                <SwiperSlide key={news.id}>
                  <BeritaCard
                    key={news.id}
                    title={news.title}
                    date={news.publishedAt ? new Date(news.publishedAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}
                    description={news.content}
                    color={idx % 2 === 0 ? 'orange' : 'blue'}
                    imageUrl={news.imageUrls?.[0]}
                    maxWords={25}
                    onClick={() => setSelectedNewsId(news.id)}
                  />
                </SwiperSlide>
              ))
            )}
          </Swiper>
          {/* Progress bar & arrows */}
          <div className="flex items-center mt-20 mb-16 justify-start pl-2 gap-2">
            <button
              onClick={goPrev}
              disabled={activeIndex === 0}
              className={`rounded-full p-2 text-3xl  transition ${activeIndex === 0 ? 'text-blue-200 cursor-not-allowed' : 'text-blue-700 bg-white hover:bg-blue-50'}`}
              aria-label="Previous"
            >
              <Image src={ArrowLeft} alt="Sebelumnya" width={36} height={36} />
            </button>
            <button
              onClick={goNext}
              disabled={activeIndex >= newsList.length - 4}
              className={`rounded-full p-2 text-3xl ml-1  transition ${activeIndex >= newsList.length - 4 ? 'text-blue-200 cursor-not-allowed' : 'text-blue-700 bg-white hover:bg-blue-50'}`}
              aria-label="Next"
            >
              <Image src={ArrowRight} alt="Setelah" width={36} height={36} />
            </button>
            <div className="w-[420px] h-4 ml-6 rounded-full bg-blue-100 overflow-hidden relative">
              <div className="h-full bg-blue-400 transition-all duration-300" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Detail panel */}
      <div className="w-full flex justify-center mt-0">{selectedNewsId && <BeritaDetailPanel newsId={selectedNewsId} />}</div>
    </section>
  );
}
