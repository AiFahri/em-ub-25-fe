'use client';

import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_NEWS } from '@/graphql/mutations/berita/beritaMutations';
import Image from 'next/image';
import clsx from 'clsx';

// Limit konten
function limitWords(str: string, maxWords: number) {
  if (!str) return '';
  const words = str.split(/\s+/);
  if (words.length <= maxWords) return str;
  return words.slice(0, maxWords).join(' ') + '...';
}

type BeritaDetailPanelProps = {
  newsId: string | number;
};

const MAX_WORDS_PREVIEW = 45;

export default function BeritaDetailPanel({ newsId }: BeritaDetailPanelProps) {
  const { data, loading, error } = useQuery(GET_NEWS, {
    variables: { id: newsId },
    skip: !newsId,
  });

  const [expanded, setExpanded] = React.useState(false);
  const [imageIdx, setImageIdx] = React.useState(0);

  const news = data?.getNews;
  const images: string[] = Array.isArray(news?.imageUrls) ? news.imageUrls : [];
  const totalImages = images.length;
  const displayImage = images[imageIdx] ? `https://is3.cloudhost.id/emub/${images[imageIdx].replace(/^\/+/, '')}` : null;

  const showExpandBtn = news?.content && news.content.split(/\s+/).length > MAX_WORDS_PREVIEW;

  // Ubah idx gambar jika pindah berita
  React.useEffect(() => setImageIdx(0), [newsId]);

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-700"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex justify-center items-center py-20">
        <div className="text-red-600 text-xl font-semibold">Error loading news: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="relative w-full flex justify-center items-start z-10 px-4">
      <div className="relative w-full max-w-[1400px]">
        {/* Tab heading */}
        <div className="flex items-center mb-[-2px] ml-12 z-20"></div>

        {/* Main content container */}
        <div
          className={clsx('relative w-full   bg-gradient-to-br from-[#E8F1FF] to-[#D6E8FF] border-4 border-blue-700 px-16 py-16 flex flex-row gap-16 overflow-visible shadow-2xl')}
          style={{
            minHeight: expanded ? 700 : 550,
            borderRadius: '48px',
            transition: 'min-height 0.4s ease-in-out',
            boxShadow: '0 25px 50px -12px rgba(0, 62, 167, 0.25)',
          }}
        >
          {/* Left side: Navigation dots, content */}
          <div className="flex flex-row gap-8 flex-1">
            {/* Image navigation dots */}
            <div className="flex flex-col items-center justify-start pt-12 min-w-[60px]">
              {/* Up arrow */}
              <button
                className={clsx(
                  'rounded-full border-3 border-blue-700 w-12 h-12 flex items-center justify-center mb-6 transition-all duration-200 transform hover:scale-110',
                  imageIdx === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-blue-100 hover:shadow-lg active:scale-95'
                )}
                disabled={imageIdx === 0 || totalImages === 0}
                aria-label="Gambar sebelumnya"
                onClick={() => setImageIdx((i) => Math.max(i - 1, 0))}
              >
                <svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                  <path d="M7 14l5-5 5 5" stroke="#003ea7" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* Dot indicators */}
              <div className="flex flex-col gap-4">
                {(totalImages > 0 ? images : [null, null, null, null]).slice(0, 6).map((_, idx) => (
                  <button
                    key={idx}
                    className={clsx(
                      'w-6 h-6 rounded-full border-3 focus:outline-none transition-all duration-200 transform hover:scale-125',
                      idx === imageIdx ? 'bg-blue-700 border-blue-700 shadow-lg' : 'border-blue-700 bg-white hover:bg-blue-50'
                    )}
                    onClick={() => setImageIdx(idx)}
                    tabIndex={0}
                    aria-label={`Gambar ${idx + 1}`}
                    disabled={totalImages === 0}
                  />
                ))}
              </div>

              {/* Down arrow */}
              <button
                className={clsx(
                  'rounded-full border-3  border-blue-700 w-12 h-12 flex items-center justify-center mt-6 transition-all duration-200 transform hover:scale-110',
                  imageIdx === totalImages - 1 || totalImages === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-blue-100 hover:shadow-lg active:scale-95'
                )}
                disabled={imageIdx === totalImages - 1 || totalImages === 0}
                aria-label="Gambar selanjutnya"
                onClick={() => setImageIdx((i) => Math.min(i + 1, totalImages - 1))}
              >
                <svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                  <path d="M7 10l5 5 5-5" stroke="#003ea7" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            {/* Content area */}
            <div className="flex flex-col flex-1 min-w-[500px] max-w-[700px] pt-2">
              {/* Title */}
              <h1 className="text-6xl font-black text-blue-900 mb-4 leading-tight tracking-tight">{news?.title || 'Loading...'}</h1>

              {/* Meta information */}
              <div className="text-blue-700 text-xl font-semibold mb-6 flex flex-wrap items-center gap-2">
                <span>
                  {news?.publishedAt
                    ? new Date(news.publishedAt).toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })
                    : 'Tanggal tidak tersedia'}
                </span>
                {news?.categoryName && (
                  <>
                    <span className="text-blue-500">•</span>
                    <span>{news.categoryName}</span>
                  </>
                )}
                {news?.status && (
                  <>
                    <span className="text-blue-500">•</span>
                    <span>{news.status}</span>
                  </>
                )}
              </div>

              {/* Ministry badge */}
              {news?.ministryName && (
                <div className="mb-8">
                  <span className="inline-block border-3 border-blue-700 bg-white text-blue-900 px-8 py-3 rounded-2xl font-bold text-xl shadow-lg">{news.ministryName}</span>
                </div>
              )}

              {/* Content */}
              <div
                className="text-2xl text-blue-800 font-medium leading-relaxed whitespace-pre-line transition-all duration-400"
                style={{
                  maxHeight: expanded ? 'none' : 140,
                  overflow: expanded ? 'visible' : 'hidden',
                }}
              >
                {news?.content ? expanded ? news.content : limitWords(news.content, MAX_WORDS_PREVIEW) : <span className="italic text-blue-400">Belum ada isi berita.</span>}
              </div>

              {/* Preview button */}
              <div className="flex items-center gap-3 mt-10">
                <button className="flex items-center gap-3 text-blue-700 hover:text-blue-900 text-2xl font-bold transition-all duration-200 hover:scale-105">
                  <div className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-900 transition-colors">
                    <svg width={24} height={24} fill="white" viewBox="0 0 24 24">
                      <polygon points="8,5 19,12 8,19" />
                    </svg>
                  </div>
                  Lihat Preview
                </button>
              </div>
            </div>
          </div>

          {/* Right side: Image display */}
          <div className="flex flex-col items-center justify-start pt-8 min-w-[500px] max-w-[550px] flex-shrink-0 relative">
            <div className="bg-white rounded-[48px] w-full h-[350px] flex items-center justify-center border-4 border-blue-200 overflow-hidden shadow-2xl relative">
              {displayImage ? (
                <Image src={displayImage} alt={news?.title || 'Preview'} fill className="object-cover" style={{ borderRadius: 40 }} />
              ) : (
                <div className="flex flex-col items-center justify-center text-blue-300">
                  <svg width={120} height={120} fill="none" viewBox="0 0 48 48">
                    <rect x="6" y="10" width="36" height="28" rx="6" fill="#E8F1FF" stroke="#D6E8FF" strokeWidth="2" />
                    <path d="M19 24L24 29L31 21" stroke="#A5B8D8" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="17" cy="18" r={3} fill="#A5B8D8" />
                  </svg>
                  <p className="mt-4 text-xl font-semibold">Tidak ada gambar</p>
                </div>
              )}
            </div>

            {/* Scroll indicator */}
            <div className="absolute right-[-40px] top-12 h-[70%] w-4 flex flex-col justify-center items-center">
              <div className="w-3 h-full bg-blue-200 rounded-full relative shadow-inner">
                <div
                  className="absolute left-1/2 transform -translate-x-1/2 w-3 bg-blue-700 rounded-full shadow-lg transition-all duration-300"
                  style={{
                    height: '30%',
                    top: expanded ? '60%' : '20%',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Expand button - positioned outside bottom right */}
          {showExpandBtn && (
            <div className="absolute  right-20 bottom-[-36px] z-30">
              <button
                className="inverted-radius-bottom-right  relative group overflow-hidden shadow-2xl"
                style={{
                  width: 180,
                  height: 180,
                  background: 'linear-gradient(130deg,#0057ff 80%,#1977f3 100%)',
                  border: 'none',
                  boxShadow: '8px 8px 0px 0px #D6E8FF, 0 20px 50px -12px rgba(0, 62, 167, 0.25)',
                  padding: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                }}
                onClick={() => setExpanded((e) => !e)}
              >
                {/* --- Slot untuk bg/ornamen SVG di dalam tombol (atau pakai div kosong untuk custom) --- */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                  {/* Silakan ganti SVG berikut dengan SVG/ornamen sendiri */}
                  <svg width="190" height="190" viewBox="0 0 190 190" fill="none" className="w-full h-full absolute inset-0">
                    <circle cx="55" cy="140" r="40" stroke="#8DC0FF" strokeWidth="9" fill="none" />
                    <circle cx="145" cy="50" r="36" stroke="#5AA2FF" strokeWidth="8" fill="none" />
                  </svg>
                </div>
                {/* --- Teks --- */}
                <span className="relative z-10 px-7 pt-8 pb-2 block text-white text-3xl font-bold leading-tight text-left" style={{ textShadow: '0 2px 12px #0057ff88' }}>
                  {expanded ? 'Tutup' : 'Lebih\nLengkap'}
                </span>
                {/* --- Icon Arrow Down --- */}
              </button>
              <span className="absolute right-4 bottom-4 z-10">
                <span
                  className="bg-white rounded-[20px] px-4 py-2 flex items-center justify-center shadow-md border-2 border-blue-500"
                  style={{
                    boxShadow: '2px 2px 6px #0002',
                  }}
                >
                  <svg width={32} height={32} viewBox="0 0 24 24" fill="none">
                    <path d="M7 10l5 5 5-5" stroke="#0057ff" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
