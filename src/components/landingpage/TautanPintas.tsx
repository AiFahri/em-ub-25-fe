"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import arrowUpRight from "@/assets/landingpage/icons/arrow-up-right.svg";
import arrowrightblue from "@/assets/landingpage/icons/arrow-right-blue.svg";
import SkeletonTautanPintas from "./SkeleteonTautanPintas";
import arrowleftblue from "@/assets/landingpage/icons/arrow-left-blue.svg";
import { GET_LANDING_PAGE_DATA } from "@/graphql/queries/getLandingPageData";
import { useQuery } from "@apollo/client";

gsap.registerPlugin(ScrollTrigger);

const bgColors = ["#FF4900", "#0049FF", "#0538B9"];
const overlayColors = ["#FF7C48", "#3A73FF", "#002787"];

export interface LinkItem {
  id: string;
  title: string;
  url: string;
}

export default function TautanPintas() {
  const { data, loading, error } = useQuery(GET_LANDING_PAGE_DATA);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const swiperRef = useRef<HTMLDivElement>(null);

  const tautanPintasData = data?.listLinks?.links ?? [];

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Set initial states with clean entrance
      gsap.set(swiperRef.current, {
        opacity: 0,
        y: 50,
        scale: 0.95,
        rotationX: 8,
        transformPerspective: 1200,
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

      // Create ultra-smooth staggered timeline
      const mainTl = gsap.timeline({
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
          mainTl.to(letter, {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 0.6,
            ease: "bounce.out",
            delay: index * 0.05,
          }, index * 0.03);
        });
      }

      // Swiper container with clean fast entrance
      mainTl.to(swiperRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationX: 0,
        duration: 0.8,
        ease: "power2.out",
      }, "-=0.5");

      // Fast and smooth 3D entrance animation without blur
      const slides = swiperRef.current?.querySelectorAll('.swiper-slide');
      if (slides) {
        slides.forEach((slide, index) => {
          gsap.set(slide, {
            opacity: 0,
            y: 80 + (index * 20),
            x: -30 + (index * 20),
            z: -100 - (index * 30),
            scale: 0.7,
            rotationY: 30 + (index * 5),
            rotationX: 20 + (index * 3),
            transformPerspective: 2000,
            transformOrigin: "center center",
          });

          // Simplified 2-stage fast entrance animation
          const cardTl = gsap.timeline({
            scrollTrigger: {
              trigger: slide,
              start: "top 95%",
              toggleActions: "play none none reverse",
            }
          });

          // Stage 1: Quick 3D reveal
          cardTl.to(slide, {
            opacity: 1,
            y: 30 + (index * 10),
            x: -10 + (index * 10),
            z: -30 - (index * 15),
            scale: 1,
            rotationY: 10 + (index * 2),
            rotationX: 8 + (index * 1),
            duration: 1.3,
            ease: "power2.out",
            delay: 1 + (index * 0.08),
          })
          // Stage 2: Final position with bounce
          .to(slide, {
            opacity: 1,
            y: 0,
            x: 0,
            z: 0,
            scale: 1,
            rotationY: 0,
            rotationX: 0,
            duration: 0.6,
            ease: "back.out(1.2)",
          });

          // Clean 3D hover effect for slides without blur
          // slide.addEventListener('mouseenter', () => {
          //   gsap.to(slide, {
          //     scale: 1,
          //     rotationY: 5,
          //     rotationX: 2,
          //     z: 30,
          //     duration: 0.4,
          //     ease: "power2.out",
          //   });
          // });

          // slide.addEventListener('mouseleave', () => {
          //   gsap.to(slide, {
          //     scale: 1,
          //     rotationY: 0,
          //     rotationX: 0,
          //     z: 0,
          //     boxShadow: "0 0px 0px rgba(0,0,0,0)",
          //     duration: 0.4,
          //     ease: "power2.out",
          //   });
          // });
        });
      }

      // Smooth magnetic effect to title letters
      if (titleRef.current) {
        titleRef.current.addEventListener('mousemove', (e) => {
          const rect = titleRef.current!.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          
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

      // Smooth parallax scrolling effect
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 3,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.to(titleRef.current, {
            y: progress * -15,
            duration: 0.1,
            ease: "power1.inOut",
          });
          gsap.to(swiperRef.current, {
            y: progress * -25,
            duration: 0.1,
            ease: "power1.inOut",
          });
        },
      });

    }, containerRef);

    return () => ctx.revert();
  }, [data]);

  if (loading) return <SkeletonTautanPintas />;
  if (error) return <p className="text-center">Gagal memuat tautan pintas.</p>;
  return (
    <section
      ref={containerRef}
      className="py-12 px-4 md:px-10 w-full relative"
    >
      <h2 ref={titleRef} className="text-4xl md:text-6xl lg:text-8xl font-bold text-center text-[#0538B9] mb-10 md:mb-16">
        Tautan Pintas
      </h2>

      <div ref={swiperRef} className="relative ">
        <div className="hidden md:block absolute  inset-0 z-30 pointer-events-none">
          <button
            id="slider-button-left"
            className="swiper-button-prev group pointer-events-auto absolute left-4 top-1/2 -translate-y-1/2 
          min-w-[clamp(36px,4vw,56px)] min-h-[clamp(36px,4vw,56px)]
          flex justify-center items-center rounded-full
          transition-all duration-500 bg-white shadow-lg hover:shadow-xl 
          hover:scale-110 active:scale-95 z-30"
          >
            <Image
              src={arrowleftblue}
              alt="Previous"
              className="w-[clamp(16px,2vw,28px)] h-auto"
            />
          </button>

          <button
            id="slider-button-right"
            className="swiper-button-next group pointer-events-auto absolute right-4 top-1/2 -translate-y-1/2 
          min-w-[clamp(36px,4vw,56px)] min-h-[clamp(36px,4vw,56px)]
          flex justify-center items-center rounded-full
          transition-all duration-500 bg-white shadow-lg hover:shadow-xl 
          hover:scale-110 active:scale-95 z-30"
          >
            <Image
              src={arrowrightblue}
              alt="Next"
              className="w-[clamp(16px,2vw,28px)] h-auto"
            />
          </button>
        </div>

        <div
          className={`swiper multiple-slide-carousel swiper-container relative z-10`}
         
        >
          <Swiper
            modules={[Navigation]}
            loop={true}
            navigation={{
              nextEl: "#slider-button-right",
              prevEl: "#slider-button-left",
            }}
            spaceBetween={28}
            breakpoints={{
              0: { slidesPerView: 1.7 },
              640: { slidesPerView: 2.5 },
              1024: { slidesPerView: 3 },
              1600: { slidesPerView: 4 },
            }}
            className="swiper-wrapper mb-16"
          >
            {tautanPintasData.map((links: LinkItem, i: number) => (
              <SwiperSlide key={links.id}>
                <a
                  href={links.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer relative h-[200px] lg:h-[320px] overflow-hidden rounded-[30px] group block"
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundColor: overlayColors[i % overlayColors.length],
                      zIndex: 0,
                    }}
                  />

                  <div
                    className={`absolute inset-0 flex items-end p-8 z-10
                  rounded-tr-[80%] text-white font-semibold text-2xl md:text-3xl lg:text-4xl
                  bg-[${bgColors[i % bgColors.length]}]
                  top-14 md:top-10 lg:top-20 lg:right-20 right-10
                  transform group-hover:scale-120 lg:group-hover:scale-140 md:scale-100
                  transition-all duration-300 ease-in-out`}
                  >
                    <div className="absolute top-[-5vw] right-[-1vw] md:right-[-1vw] md:-top-4 lg:-top-8 lg:right-[-0.8vw] z-20">
                      <Image
                        src={arrowUpRight}
                        alt="Arrow up right"
                        className="w-10 h-10 md:w-[6vw] md:h-[6vw] xl:w-[5vw] xl:h-[5vw] transform scale-100 group-hover:scale-50 lg:group-hover:scale-50 transition-all duration-300 ease-in-out"
                      />
                    </div>
                  </div>

                  <div className="absolute inset-0 top-10 md:top-10 lg:top-20 lg:right-20 flex items-end p-8 z-20 pointer-events-none">
                    <span className="block text-[18px] md:text-2xl lg:text-4xl font-semibold text-white line-clamp-3">
                      {links.title}
                    </span>
                  </div>
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
