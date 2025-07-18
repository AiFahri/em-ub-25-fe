'use client';

import React, { useRef, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_NEWS_BY_SLUG, LIST_NEWS } from '@/graphql/queries/berita/beritaQueries';
import Image from 'next/image';
import BeritaHero from '@/components/berita/BeritaHero';
import BeritaCardSide from '@/components/berita/BeritaCardSide';
import subpageBg from '@/assets/berita/background/subpageBg.svg';
import detailBerita from '@/assets/berita/icons/detail-berita.svg';
import detailBeritaArrow from '@/assets/berita/images/detail-berita-arrow.svg';
import ornamentArrowLeft from '@/assets/berita/icons/arrow-ornament-left.svg';
import ornamentArrowRight from '@/assets/berita/icons/arrow-ornament-right.svg';
import ornamentBgSubpage from '@/assets/berita/background/ornament-bg-subpage.svg';
import ornament from '@/assets/berita/images/ornament.svg';
import clsx from 'clsx';
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
  imageUrls?: string[];
  ministryName?: string;
  slug: string;
};

type GetNewsData = {
  getNewsBySlug: NewsItem;
};

type ListNewsData = {
  listNews: {
    news: NewsItem[];
  };
};

type BeritaDetailPageProps = {
  slug: string;
};

export default function BeritaDetailPage({ slug }: BeritaDetailPageProps) {
  const { data: listData } = useQuery<ListNewsData>(LIST_NEWS);

  const {
    data: detailData,
    loading,
    error,
  } = useQuery<GetNewsData>(GET_NEWS_BY_SLUG, {
    variables: { slug: slug },
    skip: !slug,
  });

  const [imageIdx, setImageIdx] = React.useState(0);
  const news = detailData?.getNewsBySlug;

  // Refs untuk animasi
  const mainRef = useRef<HTMLElement>(null);
  const ornamentLineRef = useRef<HTMLDivElement>(null);
  const detailHeaderRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLImageElement>(null);
  const contentSectionRef = useRef<HTMLDivElement>(null);
  const imageControlsRef = useRef<HTMLDivElement>(null);
  const imageDisplayRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const contentTextRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const ornamentDecoRef = useRef<HTMLImageElement>(null);

  const otherNews = React.useMemo(() => {
    if (!listData?.listNews?.news || !news) return [];
    return listData.listNews.news.filter((item: NewsItem) => item.id !== news.id).slice(0, 5);
  }, [listData, news]);

  const images: string[] = Array.isArray(news?.imageUrls) ? news.imageUrls : [];
  const totalImages = images.length;

  const displayImage = images[imageIdx] ? `https://is3.cloudhost.id/emub/${images[imageIdx].replace(/^\/+/, '')}` : null;

  React.useEffect(() => {
    setImageIdx(0);
  }, [slug]);

  // GSAP Animations dengan ScrollTrigger
  useEffect(() => {
    if (!news || loading) return;

    const ctx = gsap.context(() => {
      // Set initial state untuk content elements - invisible dari awal
      gsap.set([imageControlsRef.current, imageDisplayRef.current, titleRef.current, contentTextRef.current], {
        opacity: 0,
        y: 50,
      });

      // Set initial state untuk detail header - invisible dari awal
      gsap.set(detailHeaderRef.current, {
        x: -200,
        opacity: 0,
        scale: 0.9,
      });

      if (metaRef.current) {
        gsap.set(metaRef.current.children, { opacity: 0, y: 30 });
      }

      // Animasi awal - ornament line slide in
      gsap.fromTo(
        ornamentLineRef.current,
        {
          scaleX: 0,
          opacity: 0,
        },
        {
          scaleX: 1,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          delay: 0.3,
        }
      );

      // Background parallax effect
      ScrollTrigger.create({
        trigger: backgroundRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          if (backgroundRef.current) {
            gsap.to(backgroundRef.current, {
              y: self.progress * 50,
              duration: 0.1,
            });
          }
        },
      });

      // Ornament line reveal animation
      ScrollTrigger.create({
        trigger: ornamentLineRef.current,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          const lineElements = ornamentLineRef.current?.querySelectorAll('img, div');
          if (lineElements) {
            gsap.fromTo(
              lineElements,
              {
                x: -50,
                opacity: 1,
                scale: 0.8,
              },
              {
                x: 0,
                opacity: 1,
                scale: 1,
                duration: 5,
                stagger: 1.5,
                ease: 'power2.out',
              }
            );
          }
        },
      });

      // Detail header reveal animation dengan scroll trigger
      ScrollTrigger.create({
        trigger: detailHeaderRef.current,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          // Main detail header slide dari kiri
          gsap.fromTo(
            detailHeaderRef.current,
            {
              x: -200,
              opacity: 0,
              scale: 0.9,
            },
            {
              x: 0,
              opacity: 1,
              scale: 1,
              duration: 1.2,
              ease: 'power3.out',
            }
          );

          // Individual elements stagger animation
          const headerElements = detailHeaderRef.current?.querySelectorAll('img, p');
          if (headerElements) {
            gsap.fromTo(
              headerElements,
              {
                x: -30,
                opacity: 0,
                rotationY: -15,
              },
              {
                x: 0,
                opacity: 1,
                rotationY: 0,
                duration: 0.7,
                stagger: 0.15,
                ease: 'power3.out',
                delay: 0.3,
              }
            );
          }
        },
      });

      // Content section reveal dengan scroll trigger gradual
      ScrollTrigger.create({
        trigger: contentSectionRef.current,
        start: 'top 85%',
        end: 'top 30%',
        scrub: 1,
        onUpdate: (self) => {
          // Image controls muncul pelan-pelan
          if (imageControlsRef.current) {
            gsap.to(imageControlsRef.current, {
              opacity: self.progress,
              y: 50 - self.progress * 50,
              scale: 0.8 + self.progress * 0.2,
              duration: 0.1,
            });
          }

          // Image display dengan parallax fade
          if (imageDisplayRef.current) {
            gsap.to(imageDisplayRef.current, {
              opacity: self.progress,
              y: 30 - self.progress * 30,
              scale: 0.95 + self.progress * 0.05,
              duration: 0.1,
            });
          }

          // Title dengan progressive reveal
          if (titleRef.current) {
            gsap.to(titleRef.current, {
              opacity: Math.max(0, (self.progress - 0.2) * 1.25),
              y: 40 - (self.progress - 0.2) * 50,
              duration: 0.1,
            });
          }

          // Meta info dengan delayed reveal
          if (metaRef.current) {
            const metaElements = metaRef.current.children;
            Array.from(metaElements).forEach((element, index) => {
              const delay = index * 0.1;
              const adjustedProgress = Math.max(0, (self.progress - 0.4 - delay) * 1.5);
              gsap.to(element, {
                opacity: adjustedProgress,
                y: 30 - adjustedProgress * 30,
                duration: 0.1,
              });
            });
          }
        },
      });

      // Content text reveal dengan smooth scroll trigger
      ScrollTrigger.create({
        trigger: contentTextRef.current,
        start: 'top 90%',
        end: 'top 50%',
        scrub: 1.5,
        onUpdate: (self) => {
          gsap.to(contentTextRef.current, {
            opacity: self.progress,
            y: 40 - self.progress * 40,
            skewY: 2 - self.progress * 2,
            duration: 0.1,
          });
        },
      });

      // Sidebar cards reveal dengan wave effect
      ScrollTrigger.create({
        trigger: sidebarRef.current,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          const sidebarCards = sidebarRef.current?.querySelectorAll('a');
          if (sidebarCards) {
            gsap.fromTo(
              sidebarCards,
              {
                x: 60,
                opacity: 0,
                scale: 0.95,
              },
              {
                x: 0,
                opacity: 1,
                scale: 1,
                duration: 0.7,
                stagger: 0.1,
                ease: 'power2.out',
              }
            );
          }
        },
      });

      // Ornament decoration continuous rotation dengan scroll
      ScrollTrigger.create({
        trigger: ornamentDecoRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 2,
        onUpdate: (self) => {
          if (ornamentDecoRef.current) {
            gsap.to(ornamentDecoRef.current, {
              rotation: self.progress * 360,
              scale: 1 + self.progress * 0.1,
              duration: 0.1,
            });
          }
        },
      });
    }, mainRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [news, loading]);

  React.useEffect(() => {
    console.log('Current slug:', slug);
    console.log('GraphQL Variables:', { slug: slug });
    if (error) {
      console.error('GraphQL Error:', error);
    }
  }, [slug, error]);

  if (!slug) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  if (loading)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-700"></div>
      </div>
    );

  if (error) {
    console.error('GraphQL Error:', error);
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div className="text-red-600 text-xl font-semibold">
          Error: {error.message}
          <br />
          <small>Slug: {slug}</small>
        </div>
      </div>
    );
  }

  if (!news)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div className="text-xl font-semibold">Berita tidak ditemukan.</div>
      </div>
    );

  return (
    <main ref={mainRef}>
      <BeritaHero />
      <div className="flex flex-col relative mt-[-12vw] md:mt-[-5vw] overflow-hidden">
        <div ref={ornamentLineRef} className="flex flex-row items-center px-[2vw] sm:w-[70%] w-full gap-x-[1vw]">
          <Image src={ornamentArrowLeft} alt="ornament arrow left" className="w-[2vw]" />
          <Image src={ornamentArrowRight} alt="ornament arrow right" className="w-[2vw] " />
          <div className="w-full bg-[#7CA1FF] rounded-full h-[0.5vw]" />
        </div>

        <div className="relative w-full px-[2vw] flex sm:flex-row gap-[2vw] justify-center mb-[10vw] mt-[3vw]">
          <Image ref={backgroundRef} src={subpageBg} alt="Background" className="h-[50%] sm:w-[70%] w-full" />
          <div ref={detailHeaderRef} className="flex flex-row items-center absolute top-[2vw] left-0 gap-x-[0.5vw] px-[2vw]">
            <Image src={detailBerita} alt="detail berita" className="w-[2.5vw]" />
            <p className="text-[#0538B9] text-[2vw] tracking-tight">Detail Berita</p>
            <Image src={detailBeritaArrow} alt="detail berita" className="sm:w-[6.5vw] w-[14vw]" />
          </div>
          <Image src={ornamentBgSubpage} alt="bg ornament subpage" className="absolute  bottom-0 -z-10" />

          <div ref={contentSectionRef} className="w-[100%] sm:w-[80%] absolute  top-[8%] left-[3%]  ">
            <Image ref={ornamentDecoRef} src={ornament} alt="ornament" className="absolute bottom-[1%] right-[10%] w-[20%] -z-10" />
            <div className="sm:w-[75%] w-[90%] px-[2vw]  sm:px-0">
              <div className="flex flex-col md:flex-row items-center md:items-start  md:gap-12 ">
                {totalImages > 0 && (
                  <div ref={imageControlsRef} className="flex flex-row md:flex-col items-center  sm:mt-0 md:mt-[5vw] justify-center gap-4 md:gap-6 order-2 ">
                    <button
                      onClick={() => setImageIdx((prev) => Math.max(prev - 1, 0))}
                      disabled={imageIdx === 0}
                      className="sm:w-10 sm:h-10 w-7 h-7 flex items-center justify-center rounded-full border-2 border-blue-700 text-blue-700 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed transition hover:bg-blue-100"
                      aria-label="Gambar Sebelumnya"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M18 15l-6-6-6 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <div className="flex md:flex-col gap-3">
                      {images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setImageIdx(idx)}
                          className={clsx('w-4 h-4 rounded-full border-2 border-blue-700 transition-all transform cursor-pointer hover:scale-125', imageIdx === idx ? 'bg-blue-700 scale-125' : 'bg-white')}
                          aria-label={`Lihat gambar ${idx + 1}`}
                        />
                      ))}
                    </div>
                    <button
                      onClick={() => setImageIdx((prev) => Math.min(prev + 1, totalImages - 1))}
                      disabled={imageIdx === totalImages - 1}
                      className="sm:w-10 sm:h-10 w-7 h-7 flex items-center justify-center rounded-full border-2 border-blue-700 cursor-pointer text-blue-700 disabled:opacity-30 disabled:cursor-not-allowed transition hover:bg-blue-100"
                      aria-label="Gambar Selanjutnya"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                )}
                <div className="flex-1 flex flex-col order-1 md:order-2">
                  <div ref={imageDisplayRef} className="relative w-full aspect-video bg-gray-100 rounded-2xl overflow-hidden mb-6 ">
                    {displayImage ? (
                      <Image src={displayImage} alt={news.title} layout="fill" className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <svg width="80" height="80" fill="none" viewBox="0 0 48 48">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M24 38.05A14.05 14.05 0 0038.05 24 14.05 14.05 0 0024 9.95 14.05 14.05 0 009.95 24 14.05 14.05 0 0024 38.05z" />
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 24.03l5.13 5.12 10.12-10.12" />
                        </svg>
                        <span className="ml-2">Tidak ada gambar</span>
                      </div>
                    )}
                  </div>
                  <div className="relative w-full">
                    <div className="leading-[3.5vw]">
                      <h1 ref={titleRef} className="text-[clamp(2vw,3vw,4rem)] font_bold text-[#002787] text-justify">
                        {news.title}
                      </h1>
                      <div ref={metaRef}>
                        <p className="text-[#0538B9] text-[clamp(2.5vw,2.5vw,1.5rem)] mb-6 text-justify">{new Date(news.publishedAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        <p className="text-[#0538B9] border-2 border-[#0538B9] text-[clamp(1vw,1.2vw,1.5rem)] bg-white rounded-[2vw] px-[1vw] py-[0.5vw]  w-fit ">{news.ministryName}</p>
                      </div>
                    </div>
                    <div ref={contentTextRef} className="news-content-scrollbar text-[#0538B9] text-[clamp(1.5vw,1.5vw,1.5rem)] h-[35vw] sm:h-[25vw] md:h-[40vw] lg:h-[40vw] overflow-y-auto text-justify mt-[2vw] mb-2">
                      {news.content}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div ref={sidebarRef} className="w-full sm:block hidden">
            <h3 className="text-2xl font-bold text-blue-900 mb-6">Berita Lain</h3>
            <div className="flex flex-col gap-4">
              {otherNews.map((other, index) => (
                <Link key={other.id} href={`/berita/${other.slug}`} passHref legacyBehavior>
                  <a className="transition transform hover:-translate-y-1  text-[2vw]">
                    <BeritaCardSide title={other.title} category={other.categoryName} ministryName={other.ministryName} color={index % 2 === 0 ? 'blue' : 'orange'} />
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="w-[100%] px-[2vw] block sm:hidden mb-6">
          <h3 className="text-2xl font-bold text-blue-900 mb-6">Berita Lain</h3>
          <div className="flex flex-col gap-4">
            {otherNews.map((other, index) => (
              <Link key={other.id} href={`/berita/${other.slug}`} passHref legacyBehavior>
                <a className="transition transform hover:-translate-y-1  text-[2vw]">
                  <BeritaCardSide title={other.title} category={other.categoryName} ministryName={other.ministryName} color={index % 2 === 0 ? 'blue' : 'orange'} />
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
