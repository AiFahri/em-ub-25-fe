import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import portalBg from '@/assets/berita/background/portalBg.svg';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);


const HeroSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline untuk animasi masuk
      const tl = gsap.timeline();

      // Animasi background - zoom in dengan parallax
      tl.fromTo(bgRef.current, 
        { 
          scale: 1.3, 
          opacity: 0,
          rotation: 2
        },
        { 
          scale: 1, 
          opacity: 1,
          rotation: 0,
          duration: 2,
          ease: "power3.out"
        }
      );

      // Animasi title - slide up dengan bounce
      tl.fromTo(titleRef.current,
        {
          y: 100,
          opacity: 0,
          scale: 0.8,
          rotationX: 90
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotationX: 0,
          duration: 1.2,
          ease: "back.out(1.7)"
        },
        "-=1.5"
      );

      // Animasi subtitle - slide up dengan delay
      tl.fromTo(subtitleRef.current,
        {
          y: 50,
          opacity: 0,
          scale: 0.9
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power2.out"
        },
        "-=0.8"
      );

      // Parallax scroll effect untuk background
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.set(bgRef.current, {
            y: progress * 100,
            scale: 1 + progress * 0.1
          });
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative flex flex-col aspect-[1920/1200] lg:aspect-[1920/800] md:aspect-[1920/900] items-center justify-center mx-auto overflow-hidden"
    >
      <div ref={bgRef} className="absolute top-0 left-0 w-full h-full">
        <Image
          src={portalBg}
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Text content */}
      <div className="relative z-10 text-center sm:mt-0 mt-[15vw] leading-[5vw]">
        <h1 
          ref={titleRef}
          className="text-[6vw] font_bold text-[#0538B9] mb-2 transform-gpu"
          style={{ 
            textShadow: '0 4px 8px rgba(5, 56, 185, 0.3)',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
          }}
        >
          Portal Berita
        </h1>
        <p 
          ref={subtitleRef}
          className="text-[3vw] font-semibold text-black transform-gpu"
          style={{ 
            textShadow: '0 2px 4px rgba(0,0,0,0.2)',
            filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))'
          }}
        >
          Eksekutif Mahasiswa Universitas Brawijaya
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
