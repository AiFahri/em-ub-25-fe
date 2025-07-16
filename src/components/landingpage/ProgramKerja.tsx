'use client';

import Image from 'next/image';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProgramKerjaCard from './ProgramKerjaCard';
import face from '@/assets/landingpage/icons/maskot-face.svg';
import circleBlue from '@/assets/landingpage/icons/circle-blue.svg';
import circleQuarter from '@/assets/landingpage/icons/circle-quarter-blue.svg';
import k from '@/assets/landingpage/icons/k-outline.svg';
import CountUp from './CountUp';
import SkeletonProgramKerjaCard from './SkeletonProgramKerjaCard';
import vektor33 from '@/assets/landingpage/icons/Vector33.svg';
import vektor34 from '@/assets/landingpage/icons/Vector34.svg';
import { useQuery } from '@apollo/client';
import { GET_LANDING_PAGE_DATA } from '@/graphql/queries/getLandingPageData';

gsap.registerPlugin(ScrollTrigger);

const bgColorPattern = ['bg-[#0538B9]', 'bg-[#0049FF]', 'bg-[#FF4900]', 'bg-[#0049FF]', 'bg-[#0049FF]'];

export default function ProgramKerja() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const leftSectionRef = useRef<HTMLDivElement>(null);
  const rightSectionRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(true);
  const { data, loading, error } = useQuery(GET_LANDING_PAGE_DATA);

  const workProgramsData = data?.listWorkPrograms?.workPrograms ?? [];
  
  useEffect(() => {
    let animationFrameId: number;

    const scroll = () => {
      if (scrollRef.current && isScrollingRef.current) {
        scrollRef.current.scrollLeft += 0.5;
        if (scrollRef.current.scrollLeft >= scrollRef.current.scrollWidth - scrollRef.current.clientWidth) {
          scrollRef.current.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // useEffect(() => {
  //   // Event listeners untuk menghentikan scroll saat hover
  //   const handleMouseEnter = () => {
  //     console.log('Mouse enter - stopping scroll');
  //     isScrollingRef.current = false;
  //   };

  //   const handleMouseLeave = () => {
  //     console.log('Mouse leave - starting scroll');
  //     isScrollingRef.current = true;
  //   };

  //   // Attach event listeners ke setiap card
  //   const cards = document.querySelectorAll('.program-card');
  //   cards.forEach(card => {
  //     card.addEventListener('mouseenter', handleMouseEnter);
  //     card.addEventListener('mouseleave', handleMouseLeave);
  //   });
    
  //   return () => {
  //     cards.forEach(card => {
  //       card.removeEventListener('mouseenter', handleMouseEnter);
  //       card.removeEventListener('mouseleave', handleMouseLeave);
  //     });
  //   };
  // }, [data]);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // UNIQUE CREATIVE ANIMATIONS
      
      // Main timeline with magnetic entrance
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        }
      });

      // UNIQUE TITLE ANIMATION - Typewriter + Glitch Effect
      if (titleRef.current) {
        const titleSpans = titleRef.current.querySelectorAll('span');
        
        if (titleSpans.length >= 3) {
          // Handle all spans - now we have 4 spans total
          const spans = Array.from(titleSpans);
          
          spans.forEach((span, spanIndex) => {
            const text = span.textContent || '';
            
            // Create character-by-character spans for typewriter effect
            span.innerHTML = text.split('').map((char, i) => 
              `<span class="char-span" data-char="${i}">${char === ' ' ? '&nbsp;' : char}</span>`
            ).join('');
            
            const chars = span.querySelectorAll('.char-span');
            gsap.set(chars, { opacity: 0, y: 20, rotationX: 90 });
            
            // Typewriter effect with different timing for each span
            masterTl.to(chars, {
              opacity: 1,
              y: 0,
              rotationX: 0,
              duration: 0.03,
              stagger: 0.02,
              ease: "power2.out",
              onComplete: () => {
                // Glitch effect after typewriter
                gsap.to(chars, {
                  x: () => Math.random() * 4 - 2,
                  duration: 0.1,
                  repeat: 3,
                  yoyo: true,
                  ease: "power2.inOut"
                });
              }
            }, spanIndex * 0.8);
          });
        }
      }

      // UNIQUE ASSET ANIMATIONS - Magnetic + Orbital Motion
      if (leftSectionRef.current) {
        const assets = [
          { element: leftSectionRef.current.querySelector('img[alt="shape"]'), type: 'shape' },
          { element: leftSectionRef.current.querySelector('img[alt="circle blue"]'), type: 'circle' },
          { element: leftSectionRef.current.querySelector('img[alt="maskot"]'), type: 'maskot' },
          { element: leftSectionRef.current.querySelector('img[alt="half circle"]'), type: 'half' },
          { element: leftSectionRef.current.querySelector('button'), type: 'button' }
        ];

        assets.forEach((asset) => {
          if (asset.element) {
            // Unique initial positions and animations for each asset type
            switch (asset.type) {
              case 'shape':
                gsap.set(asset.element, { opacity: 0, x: -200, rotation: -180, scale: 0.3 });
                masterTl.to(asset.element, {
                  opacity: 1,
                  x: 0,
                  rotation: 0,
                  scale: 1,
                  duration: 1.2,
                  ease: "elastic.out(1, 0.5)"
                }, 1.5);
                break;
                
              case 'circle':
                gsap.set(asset.element, { opacity: 0, scale: 0, rotation: 360 });
                masterTl.to(asset.element, {
                  opacity: 1,
                  scale: 1,
                  rotation: 0,
                  duration: 1.0,
                  ease: "back.out(2)"
                }, 1.8);
                break;
                
              case 'maskot':
                gsap.set(asset.element, { opacity: 0, y: -100, rotation: 45, scale: 0.5 });
                masterTl.to(asset.element, {
                  opacity: 1,
                  y: 0,
                  rotation: 0,
                  scale: 1,
                  duration: 1.5,
                  ease: "bounce.out"
                }, 2.2);
                break;
                
              case 'half':
                gsap.set(asset.element, { opacity: 0, x: 150, rotation: -90, scale: 0.8 });
                masterTl.to(asset.element, {
                  opacity: 1,
                  x: 0,
                  rotation: 0,
                  scale: 1,
                  duration: 1.0,
                  ease: "power3.out"
                }, 2.5);
                break;
                
              case 'button':
                gsap.set(asset.element, { opacity: 0, y: 50, scale: 0.7 });
                masterTl.to(asset.element, {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  duration: 0.8,
                  ease: "back.out(1.7)"
                }, 2.8);
                break;
            }
          }
        });
      }

      // UNIQUE STATISTICS - Counter with Pulse Effect
      const stats = containerRef.current?.querySelectorAll('.decor-element');
      if (stats) {
        gsap.set(stats, { opacity: 0, scale: 0.5, y: 50 });
        masterTl.to(stats, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "elastic.out(1, 0.3)",
          onComplete: () => {
            // Continuous pulse effect
            gsap.to(stats, {
              scale: 1.05,
              duration: 2,
              repeat: -1,
              yoyo: true,
              ease: "power2.inOut",
              stagger: 0.3
            });
          }
        }, 3.5);
      }

      // UNIQUE VECTORS - Floating Animation
      const vectors = containerRef.current?.querySelectorAll('.vector-element');
      if (vectors) {
        gsap.set(vectors, { opacity: 0, rotation: 180, scale: 0.3 });
        masterTl.to(vectors, {
          opacity: 1,
          rotation: 0,
          scale: 1,
          duration: 1.2,
          stagger: 0.3,
          ease: "power2.out",
          onComplete: () => {
            // Continuous floating
            vectors.forEach((vector, i) => {
              gsap.to(vector, {
                y: -10,
                rotation: i % 2 === 0 ? 5 : -5,
                duration: 3 + i,
                repeat: -1,
                yoyo: true,
                ease: "power2.inOut"
              });
            });
          }
        }, 4);
      }

      // Cards - 3D entrance animation only
      const cards = containerRef.current?.querySelectorAll('.program-card');
      if (cards) {
        cards.forEach((card, index) => {
          // 3D initial state for entrance
          gsap.set(card, { 
            opacity: 0, 
            y: 100, 
            rotationY: 90, 
            rotationX: 15,
            scale: 0.8,
            z: -100
          });
          
          // 3D entrance animation
          gsap.to(card, {
            opacity: 1,
            y: 0,
            rotationY: 0,
            rotationX: 0,
            scale: 1,
            z: 0,
            duration: 1.2,
            delay: index * 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none none"
            }
          });

          // Simple hover (sama seperti sebelumnya)
          card.addEventListener('mouseenter', () => {
            gsap.to(card, { scale: 1, duration: 0.3 });
          });
          card.addEventListener('mouseleave', () => {
            gsap.to(card, { scale: 1, duration: 0.3 });
          });
        });
      }

      // UNIQUE HOVER EFFECTS - Magnetic & Orbital
      if (leftSectionRef.current) {
        const hoverElements = leftSectionRef.current.querySelectorAll('img, button');
        hoverElements.forEach((element, index) => {
          element.addEventListener('mouseenter', () => {
            gsap.to(element, { 
              scale: 1.15, 
              rotation: index % 2 === 0 ? 10 : -10,
              filter: "brightness(1.2) saturate(1.3)",
              duration: 0.4,
              ease: "power2.out"
            });
          });
          element.addEventListener('mouseleave', () => {
            gsap.to(element, { 
              scale: 1, 
              rotation: 0,
              filter: "brightness(1) saturate(1)",
              duration: 0.4,
              ease: "power2.out"
            });
          });
        });
      }

      // UNIQUE TITLE HOVER - Word Dance
      if (titleRef.current) {
        titleRef.current.addEventListener('mouseenter', () => {
          const chars = titleRef.current!.querySelectorAll('.char-span');
          chars.forEach((char, index) => {
            gsap.to(char, { 
              y: -5,
              rotation: Math.random() * 20 - 10,
              scale: 1.1,
              duration: 0.3,
              delay: index * 0.01,
              ease: "power2.out"
            });
          });
        });
        titleRef.current.addEventListener('mouseleave', () => {
          const chars = titleRef.current!.querySelectorAll('.char-span');
          gsap.to(chars, { 
            y: 0,
            rotation: 0,
            scale: 1,
            duration: 0.3,
            stagger: 0.01,
            ease: "power2.out"
          });
        });
      }

      // AMBIENT ANIMATIONS - Continuous subtle movements
      const ambientTl = gsap.timeline({ repeat: -1 });
      
      // Gentle breathing effect for the whole section
      ambientTl.to(containerRef.current, {
        scale: 1.002,
        duration: 4,
        ease: "power2.inOut",
        yoyo: true,
        repeat: 1
      });

    }, containerRef);

    return () => ctx.revert();
  }, [data]);

  if (loading) {
    return (
      <section className="py-10 px-3 md:px-6 lg:px-[5vh] font-sans">
        <div className="flex justify-center mb-12">
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold text-[#0538B9] text-center animate-pulse">Program Kerja</h2>
        </div>

        <div className="flex gap-6 overflow-x-auto scrollbar-hide px-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonProgramKerjaCard key={i} />
          ))}
        </div>
      </section>
    );
  }

  if (error) return <p className="text-center">Gagal memuat Program Kerja.</p>;

  return (
    <section ref={containerRef} className="py-10 px-3 md:px-6 lg:px-[5vh] font-sans overflow-hidden">
      <style>{`
                @keyframes shake {
                    0%, 100% { transform: rotate(0deg); }
                    25% { transform: rotate(-10deg); }
                    75% { transform: rotate(10deg); }
                }
                
                @keyframes glitch {
                    0%, 100% { transform: translate(0); }
                    20% { transform: translate(-2px, 2px); }
                    40% { transform: translate(-2px, -2px); }
                    60% { transform: translate(2px, 2px); }
                    80% { transform: translate(2px, -2px); }
                }
                
                @keyframes typewriter {
                    0% { width: 0; }
                    100% { width: 100%; }
                }
                
                @keyframes blink {
                    0%, 50% { opacity: 1; }
                    51%, 100% { opacity: 0; }
                }
                
                @keyframes floating {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                
                @keyframes pulse-glow {
                    0%, 100% { box-shadow: 0 0 20px rgba(5, 56, 185, 0.3); }
                    50% { box-shadow: 0 0 40px rgba(5, 56, 185, 0.6); }
                }
                
                @keyframes rotate-orbit {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                
                .animate-shake {
                    animation: shake 0.5s ease-in-out infinite;
                }
                
                .animate-glitch {
                    animation: glitch 0.3s ease-in-out;
                }
                
                .animate-floating {
                    animation: floating 3s ease-in-out infinite;
                }
                
                .animate-pulse-glow {
                    animation: pulse-glow 2s ease-in-out infinite;
                }
                
                .char-span {
                    display: inline-block;
                    transform-origin: center bottom;
                    will-change: transform;
                    transition: all 0.3s ease;
                }
                
                .word-span {
                    display: inline-block;
                    transform-origin: center bottom;
                    will-change: transform;
                    margin-right: 0.25em;
                    transition: all 0.3s ease;
                }
                
                .word-span:last-child {
                    margin-right: 0;
                }
                
                .magnetic-hover {
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    transform-style: preserve-3d;
                }
                
                .magnetic-hover:hover {
                    transform: perspective(1000px) rotateX(10deg) rotateY(10deg) translateZ(20px);
                }
                
                .glow-effect {
                    filter: drop-shadow(0 0 10px rgba(5, 56, 185, 0.5));
                    transition: filter 0.3s ease;
                }
                
                .glow-effect:hover {
                    filter: drop-shadow(0 0 20px rgba(5, 56, 185, 0.8));
                }
                
                .elastic-entrance {
                    animation: elastic-entrance 1s ease-out;
                }
                
                @keyframes elastic-entrance {
                    0% { transform: scale(0) rotate(180deg); opacity: 0; }
                    60% { transform: scale(1.1) rotate(-10deg); opacity: 1; }
                    100% { transform: scale(1) rotate(0deg); opacity: 1; }
                }
                
                .bounce-entrance {
                    animation: bounce-entrance 1.5s ease-out;
                }
                
                @keyframes bounce-entrance {
                    0% { transform: translateY(-100px) scale(0.3); opacity: 0; }
                    50% { transform: translateY(0px) scale(1.05); opacity: 1; }
                    65% { transform: translateY(-20px) scale(0.9); }
                    80% { transform: translateY(0px) scale(1.02); }
                    100% { transform: translateY(0px) scale(1); }
                }
                
                .card-3d {
                    transform-style: preserve-3d;
                    perspective: 1000px;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    position: relative;
                    will-change: transform;
                }
                
                .card-3d:hover {
                    transform: perspective(1000px) rotateX(5deg) rotateY(5deg) translateZ(30px);
                }
                
                .card-3d-entrance {
                    animation: card-entrance 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                }
                
                .card-3d-entrance-left {
                    animation: card-entrance-left 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                }
                
                .card-3d-entrance-right {
                    animation: card-entrance-right 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                }
                
                .card-3d::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
                    border-radius: inherit;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                    pointer-events: none;
                    z-index: 1;
                }
                
                .card-3d:hover::before {
                    opacity: 1;
                }
                
                .card-3d::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: radial-gradient(circle at 50% 50%, rgba(5, 56, 185, 0.1), transparent 70%);
                    border-radius: inherit;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                    pointer-events: none;
                    z-index: 2;
                }
                
                .card-3d:hover::after {
                    opacity: 1;
                }
                
                .card-entrance {
                    animation: card-entrance 0.8s ease-out forwards;
                }
                
                @keyframes card-entrance {
                    0% {
                        opacity: 0;
                        transform: perspective(1000px) rotateY(120deg) rotateX(45deg) rotateZ(15deg) translateY(150px) translateZ(-200px) scale(0.3);
                    }
                    50% {
                        opacity: 0.7;
                        transform: perspective(1000px) rotateY(60deg) rotateX(20deg) rotateZ(8deg) translateY(50px) translateZ(-100px) scale(0.7);
                    }
                    100% {
                        opacity: 1;
                        transform: perspective(1000px) rotateY(0deg) rotateX(0deg) rotateZ(0deg) translateY(0px) translateZ(0px) scale(1);
                    }
                }
                
                @keyframes card-entrance-left {
                    0% {
                        opacity: 0;
                        transform: perspective(1000px) rotateY(-120deg) rotateX(45deg) rotateZ(-15deg) translateY(150px) translateX(-100px) translateZ(-200px) scale(0.3);
                    }
                    50% {
                        opacity: 0.7;
                        transform: perspective(1000px) rotateY(-60deg) rotateX(20deg) rotateZ(-8deg) translateY(50px) translateX(-30px) translateZ(-100px) scale(0.7);
                    }
                    100% {
                        opacity: 1;
                        transform: perspective(1000px) rotateY(0deg) rotateX(0deg) rotateZ(0deg) translateY(0px) translateX(0px) translateZ(0px) scale(1);
                    }
                }
                
                @keyframes card-entrance-right {
                    0% {
                        opacity: 0;
                        transform: perspective(1000px) rotateY(120deg) rotateX(45deg) rotateZ(15deg) translateY(150px) translateX(100px) translateZ(-200px) scale(0.3);
                    }
                    50% {
                        opacity: 0.7;
                        transform: perspective(1000px) rotateY(60deg) rotateX(20deg) rotateZ(8deg) translateY(50px) translateX(30px) translateZ(-100px) scale(0.7);
                    }
                    100% {
                        opacity: 1;
                        transform: perspective(1000px) rotateY(0deg) rotateX(0deg) rotateZ(0deg) translateY(0px) translateX(0px) translateZ(0px) scale(1);
                    }
                }
                
                .card-hover-glow {
                    position: relative;
                    overflow: hidden;
                }
                
                .card-hover-glow::before {
                    content: '';
                    position: absolute;
                    top: -50%;
                    left: -50%;
                    width: 200%;
                    height: 200%;
                    background: conic-gradient(from 0deg, transparent, rgba(5, 56, 185, 0.3), transparent);
                    animation: rotate-glow 4s linear infinite;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }
                
                .card-hover-glow:hover::before {
                    opacity: 1;
                }
                
                @keyframes rotate-glow {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
            
      <div className="flex justify-center flex-col md:px-20">
        <div className="relative flex flex-col lg:flex-row items-center justify-center gap-8 mb-24 md:mb-32 font-[NeueHaasDisplay]">
          <div ref={leftSectionRef} className="order-2 lg:order-1 relative w-[80vw] max-w-[480px] aspect-[16/10] h-auto flex-shrink-0">
            <Image
              src={k}
              alt="shape"
              className="absolute magnetic-hover glow-effect
      w-[30%] sm:w-[150px] md:w-[170px] lg:w-[165px]
      top-[40px] sm:top-[48px] md:top-[64px] lg:top-20
      left-[14%] sm:left-[60px] md:left-[32px] lg:left-5"
            />
            <Image
              src={circleBlue}
              alt="circle blue"
              className="absolute magnetic-hover glow-effect
      w-[40%] sm:w-[180px] md:w-[200px] lg:w-[240px]
      top-[0px] sm:top-[0px] md:top-[0px]
      right-[14%] sm:right-[15%] md:right-[32px] lg:right-10"
            />
            <Image
              src={face}
              alt="maskot"
              className="absolute magnetic-hover glow-effect
      w-[90px] sm:w-[120px] md:w-[130px] lg:w-[170px]
      top-[80px] sm:top-[96px] md:top-[104px] lg:top-32
      right-[10%] sm:right-[10%] md:right-[40px] lg:right-5
      z-10"
            />
            <Image
              src={circleQuarter}
              alt="half circle"
              className="absolute magnetic-hover glow-effect
      w-[30%] sm:w-[120px] md:w-[140px] lg:w-[140px]
      -bottom-[14%] sm:bottom-[0%] md:-bottom-[30px] lg:-bottom-20
      right-[30%] sm:right-[32%] md:right-[120px] lg:right-36"
            />
            <button
              className="absolute z-20 transition font-semibold font-[poppins] magnetic-hover glow-effect hover:brightness-110
      text-[12px] sm:text-[14px] md:text-[16px] lg:text-[clamp(14px,1.3vw,19px)]
      px-[20px] sm:px-[24px] md:px-[28px] lg:px-7
      py-[10px] sm:py-[12px] md:py-[14px] lg:py-4
      bg-[#FF4900] text-white rounded-full
      bottom-[0%] sm:bottom-[35px] md:bottom-[10px] lg:-bottom-10
      left-[15%] sm:left-[20%] md:left-[80px] lg:left-14"
            >
              Lihat Selengkapnya
            </button>
          </div>
        {/* title section */}
          <div ref={rightSectionRef} className="order-2 lg:order-2 flex-1 justify-center items-center text-center lg:text-left">
            <h2 ref={titleRef} className="text-[clamp(3vw,8vw,80px)] ml-20 font-black leading-tight">
              <span className="text-[#0538B9]">Program kerja mega</span><br />
              <span className="text-[#0538B9]">besar, </span><span className="text-[#BACEFF]">dari kami untuk</span><br />
              <span className="text-[#BACEFF]">mahasiswa Brawijaya.</span>
            </h2>
          </div>
        </div>

        <div className="flex flex-row justify-center xl:justify-between items-end mb-16 text-center font-[NeueHaasDisplay] gap-6 md:gap-8 px-4">
          {[
            { target: 10, label: 'Program Kerja Mega Besar' },
            { target: 17, label: 'Kementerian & Biro' },
            { target: 550, label: 'Fungsionaris Terlibat' },
          ].map((item, index) => (
            <div
              key={index}
              className="decor-element min-w-[90px] md:min-w-[150px] lg:min-w-[180px] xl:w-full flex flex-col justify-between items-center"
            >
              <h3 className="text-[#FF4900] font-bold leading-none text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] xl:text-[8rem]">
                <span className="inline-flex items-center overflow-hidden">
                  <CountUp target={item.target} />
                  {item.label === 'Fungsionaris Terlibat' && <span className="pl-1">+</span>}
                </span>
              </h3>

              <div className="min-h-[3.5rem] sm:min-h-[3.8rem] md:min-h-[4rem] lg:min-h-[4.2rem] xl:min-h-[4.5rem] flex items-start justify-center text-center">
                {item.label === 'Program Kerja Mega Besar' ? (
                  <p className="text-black font-medium text-[12px] md:text-lg lg:text-xl xl:text-3xl leading-tight">
                    Program Kerja
                    <br />
                    Mega Besar
                  </p>
                ) : (
                  <p className="text-black font-medium text-[12px] md:text-lg lg:text-xl xl:text-3xl leading-tight">{item.label}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative">
        <Image src={vektor34} alt="vektor34" className="vector-element w-[100px] md:w-[200px] lg:w-[250px] absolute left-[0%] -top-[10%] pointer-events-none z-10" />

        <div ref={scrollRef} className="overflow-x-auto scrollbar-hide relative z-20">
          <div className="flex gap-6 md:mt-10 md:px-4 w-max">
            {[...workProgramsData, ...workProgramsData].map((workProgram, i) => (
              <ProgramKerjaCard
                index={i}
                key={`${workProgram.id}-${i}`}
                title={workProgram.title}
                description={workProgram.content}
                kementerian={workProgram.ministryID}
                bgColor={bgColorPattern[i % bgColorPattern.length]}
                slug={workProgram.slug}
              />
            ))}
          </div>
        </div>

        <Image src={vektor33} alt="vektor33" className="vector-element w-[150px] md:w-[200px] lg:w-[300px] absolute -bottom-[12%] -right-[2%] pointer-events-none z-10" />
      </div>
    </section>
  );
}
