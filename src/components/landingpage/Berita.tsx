'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import BeritaCard from './BeritaCard';
import Image from 'next/image';
import arrowrightblue from '@/assets/landingpage/icons/arrow-right-blue.svg';
import arrowleftblue from '@/assets/landingpage/icons/arrow-left-blue.svg';
import { useQuery } from '@apollo/client';
import { GET_LANDING_PAGE_DATA } from '@/graphql/queries/getLandingPageData';
import SkeletonBeritaCard from './SkeletonBeritaCard';

gsap.registerPlugin(ScrollTrigger);

export interface NewsItem {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  imageUrls?: string[];
}

export default function Berita() {
  const { data, loading, error } = useQuery(GET_LANDING_PAGE_DATA);
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const swiperRef = useRef<HTMLDivElement>(null);

  const beritaData = data?.listNews?.news ?? [];

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Set initial states with dramatic modern effects
      gsap.set(swiperRef.current, {
        opacity: 0,
        y: 150,
        scale: 0.7,
        rotationX: 35,
        transformPerspective: 1200,
        filter: "blur(30px) brightness(0.3)",
        transformOrigin: "center center",
      });

      // Split text into individual characters for letter-by-letter animation
      if (titleRef.current) {
        const titleText = titleRef.current.textContent || "";
        titleRef.current.innerHTML = "";
        
        titleText.split("").forEach((char) => {
          const span = document.createElement("span");
          span.textContent = char === " " ? "\u00A0" : char; // Non-breaking space
          span.style.display = "inline-block";
          span.style.opacity = "0";
          span.style.transform = "translateY(-100px) rotateX(90deg)";
          span.style.transformOrigin = "center bottom";
          titleRef.current!.appendChild(span);
        });
      }

      // Create sophisticated entrance animation
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "bottom 30%",
          toggleActions: "play none none reverse",
        }
      });

      // Letter-by-letter animation with falling effect
      const letters = titleRef.current?.querySelectorAll("span");
      if (letters) {
        letters.forEach((letter, index) => {
          masterTl.to(letter, {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 0.6,
            ease: "bounce.out",
          }, index * 0.03);
        });
      }

      // Title animation with morphing phases
      masterTl
        .to(swiperRef.current, {
          opacity: 0.2,
          y: 100,
          scale: 0.75,
          rotationX: 25,
          filter: "blur(20px) brightness(0.5)",
          duration: 0.3,
          ease: "power2.out",
        }, "-=0.8")
        .to(swiperRef.current, {
          opacity: 0.5,
          y: 60,
          scale: 0.85,
          rotationX: 15,
          filter: "blur(12px) brightness(0.7)",
          duration: 0.4,
          ease: "power2.out",
        })
        .to(swiperRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          filter: "blur(0px) brightness(1)",
          duration: 0.6,
          ease: "elastic.out(1, 0.9)",
        });

      // Individual card animations with advanced effects
      const cards = swiperRef.current?.querySelectorAll('.berita-card');
      if (cards) {
        cards.forEach((card, index) => {
          gsap.set(card, {
            opacity: 0,
            y: 120 + (index * 30),
            scale: 0.6,
            rotationY: 30,
            rotationX: 20,
            transformPerspective: 1000,
            filter: "blur(20px) saturate(0.3)",
            transformOrigin: "center center",
          });

          gsap.to(card, {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationY: 0,
            rotationX: 0,
            filter: "blur(0px) saturate(1)",
            duration: 1,
            ease: "back.out(1.5)",
            delay: 0.6 + (index * 0.2),
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            }
          });

          // Simple hover effects (original style)
          card.addEventListener('mouseenter', () => {
            gsap.to(card, {
              scale: 1.05,
              duration: 0.3,
              ease: "power2.out",
            });
          });

          card.addEventListener('mouseleave', () => {
            gsap.to(card, {
              scale: 1,
              duration: 0.3,
              ease: "power2.out",
            });
          });
        });
      }

      // Add magnetic effect to title letters
      if (titleRef.current) {
        titleRef.current.addEventListener('mousemove', (e) => {
          const rect = titleRef.current!.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          
          gsap.to(titleRef.current, {
            x: x * 0.02,
            y: y * 0.02,
            rotationX: y * 0.01,
            rotationY: x * 0.01,
            duration: 0.4,
            ease: "power2.out",
          });

          // Individual letter hover effects
          const letters = titleRef.current!.querySelectorAll("span");
          letters.forEach((letter, index) => {
            const delay = index * 0.01;
            gsap.to(letter, {
              x: x * 0.02,
              y: y * 0.02,
              rotationX: y * 0.01,
              rotationY: x * 0.01,
              duration: 0.5,
              ease: "power2.out",
              delay: delay,
            });
          });
        });

        titleRef.current.addEventListener('mouseleave', () => {
          gsap.to(titleRef.current, {
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            duration: 0.6,
            ease: "elastic.out(1, 0.9)",
          });

          // Reset letter effects
          const letters = titleRef.current!.querySelectorAll("span");
          letters.forEach((letter, index) => {
            const delay = index * 0.01;
            gsap.to(letter, {
              x: 0,
              y: 0,
              rotationX: 0,
              rotationY: 0,
              duration: 0.8,
              ease: "power2.out",
              delay: delay,
            });
          });
        });
      }

      // Add smooth parallax scrolling effect
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.to(titleRef.current, {
            y: progress * -25,
            duration: 0.3,
            ease: "none",
          });
          gsap.to(swiperRef.current, {
            y: progress * -35,
            duration: 0.3,
            ease: "none",
          });
        },
      });

    }, containerRef);

    return () => ctx.revert();
  }, [data]);

  if (loading) {
    return (
      <section className="bg-white font-sans relative">
        <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold text-[#0538B9] mb-10 text-center animate-pulse">What&#39;s up right now?</h2>

        <div className="relative w-full px-4 md:px-10">
          <Swiper
            modules={[Navigation]}
            loop={false}
            breakpoints={{
              0: {
                slidesPerView: 1.5,
                spaceBetween: 8,
              },
              640: {
                slidesPerView: 2.5,
                spaceBetween: 12,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1600: {
                slidesPerView: 4,
                spaceBetween: 28,
              },
            }}
            className="mb-16"
          >
            {Array.from({ length: 4 }).map((_, i) => (
              <SwiperSlide key={i}>
                <div className="relative h-fit">
                  <SkeletonBeritaCard />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    );
  }
  if (error) return <p className="text-center">Gagal memuat berita.</p>;

  return (
    <section ref={containerRef} className="bg-white font-sans relative">
      <h2 ref={titleRef} className="text-4xl md:text-6xl lg:text-8xl font-bold text-[#0538B9] mb-10 text-center">
        What&#39;s up right now?
      </h2>

      <div ref={swiperRef} className="relative w-full px-4 md:px-10">
        <Swiper
          modules={[Navigation]}
          loop={true}
          navigation={{
            nextEl: '#berita-next',
            prevEl: '#berita-prev',
          }}
          breakpoints={{
            0: {
              slidesPerView: 1.5,
              spaceBetween: 8,
            },
            640: {
              slidesPerView: 2.5,
              spaceBetween: 12,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1600: {
              slidesPerView: 4,
              spaceBetween: 28,
            },
          }}
          className="mb-16"
        >
          {beritaData.map((news: NewsItem, index: number) => (
            <SwiperSlide key={news.id}>
              <div className="relative h-fit">
                <BeritaCard id={news.id} title={news.title} date={new Date(news.createdAt).toLocaleDateString('id-ID')} description={news.content} imageUrl={news.imageUrls?.[0] || ''} index={index} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="hidden md:block absolute inset-0 z-10 pointer-events-none">
          <button
            id="berita-prev"
            className="swiper-button-prev pointer-events-auto absolute left-4 top-1/2 translate-x-[2vw] -translate-y-[5vw]
        min-w-[clamp(36px,4vw,56px)] min-h-[clamp(36px,4vw,56px)]
        flex justify-center items-center rounded-full
        transition-all duration-500 bg-white shadow-lg hover:shadow-xl 
        hover:scale-110 active:scale-95 z-30"
          >
            <Image src={arrowleftblue} alt="Previous" className="w-[clamp(16px,2vw,28px)] h-auto" />
          </button>

          <button
            id="berita-next"
            className="swiper-button-next pointer-events-auto absolute right-4 -translate-x-[2vw] top-1/2 -translate-y-[5vw]
        min-w-[clamp(36px,4vw,56px)] min-h-[clamp(36px,4vw,56px)]
        flex justify-center items-center rounded-full
        transition-all duration-500 bg-white shadow-lg hover:shadow-xl 
        hover:scale-110 active:scale-95 z-30"
          >
            <Image src={arrowrightblue} alt="Next" className="w-[clamp(16px,2vw,28px)] h-auto" />
          </button>
        </div>
      </div>
    </section>
  );
}
