'use client';
import Image from 'next/image';
import React from 'react';
import bghero from '@/assets/landingpage/background/bg-hero.svg';
import play from '@/assets/landingpage/icons/play.svg';
import mori from '@/assets/landingpage/icons/morihero.svg';
import decor1 from '@/assets/landingpage/icons/hero-decor-1.svg';
import decor2 from '@/assets/landingpage/icons/hero-decor-2.svg';
import decor3 from '@/assets/landingpage/icons/hero-decor-3.svg';
import decor4 from '@/assets/landingpage/icons/hero-decor-4.svg';

type Props = {};

const Hero = (props: Props) => {
  return (
    <section className="relative w-full bg-white overflow-hidden">
      <div className="relative rounded-b-[40px] md:rounded-[40px] overflow-hidden">
        <div className="flex justify-center pb-20 pt-10">
          <Image src={bghero} alt="Background Simpul Memori" className="w-[1330px] h-[620px] md:h-[873px]" priority />
        </div>

        <div className="absolute inset-0 z-10 pointer-events-none">
          <Image src={decor1} className="absolute top-32 right-[500px] w-[73px] h-[146px]" alt="decoration" />
          <Image src={decor2} className="absolute top-64 right-[550px] w-[152px] h-[152px]" alt="decoration" />
          <Image src={decor3} className="absolute top-[250px] right-[100px] w-[605px] h-[560px]" alt="decoration" />
          <Image src={decor4} className="absolute bottom-[290px] right-[460px] w-[150px] h-[251px]" alt="decoration" />
        </div>

        <div className="absolute inset-0 px-6 md:px-48 py-10 md:py-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 z-10">
          <div className="text-white max-w-lg space-y-2">
            <p className="text-sm md:text-[25px] font-medium">KABINET EM UB 2025</p>
            <h1 className="text-4xl md:text-[110px] font-bold leading-24">Simpul Memori</h1>
            <p className="text-sm md:text-[25px] text-white/90">Bergerak bersama satukan Brawijaya.</p>

            <div className="flex items-center gap-3 mt-8">
              <button className="bg-[#FF4900] text-white text-sm md:text-[20px] font-medium px-10 py-2 md:py-2.5 rounded-full shadow-md">Company Profile</button>
              <div className="bg-white rounded-full w-14 h-14 flex items-center justify-center">
                <Image src={play} alt="Play" width={30} height={30} />
              </div>
            </div>
          </div>

          <div className="relative w-full h-full">
            <Image src={mori} alt="Mori Maskot" fill className="object-contain absolute translate-x-64 -translate-y-11 w-[605px] h-[560px]" />
          </div>
        </div>
      </div>

      <div className="block md:hidden w-full px-6 py-4">
        <div className="flex justify-between items-center bg-white rounded-full px-4 py-3 shadow-md">
          <div>
            <p className="text-black font-semibold text-sm">Klik disini!</p>
            <p className="text-gray-500 text-xs">Untuk akses lebih banyak.</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-[#fda480]" />
            <span className="w-4 h-4 rounded-full bg-[#ff7c48]" />
            <span className="w-4 h-4 rounded-full bg-[#ff4900]" />
            <span className="w-4 h-4 rounded-full border-2 border-black flex items-center justify-center">
              <svg width="8" height="8" viewBox="0 0 24 24" fill="black">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </span>
          </div>
        </div>
      </div>

      <div className="hidden md:flex absolute bottom-[70px] right-7 px-5 py-3 items-center gap-3">
        <div className="flex items-center -space-x-2">
          <span className="w-[70px] h-[70px] border-white border-4 z-20 rounded-full bg-[#FEB8A4]" />
          <span className="w-[70px] h-[70px] border-white border-4 z-10 rounded-full bg-[#FF6A3D]" />
          <span className="w-[70px] h-[70px] border-white border-4 rounded-full bg-[#FF4900]" />
        </div>
        <div className="max-w-52">
          <p className="text-black text-xl font-medium leading-none">Klik disini!</p>
          <p className="text-gray-500 text-xl mt-1 leading-7">Untuk akses lebih banyak.</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
