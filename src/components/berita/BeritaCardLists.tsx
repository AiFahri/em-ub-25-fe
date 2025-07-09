'use client';
import Image from "next/image";
import { useQuery } from "@apollo/client";
import { LIST_NEWS } from "@/graphql/queries/berita/beritaQueries";
import BeritaCard from "@/components/berita/BeritaCard";
import BeritaDetailPanel from "@/components/berita/BeritaDetailSlide";
import { useState, useMemo, useEffect } from "react";
import ArrowLeft from '@/assets/berita/icons/arrowleftswiper-icon.svg';
import ArrowRight from '@/assets/berita/icons/arrowrightswiper-icon.svg';
import arrowTop from '@/assets/berita/icons/arrowTop.svg';
import { useBreakpoint } from '@/hooks/useBreakpoints';
import Link from 'next/link';

type NewsItem = {
  id: string | number;
  title: string;
  content: string;
  publishedAt: string;
  categoryName?: string;
  ministryName?: string;
  imageUrls?: string[];
  slug: string;
};

type ListNewsData = {
  listNews: {
    news: NewsItem[];
  };
};

export default function BeritaSection() {
  const { data, loading, error } = useQuery<ListNewsData>(LIST_NEWS);
  const [category, setCategory] = useState("Semua");
  const [search, setSearch] = useState("");

  const isTablet = useBreakpoint('md');
  const isMobile = useBreakpoint('sm');

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = isMobile ? 4 : isTablet ? 6 : 5;
  const CARDS_PER_ROW_DESKTOP = 3;
  const originalNewsList: NewsItem[] = data?.listNews?.news ?? [];

  const categories = useMemo(() => {
    const set = new Set<string>();
    originalNewsList.forEach((item) => {
      if (item.categoryName && item.categoryName.trim() !== "") set.add(item.categoryName);
    });
    return ["Semua", ...Array.from(set)];
  }, [originalNewsList]);

  const filteredNews = useMemo(() => {
    let news = originalNewsList;
    if (category !== "Semua") {
      news = news.filter((item) => item.categoryName === category);
    }
    if (search.trim() !== "") {
      news = news.filter(
        (item) =>
          item.title.toLowerCase().includes(search.toLowerCase()) ||
          item.content.toLowerCase().includes(search.toLowerCase())
      );
    }
    return news;
  }, [originalNewsList, category, search]);

  const totalPages = Math.ceil(filteredNews.length / ITEMS_PER_PAGE);

  const paginatedNews = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredNews.slice(startIndex, endIndex);
  }, [filteredNews, currentPage]);

  const row1News = paginatedNews.slice(0, 3);
  const row2News = paginatedNews.slice(3, 5);

  useEffect(() => {
    setCurrentPage(1);
  }, [category, search]);

  if (loading) return <div className="text-center py-20 text-xl font-semibold">Loading...</div>;
  if (error) return <div className="text-center py-20 text-red-500">Error: {error.message}</div>;

  return (
    <section className="w-full flex flex-col min-h-screen pb-36 mt-[-10vw]">
      <div className="w-full max-w-[1450px] mx-auto flex flex-col md:flex-row md:justify-between md:items-center gap-5 md:gap-0 mb-12 px-6">
        <div className="relative w-[40vw] md:w-[30vw] lg:w-[20vw]">
          <select
            className="appearance-none border-2 border-[#0538B9] rounded-2xl px-4 py-4 text-lg text-[#0538B9] font-semibold cursor-pointer outline-none focus:ring-2 focus:ring-blue-300 transition-all w-full"
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            {categories.map((cat) => (<option key={cat} value={cat}>{cat}</option>))}
          </select>
          <Image src={arrowTop} alt="arrowTop" className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
        <div className="relative w-[60vw] md:w-[35vw] lg:w-[25vw]">
          <input
            type="text"
            className="border-2 border-[#0538B9] outline-none rounded-2xl px-4 py-4 text-lg w-full text-[#0538B9] font-medium pr-16 transition-all focus:ring-2 focus:ring-blue-300"
            placeholder="Cari berita..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#0538B9] text-xl pointer-events-none">
            <svg width={28} height={28} fill="none" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth={2} />
              <path d="M21 21L17 17" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
            </svg>
          </span>
        </div>
      </div>

      <div className="flex-1 w-full  mx-auto px-8 text-justify">
        {filteredNews.length === 0 ? (
          <div className="text-center text-gray-400 py-20 text-xl ">Tidak ada berita ditemukan.</div>
        ) : (
          isMobile ? (
            <div className="grid grid-cols-1 gap-6">
              {paginatedNews.map((news, idx) => (
                <Link key={news.id} href={`/berita/${news.slug}`} legacyBehavior>
                  <a><BeritaCard title={news.title} date={news.publishedAt ? new Date(news.publishedAt).toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" }) : ""} description={news.content} color={idx % 2 === 0 ? "orange" : "blue"} imageUrl={news.imageUrls?.[0]} /></a>
                </Link>
              ))}
            </div>
          ) : isTablet ? (
            <div className="grid grid-cols-2 gap-6">
              {paginatedNews.map((news, idx) => (
                <Link key={news.id} href={`/berita/${news.slug}`} legacyBehavior>
                  <a><BeritaCard title={news.title} date={news.publishedAt ? new Date(news.publishedAt).toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" }) : ""} description={news.content} color={idx % 2 === 0 ? "orange" : "blue"} imageUrl={news.imageUrls?.[0]} /></a>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-8">
              <div className="flex justify-center gap-8 ">
                {row1News.map((news, idx) => (
                  <div key={news.id} className="sm:w-full md:2/4 ">
                    <Link href={`/berita/${news.slug}`} legacyBehavior>
                      <a><BeritaCard title={news.title} date={news.publishedAt ? new Date(news.publishedAt).toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" }) : ""} description={news.content} color={idx % 2 === 0 ? "orange" : "blue"} imageUrl={news.imageUrls?.[0]} /></a>
                    </Link>
                  </div>
                ))}
              </div>
              {row2News.length > 0 && (
                <div className="flex justify-center gap-8 mb-8 "  >
                  {row2News.map((news, idx) => (
                    <div key={news.id} className="w-1/3">
                      <Link href={`/berita/${news.slug}`} legacyBehavior>
                        <a><BeritaCard title={news.title} date={news.publishedAt ? new Date(news.publishedAt).toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" }) : ""} description={news.content} color={(idx + CARDS_PER_ROW_DESKTOP) % 2 === 0 ? "orange" : "blue"} imageUrl={news.imageUrls?.[0]} /></a>
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        )}
      </div>

      {totalPages >= 1 && (
        <div className="flex items-center justify-center mt-20  gap-2 sm:gap-4">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="border-2 border-[#0538B9] rounded-full transition disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous Page"
          >
            <Image src={ArrowLeft} alt="Sebelumnya" className="w-12 h-12 p-3" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
            <button
              key={pageNumber}
              onClick={() => setCurrentPage(pageNumber)}
              className={`w-10 h-10 rounded-full text-lg font-semibold transition cursor-pointer ${currentPage === pageNumber
                  ? 'bg-[#0062FF] text-white shadow-lg'
                  : 'bg-[#E6EDFF] text-[#0062FF] hover:bg-blue-100 border-2 border-[#BACEFF]'
                }`}
            >
              {pageNumber}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="border-2 border-[#0538B9] rounded-full transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next Page"
          >
            <Image src={ArrowRight} alt="Selanjutnya" className="w-12 h-12 p-3" />
          </button>
        </div>
      )}
    </section>
  );
}