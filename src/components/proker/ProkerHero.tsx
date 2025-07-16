'use client';

import Herosection from '@/assets/proker/hero-proker.svg';
import HeroSectionMobile from '@/assets/proker/hero-proker-mobile.svg';
import Herobg from '@/assets/proker/hero-bg-proker.svg';
import MoriCard from '@/assets/proker/mori-card-proker.svg';
import bubble1 from '@/assets/proker/programkerjamenarik-bubble.svg';
import bubble2 from '@/assets/proker/sudahbanyak-bubble.svg';
import bubble3 from '@/assets/proker/waktunyamenjelajah-bubble.svg';
import CountUp from '../landingpage/CountUp';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ProkerHero = () => {
  const [animationComplete, setAnimationComplete] = useState(false);

  // Prevent scroll during animation
  useEffect(() => {
    if (!animationComplete) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [animationComplete]);

  return (
    <div className="relative w-full h-[100svh] md:h-[900px] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#FDB090] to-[#fff]">
      {/* Background Herobg pattern dengan animasi floating */}
      <motion.div
        className="absolute left-0 top-0 w-full h-full z-0 pointer-events-none select-none"
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'easeInOut',
        }}
      >
        <Image src={Herobg || '/placeholder.svg'} alt="Background Hero Proker" fill className="object-cover object-top" priority />
      </motion.div>

      {/* Desktop SVG Herosection */}
      <motion.div
        className="hidden md:block absolute left-1/2 top-0 -translate-x-1/2 w-[90vw] h-full z-10 flex items-center justify-center pointer-events-none select-none"
        initial={{ x: -10000, opacity: 1 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          delay: 0,
          duration: 1,
          ease: [0.68, -0.55, 0.265, 1.2],
        }}
      >
        <Image src={Herosection || '/placeholder.svg'} alt="Hero Section Shape" fill className="object-contain" priority />
      </motion.div>

      {/* Mobile SVG Herosection - completely different positioning */}
      <motion.div
        className="md:hidden absolute left-1/2 top-[5%] -translate-x-1/2   w-[105vw] h-[80vw] z-10 flex items-center justify-center pointer-events-none select-none"
        initial={{ x: -10000, opacity: 1 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          delay: 0,
          duration: 1,
          ease: [0.68, -0.55, 0.265, 1.2],
        }}
      >
        <Image src={HeroSectionMobile || '/placeholder.svg'} alt="Hero Section Shape" fill className="object-contain" priority />
      </motion.div>

      {/* Desktop Main content */}
      <div className="hidden md:block absolute left-1/3 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-fit">
        <div className="flex flex-col items-start gap-[2vw]">
          {/* Item 1: "Program Kerja" dengan animasi */}
          <motion.h1
            className="text-white text-[min(7vw,8rem)] font-bold translate-x-1/5 drop-shadow-lg tracking-tight leading-tight whitespace-nowrap"
            initial={{
              x: '50%',
              scaleX: 0,
              opacity: 0,
              transformOrigin: 'right center',
            }}
            animate={{
              x: 0,
              scaleX: 1,
              opacity: 1,
              transformOrigin: 'right center',
            }}
            transition={{
              delay: 1,
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            Program Kerja
          </motion.h1>

          {/* Item 2: "EM UB 2025" dengan animasi */}
          <motion.div
            className="ml-[30vw]  rounded-full px-[2vw] py-[1vw]"
            initial={{
              x: '30%',
              scaleX: 0,
              opacity: 0,
              transformOrigin: 'right center',
            }}
            animate={{
              x: 0,
              scaleX: 1,
              opacity: 1,
              transformOrigin: 'right center',
            }}
            transition={{
              delay: 3,
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <span className="text-white text-[min(3vw,10rem)]  font-bold whitespace-nowrap">EM UB 2025</span>
          </motion.div>
        </div>
      </div>

      {/* Mobile Main content - positioned at top but with some spacing */}
      <div className="md:hidden absolute top-0  z-20 flex flex-col items-center pt-[19vh] px-4">
        {/* Mobile: Program Kerja - at top but with spacing */}
        <motion.h1
          className="text-white text-[clamp(2.5rem,5vw,4rem)] font-bold drop-shadow-lg text-center  -translate-x-10  leading-tight"
          initial={{
            x: '50%',
            scaleX: 0,
            opacity: 0,
            transformOrigin: 'center',
          }}
          animate={{
            x: 0,
            scaleX: 1,
            opacity: 1,
            transformOrigin: 'center',
          }}
          transition={{
            delay: 1,
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          Program Kerja
        </motion.h1>

        <motion.div
          className="  px-6 py-3 "
          initial={{
            x: '30%',
            scaleX: 0,
            opacity: 0,
            transformOrigin: 'right center',
          }}
          animate={{
            x: 0,
            scaleX: 1,
            opacity: 1,
            transformOrigin: 'right center',
          }}
          transition={{
            delay: 3,
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <span className="text-white text-[clamp(1rem,4.5vw,4rem)] ml-[10vh]    font-bold whitespace-nowrap">EM UB 2025</span>
        </motion.div>
      </div>

      {/* Right side MoriCard & Bubbles Desktop */}
      <div className="hidden md:flex absolute bottom-0 right-0 z-30 flex-col items-end pr-6 pb-4 space-y-4">
        {/* MoriCard dengan responsive vw */}
        <motion.div initial={{ x: '100%', opacity: 1 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
          {/* Container aspect-ratio 520:320 */}
          <div
            className="relative"
            style={{
              width: '40vw', // Mau 30% viewport width
              height: 0,
              paddingBottom: `${(320 / 520) * 100}%`, // Jaga rasio
            }}
          >
            <Image
              src={MoriCard}
              alt="Mori Card"
              fill
              className="object-contain"
              sizes="30vw" // Beri tahu browser akan menjadi 30vw
            />
          </div>
        </motion.div>

        {/* Bubble overlays */}
        {[bubble3, bubble2, bubble1].map((src, idx) => {
          // Posisi dalam vw
          const posStyles: React.CSSProperties[] = [
            { left: '0', top: '65%' },
            { left: '20vw', bottom: '5vw' },
            { left: '20vw', bottom: '3vw' },
          ];
          const bubbleNames = ['bubble3', 'bubble2', 'bubble1'];
          const animationDelays = [3, 1, 2]; // bubble3=3, bubble2=1, bubble1=2
          return (
            <motion.div
              key={bubbleNames[idx]}
              className="absolute"
              style={posStyles[idx]}
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: animationDelays[idx], duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Container aspect-ratio 300:60 */}
              <div
                className="relative"
                style={{
                  width: '15vw', // 15% viewport width
                  height: 0,
                  paddingBottom: `${(60 / 300) * 100}%`,
                }}
              >
                <Image src={src} alt={`Bubble ${idx + 1}`} fill className="object-contain" sizes="15vw" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Mobile: MoriCard & bubbles - same structure as desktop */}
      <div className="md:hidden absolute bottom-[20vh]  right-0 z-30 flex flex-col items-end  pb-4 space-y-4">
        {/* Mobile MoriCard dengan responsive vw */}
        <motion.div initial={{ x: '100%', opacity: 1 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
          {/* Container aspect-ratio 520:320 untuk mobile */}
          <div
            className="relative"
            style={{
              width: '60vw', // Lebih besar untuk mobile
              height: 0,
              paddingBottom: `${(520 / 520) * 100}%`, // Jaga rasio yang sama
            }}
          >
            <Image
              src={MoriCard}
              alt="Mori Card"
              fill
              className="object-contain"
              sizes="60vw" // Beri tahu browser akan menjadi 60vw
            />
          </div>
        </motion.div>

        {/* Mobile Bubble overlays dengan struktur yang sama */}
        {[bubble3, bubble2, bubble1].map((src, idx) => {
          // Posisi dalam vw untuk mobile
          const posStyles: React.CSSProperties[] = [
            { right: '35vw', top: '65%' },
            { left: '30vw', bottom: '12vw' },
            { left: '30vw', bottom: '10vw' },
          ];
          const bubbleNames = ['bubble3', 'bubble2', 'bubble1'];
          return (
            <motion.div key={bubbleNames[idx]} className="absolute" style={posStyles[idx]} initial={{ x: '100%', opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 1 + idx, duration: 1, ease: [0.22, 1, 0.36, 1] }}>
              {/* Container aspect-ratio 300:60 untuk mobile */}
              <div
                className="relative"
                style={{
                  width: '30vw', // Lebih besar untuk mobile
                  height: 0,
                  paddingBottom: `${(60 / 300) * 100}%`,
                }}
              >
                <Image src={src} alt={`Bubble ${idx + 1}`} fill className="object-contain" sizes="25vw" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Stats: Desktop layout - responsive with md and lg breakpoints */}
      <div className="hidden md:flex absolute md:left-0 md:top-3/4 md:-translate-y-1/2 lg:relative lg:top-auto lg:left-auto lg:translate-y-0 z-20 md:flex-col lg:flex-row gap-6 lg:gap-16 md:ml-8 lg:ml-20 lg:mt-auto lg:mb-8 lg:w-[calc(100%-5rem)]">
        <motion.div
          className="flex flex-col items-center"
          initial={{ y: 150, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: 1,
            duration: 0.3,
            ease: [0.68, -0.6, 0.32, 1.6],
          }}
        >
          <span className="text-[#FF4900] text-[5vw] lg:text-[6vw] font-bold drop-shadow">
            <CountUp target={10} />+
          </span>

          <span className="text-[#222] text-[2vw] lg:text-[2vw] font-semibold lg:mt-2">Program Kerja</span>
        </motion.div>

        <motion.div
          className="flex flex-col items-center"
          initial={{ y: 150, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: 1.3,
            duration: 0.3,
            ease: [0.68, -0.6, 0.32, 1.6],
          }}
        >
          <span className="text-[#FF4900] text-[5vw] lg:text-[6vw] font-bold drop-shadow">
            <CountUp target={17} />
          </span>

          <span className="text-[#222] text-[2vw] lg:text-[2vw] font-semibold lg:mt-2">Kementerian</span>
        </motion.div>

        <motion.div
          className="flex flex-col items-center"
          initial={{ y: 150, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: 1.6,
            duration: 0.3,
            ease: [0.68, -0.6, 0.32, 1.6],
          }}
          onAnimationComplete={() => setAnimationComplete(true)}
        >
          <span className="text-[#FF4900] text-[5vw] lg:text-[6vw] font-bold drop-shadow">
            <CountUp target={550} />+
          </span>

          <span className="text-[#222] text-[2vw] lg:text-[2vw] font-semibold lg:mt-2">Fungsionaris terlibat</span>
        </motion.div>
      </div>

      {/* Stats: Mobile layout - larger and better positioned */}
      <div className="md:hidden absolute translate-y-20 left-0 z-30 flex flex-col gap-4">
        <motion.div
          className="flex flex-col items-center"
          initial={{ y: 150, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: 1,
            duration: 0.3,
            ease: [0.68, -0.6, 0.32, 1.6],
          }}
        >
          <span className="text-[#FF4900] text-[8vw] xs:text-3xl text-center font-extrabold drop-shadow">
            <CountUp target={10} />+
          </span>

          <span className="text-[#222] text-[4vw] xs:text-sm font-semibold text-center">Program Kerja</span>
        </motion.div>

        <motion.div
          className="flex flex-col  items-center"
          initial={{ y: 150, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: 1.3,
            duration: 0.3,
            ease: [0.68, -0.6, 0.32, 1.6],
          }}
        >
          <span className="text-[#FF4900] text-[8vw] xs:text-3xl text-center font-extrabold drop-shadow">
            <CountUp target={17} />
          </span>

          <span className="text-[#222] text-[4vw] xs:text-sm font-semibold text-center">Kementerian</span>
        </motion.div>

        <motion.div
          className="flex flex-col items-center"
          initial={{ y: 150, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: 1.6,
            duration: 0.3,
            ease: [0.68, -0.6, 0.32, 1.6],
          }}
          onAnimationComplete={() => setAnimationComplete(true)}
        >
          <span className="text-[#FF4900] text-[8vw] xs:text-3xl text-center font-extrabold drop-shadow">
            <CountUp target={550} />+
          </span>
          <span className="text-[#222] text-[4vw] xs:text-sm font-semibold text-center">Fungsionaris Terlibat</span>
        </motion.div>
      </div>
    </div>
  );
};

export default ProkerHero;
