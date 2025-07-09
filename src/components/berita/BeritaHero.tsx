import React from 'react';
import Image from 'next/image';


import portalBg from '@/assets/berita/background/portalBg.svg';


const HeroSection = () => {
  return (
    <section className="relative flex flex-col  aspect-[1920/1200]  lg:aspect-[1920/800] md:aspect-[1920/900] items-center justify-center  mx-auto">
      <div className="absolute top-0 left-0 w-full h-full">
        <Image
          src={portalBg}
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>
      {/* Text content */}
      <div className="relative z-10 text-center sm:mt-0 mt-[15vw] leading-[5vw]">
        <h1 className="text-[6vw] font_bold text-[#0538B9] mb-2">
          Portal Berita
        </h1>
        <p className="text-[3vw] font-semibold text-black">
          Eksekutif Mahasiswa Universitas Brawijaya
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
