'use client';
import Image from 'next/image';
import tidaklolos from '@/assets/pengumuman/background/tidaklolos.svg';
import bubblechat from '@/assets/pengumuman/icon/bubblechat.svg';
import mori from '@/assets/pengumuman/icon/moritolak.svg';
import o from '@/assets/pengumuman/icon/o.svg';
import { motion } from 'framer-motion';
import React from 'react';

const Tolak = () => {
  return (
    <div className="relative w-full h-screen flex justify-center items-center px-4 overflow-hidden">
      {/* Background image */}
      <Image src={tidaklolos} alt="background" fill className="absolute inset-0 -z-10 object-cover" priority />

      <div className="flex flex-col md:flex-row items-center justify-center md:gap-x-10 gap-y-5 xl:gap-x-20">
        {/* Tulisan dan bubble */}
        <div className="flex flex-col items-center justify-center text-center">
          <div className="relative whitespace-nowrap font_bold text-[#FF4900] text-[3rem] md:text-[4rem] lg:text-[5rem] xl:text-[7rem]">
            Belum Lolos!
            <Image src={o} alt="mata kiri" className="absolute top-[60%] left-[68%] xl:w-[48px] lg:w-[35px] md:w-[28px] sm:w-[12px] w-[20px] -translate-x-1/2 -translate-y-1/2 z-30" />
            <Image src={o} alt="mata kanan" className="absolute top-[60%] left-[82%] xl:w-[48px] lg:w-[35px] md:w-[28px] sm:w-[12px] w-[20px] -translate-x-1/2 -translate-y-1/2 z-30" />
          </div>

          <div className="relative mt-2 sm:mt-4">
            <Image src={bubblechat} alt="bubble" className="w-[250px] sm:w-[350px] md:w-[400px] lg:w-[700px]" />
            <div className="absolute inset-0 z-10 flex items-center justify-center px-2">
              <p className="font_medium text-white tracking-tight text-[12px] md:text-[20px] lg:text-[36px] text-center">Kamu keren. Tetap semangat, ya, Braw!</p>
            </div>
          </div>
        </div>

        {/* Mori */}
        <Image src={mori} alt="mori" className="w-[120px] sm:w-[160px] md:w-[280px] xl:w-[400px] lg:-translate-x-20 lg:translate-y-0 md:translate-y-5 md:-translate-x-10 -translate-x-0" />
      </div>
    </div>
  );
};

export default Tolak;
