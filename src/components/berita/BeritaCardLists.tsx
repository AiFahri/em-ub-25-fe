'use client';
import Image from "next/image";
import { useQuery } from "@apollo/client";
import { LIST_NEWS } from "@/graphql/queries/berita/beritaQueries";
import BeritaCard from "@/components/berita/BeritaCard";
import { useState, useMemo, useEffect, useRef } from "react";
import ArrowLeft from '@/assets/berita/icons/arrowleftswiper-icon.svg';
import ArrowRight from '@/assets/berita/icons/arrowrightswiper-icon.svg';
import arrowTop from '@/assets/berita/icons/arrowTop.svg';
import { useBreakpoint } from '@/hooks/useBreakpoints';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

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

  // Refs untuk animasi
  const sectionRef = useRef<HTMLElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);

  const isTablet = useBreakpoint('md');
  const isMobile = useBreakpoint('sm');

  const [currentPage, setCurrentPage] = useState(1);
  const [isPageChanging, setIsPageChanging] = useState(false);
  const ITEMS_PER_PAGE = isMobile ? 4 : isTablet ? 6 : 5;
  const CARDS_PER_ROW_DESKTOP = 3;
  
  const originalNewsList: NewsItem[] = useMemo(() => {
    return data?.listNews?.news ?? [];
  }, [data?.listNews?.news]);

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
  }, [filteredNews, currentPage, ITEMS_PER_PAGE]);

  const row1News = paginatedNews.slice(0, 3);
  const row2News = paginatedNews.slice(3, 5);

  // Fungsi untuk handle page change dengan animasi yang ultra smooth dan keren
  const handlePageChange = (newPage: number) => {
    if (newPage === currentPage || isPageChanging) return;
    
    setIsPageChanging(true);
    
    // Timeline master untuk koordinasi semua animasi
    const masterTL = gsap.timeline();
    
    // Animasi pagination buttons yang lebih simple
    const currentActiveButton = paginationRef.current?.querySelector(`[data-page="${currentPage}"]`) as HTMLElement;
    const newActiveButton = paginationRef.current?.querySelector(`[data-page="${newPage}"]`) as HTMLElement;
    
    if (currentActiveButton) {
      masterTL.to(currentActiveButton, {
        backgroundColor: "#E6EDFF",
        color: "#0062FF",
        duration: 0.3,
        ease: "power2.out"
      }, 0);
    }
    
    if (newActiveButton) {
      masterTL.to(newActiveButton, {
        backgroundColor: "#0062FF",
        color: "#ffffff",
        duration: 0.3,
        ease: "power2.out"
      }, 0);
    }
    
    // Enhanced card transition tanpa 3D effects
    const cards = cardsContainerRef.current?.querySelectorAll('.berita-card');
    if (cards) {
      const direction = newPage > currentPage ? 1 : -1;
      
      // Simple slide out
      masterTL.to(cards, {
        x: direction * -60,
        opacity: 0.3,
        duration: 0.4,
        ease: "power2.inOut",
        stagger: 0.08,
        onComplete: () => {
          setCurrentPage(newPage);
          
          // Simple slide in
          setTimeout(() => {
            const newCards = cardsContainerRef.current?.querySelectorAll('.berita-card');
            if (newCards) {
              gsap.fromTo(newCards, 
                {
                  x: direction * 60,
                  opacity: 0
                },
                {
                  x: 0,
                  opacity: 1,
                  duration: 0.5,
                  ease: "power2.out",
                  stagger: 0.1,
                  onComplete: () => {
                    setIsPageChanging(false);
                  }
                }
              );
            } else {
              setIsPageChanging(false);
            }
          }, 50);
        }
      }, 0);
    } else {
      setCurrentPage(newPage);
      setIsPageChanging(false);
    }
  };

  // Effect untuk re-animation dengan posisi yang benar
  useEffect(() => {
    if (!isPageChanging && paginatedNews.length > 0) {
      const cards = cardsContainerRef.current?.querySelectorAll('.berita-card');
      if (cards) {
        // Reset ke posisi normal terlebih dahulu
        cards.forEach((card) => {
          gsap.set(card, {
            x: 0,
            y: 0,
            opacity: 0.8
          });
        });
        
        // Simple re-entrance dari posisi normal
        gsap.fromTo(cards,
          {
            opacity: 0.8,
            scale: 0.98
          },
          {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: "power2.out",
            stagger: 0.05
          }
        );
      }
    }
  }, [paginatedNews, isPageChanging]);

  // Animasi GSAP dengan ScrollTrigger untuk ultra smooth appearance
  useEffect(() => {
    if (!data || loading) return;

    const ctx = gsap.context(() => {
      // Set initial state simple
      gsap.set(filtersRef.current, {
        opacity: 0,
        y: -20
      });
      
      gsap.set(cardsContainerRef.current, {
        opacity: 0
      });
      
      // Set initial state untuk cards dengan posisi berbeda yang lebih jauh
      const cards = cardsContainerRef.current?.querySelectorAll('.berita-card');
      if (cards) {
        cards.forEach((card, index) => {
          const direction = index % 4;
          let initX = 0, initY = 0;
          
          switch(direction) {
            case 0: // Start dari kiri
              initX = -80;
              initY = 0;
              break;
            case 1: // Start dari kanan
              initX = 80;
              initY = 0;
              break;
            case 2: // Start dari atas
              initX = 0;
              initY = -60;
              break;
            case 3: // Start dari bawah
              initX = 0;
              initY = 60;
              break;
          }
          
          gsap.set(card, {
            opacity: 0,
            x: initX,
            y: initY
          });
        });
      }
      
      gsap.set(paginationRef.current, {
        opacity: 1,
        y: 0,
        scale: 1
      });

      // ScrollTrigger untuk filters simple
      ScrollTrigger.create({
        trigger: filtersRef.current,
        start: "top 85%",
        end: "top 50%",
        scrub: 1,
        onUpdate: (self) => {
          gsap.to(filtersRef.current, {
            opacity: self.progress,
            y: -20 + (self.progress * 20),
            duration: 0.1
          });
        }
      });

      // ScrollTrigger untuk cards dengan arah berbeda-beda yang lebih smooth
      ScrollTrigger.create({
        trigger: cardsContainerRef.current,
        start: "top 75%",
        end: "top 25%",
        scrub: 1.5,
        onUpdate: (self) => {
          // Container simple reveal
          gsap.to(cardsContainerRef.current, {
            opacity: self.progress,
            duration: 0.1
          });

          // Individual cards dari arah berbeda dengan posisi akhir yang benar
          const cards = cardsContainerRef.current?.querySelectorAll('.berita-card');
          if (cards) {
            cards.forEach((card, index) => {
              const delay = index * 0.12;
              const adjustedProgress = Math.max(0, Math.min(1, (self.progress - delay) * 2));
              
              // Tentukan arah berdasarkan index card
              let startX = 0, startY = 0;
              const direction = index % 4; // 4 arah berbeda
              
              switch(direction) {
                case 0: // Dari kiri
                  startX = -80;
                  startY = 0;
                  break;
                case 1: // Dari kanan
                  startX = 80;
                  startY = 0;
                  break;
                case 2: // Dari atas
                  startX = 0;
                  startY = -60;
                  break;
                case 3: // Dari bawah
                  startX = 0;
                  startY = 60;
                  break;
              }
              
              // Smooth easing untuk movement
              const easedProgress = adjustedProgress < 0.5 
                ? 2 * adjustedProgress * adjustedProgress 
                : 1 - Math.pow(-2 * adjustedProgress + 2, 3) / 2;
              
              gsap.to(card, {
                opacity: adjustedProgress,
                x: startX * (1 - easedProgress), // Bergerak dari startX ke 0
                y: startY * (1 - easedProgress), // Bergerak dari startY ke 0
                duration: 0.1
              });
            });
          }
        }
      });

      // ScrollTrigger untuk pagination - simple static appearance
      if (totalPages > 1) {
        gsap.set(paginationRef.current, {
          opacity: 1,
          y: 0,
          scale: 1
        });
      }

    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [data, loading, totalPages]);

  useEffect(() => {
    setCurrentPage(1);
  }, [category, search]);

  // Simple hover effects untuk cards
  useEffect(() => {
    if (!data || loading) return;

    const cards = cardsContainerRef.current?.querySelectorAll('.berita-card');
    
    cards?.forEach((card) => {
      const cardElement = card as HTMLElement;
      
      // Mouse enter effect
      const handleMouseEnter = () => {
        gsap.to(cardElement, {
          y: -4,
          duration: 0.2,
          ease: "power2.out"
        });
      };
      
      // Mouse leave effect  
      const handleMouseLeave = () => {
        gsap.to(cardElement, {
          y: 0,
          duration: 0.2,
          ease: "power2.out"
        });
      };
      
      cardElement.addEventListener('mouseenter', handleMouseEnter);
      cardElement.addEventListener('mouseleave', handleMouseLeave);
      
      return () => {
        cardElement.removeEventListener('mouseenter', handleMouseEnter);
        cardElement.removeEventListener('mouseleave', handleMouseLeave);
      };
    });
  }, [data, loading, paginatedNews]);

  if (loading) return <div className="text-center py-20 text-xl font-semibold">Loading...</div>;
  if (error) return <div className="text-center py-20 text-red-500">Error: {error.message}</div>;

  return (
    <section ref={sectionRef} className="w-full z-0 flex flex-col min-h-screen pb-20 md:pb-36 mt-[-5vw] md:mt-[-10vw]">
      <div ref={filtersRef} className="w-full max-w-[1450px] mx-auto flex flex-col md:flex-row md:justify-between md:items-center gap-5 md:gap-0 mb-8 md:mb-12 px-4 md:px-6">
        <div className="relative w-full md:w-[30vw] lg:w-[20vw]">
          <select
            className="appearance-none border-2 border-[#0538B9] rounded-2xl px-4 py-3 md:py-4 text-base md:text-lg text-[#0538B9] font-semibold cursor-pointer outline-none focus:ring-2 focus:ring-blue-300 transition-all w-full"
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            {categories.map((cat) => (<option key={cat} value={cat}>{cat}</option>))}
          </select>
          <Image src={arrowTop} alt="arrowTop" className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
        <div className="relative w-full md:w-[35vw] lg:w-[25vw]">
          <input
            type="text"
            className="border-2 border-[#0538B9] outline-none rounded-2xl px-4 py-3 md:py-4 text-base md:text-lg w-full text-[#0538B9] font-medium pr-16 transition-all focus:ring-2 focus:ring-blue-300"
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

      <div ref={cardsContainerRef} className="flex-1 w-full mx-auto px-4 md:px-8 text-justify">
        {filteredNews.length === 0 ? (
          <div className="text-center text-gray-400 py-20 text-lg md:text-xl">Tidak ada berita ditemukan.</div>
        ) : (
          isMobile ? (
            <div className="grid grid-cols-1 gap-4 md:gap-6">
              {paginatedNews.map((news, idx) => (
                <Link key={news.id} href={`/berita/${news.slug}`} legacyBehavior>
                  <a className="berita-card block transform-gpu"><BeritaCard title={news.title} date={news.publishedAt ? new Date(news.publishedAt).toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" }) : ""} description={news.content} color={idx % 2 === 0 ? "orange" : "blue"} imageUrl={news.imageUrls?.[0]} /></a>
                </Link>
              ))}
            </div>
          ) : isTablet ? (
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {paginatedNews.map((news, idx) => (
                <Link key={news.id} href={`/berita/${news.slug}`} legacyBehavior>
                  <a className="berita-card block transform-gpu"><BeritaCard title={news.title} date={news.publishedAt ? new Date(news.publishedAt).toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" }) : ""} description={news.content} color={idx % 2 === 0 ? "orange" : "blue"} imageUrl={news.imageUrls?.[0]} /></a>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-8">
              <div className="flex justify-center gap-8 ">
                {row1News.map((news, idx) => (
                  <div key={news.id} className="sm:w-full md:2/4 berita-card transform-gpu">
                    <Link href={`/berita/${news.slug}`} legacyBehavior>
                      <a><BeritaCard title={news.title} date={news.publishedAt ? new Date(news.publishedAt).toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" }) : ""} description={news.content} color={idx % 2 === 0 ? "orange" : "blue"} imageUrl={news.imageUrls?.[0]} /></a>
                    </Link>
                  </div>
                ))}
              </div>
              {row2News.length > 0 && (
                <div className="flex justify-center gap-8 mb-8 "  >
                  {row2News.map((news, idx) => (
                    <div key={news.id} className="w-1/3 berita-card transform-gpu">
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
        <div ref={paginationRef} className="flex items-center justify-center mt-12 md:mt-20 z-40 gap-2 sm:gap-4 px-4">
          <button
            onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1 || isPageChanging}
            className="border-2 border-[#0538B9] rounded-full cursor-pointer transition disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous Page"
          >
            <Image src={ArrowLeft} alt="Sebelumnya" className="w-10 h-10 md:w-12 md:h-12 p-2 md:p-3" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
            <button
              key={pageNumber}
              data-page={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              disabled={isPageChanging}
              className={`w-8 h-8 md:w-10 md:h-10 rounded-full text-sm md:text-lg font-semibold transition cursor-pointer disabled:cursor-not-allowed ${currentPage === pageNumber
                  ? 'bg-[#0062FF] text-white shadow-lg'
                  : 'bg-[#E6EDFF] text-[#0062FF] hover:bg-blue-100 border-2 border-[#BACEFF]'
                }`}
            >
              {pageNumber}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages || isPageChanging}
            className="border-2 border-[#0538B9] rounded-full transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next Page"
          >
            <Image src={ArrowRight} alt="Selanjutnya" className="w-10 h-10 md:w-12 md:h-12 p-2 md:p-3" />
          </button>
        </div>
      )}
    </section>
  );
}