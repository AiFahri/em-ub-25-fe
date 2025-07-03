'use client';
import Image from 'next/image';
import React from 'react';
import bghero from '@/assets/landingpage/background/bg-hero.svg';
import bgheromobile from '@/assets/landingpage/background/bg-hero-mobile.svg';
import play from '@/assets/landingpage/icons/play.svg';
import mori from '@/assets/landingpage/icons/morihero.svg';
import decor1 from '@/assets/landingpage/icons/hero-decor-1.svg';
import decor2 from '@/assets/landingpage/icons/hero-decor-2.svg';
import decor3 from '@/assets/landingpage/icons/hero-decor-3.svg';
import decor4 from '@/assets/landingpage/icons/hero-decor-4.svg';

const Hero = () => {
  return (
    <section className="relative w-full bg-white mb-10">
      <div className="px-4 md:px-0">
        <div
          className="w-full flex justify-center rounded-[60px] md:rounded-[40px] bg-white relative
    overflow-hidden h-[400px] md:h-auto"
        >
          <div className="relative w-full md:w-[90vw] md:aspect-[1810/943]">
            <Image src={bgheromobile} alt="Background Simpul Memori Mobile" fill className="object-cover z-0 md:hidden" />

            <Image src={bghero} alt="Background Simpul Memori" fill className="object-cover z-0 hidden md:block" />

            <div className="absolute inset-0 z-10 pointer-events-none">
              <Image src={decor1} className="absolute top-[15%] right-[40%] w-[4vw] " alt="decoration" />
              <Image src={decor2} className="absolute top-[35%] right-[45%] w-[8vw] " alt="decoration" />
              <Image src={decor3} className="absolute top-[55%] right-[15%] w-[35vw] " alt="decoration" />
              <Image src={decor4} className="absolute bottom-[20%] right-[40%] w-[8vw] " alt="decoration" />
            </div>
          </div>

          <div className="absolute inset-0 z-20 px-6 md:px-20 lg:px-32 py-10 md:py-14 flex flex-row items-center justify-between gap-6 md:gap-8">
            <div className="flex flex-col text-white space-y-2 min-w-0">
              <p className="hidden md:block text-[clamp(0.875rem,1.5vw,1.5rem)] font-medium">KABINET EM UB 2025</p>

              <h1 className="text-[clamp(2rem,6vw,6.875rem)] font-bold leading-none">Simpul Memori</h1>

              <p className="text-[clamp(0.875rem,1.8vw,1.5rem)] text-white/90">Bergerak bersama satukan Brawijaya.</p>

              <div className="flex items-center mt-4 md:mt-6">
                <button className="bg-[#FF4900] text-white text-[clamp(0.9rem,2.5vw,1.2rem)] font-medium px-4 py-2 rounded-full shadow-md whitespace-nowrap min-w-[160px] flex-shrink-0">Satcita Bercerita</button>

                <div className="ml-2 bg-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                  <div className="bg-[#0049FF] w-6 h-6 rounded-full flex items-center justify-center">
                    <Image src={play} alt="Play" className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>

            <div className="relative w-[90vw] md:w-[40vw] mt-6 md:mt-0 right-[-20%] md:right-[-12%]">
              <Image src={mori} alt="Mori Maskot" className="object-contain" />
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:flex absolute bottom-[70px] right-7 px-5 py-3 items-center gap-3">{/* Commented content remains the same */}</div>
    </section>
  );
};

export default Hero;
