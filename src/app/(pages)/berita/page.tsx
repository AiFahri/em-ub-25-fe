// src/app/(pages)/berita/page.tsx
'use client';

import React from 'react';
import BeritaHero from '@/components/berita/BeritaHero';
import BeritaCardsList from '@/components/berita/BeritaCardLists';
import EMagazineFlipPDF from '@/components/berita/EMagazine';
import Image from 'next/image';


const BeritaPage = () => {
  return (
    <div className="relative overflow-hidden min-h-screen">
      {/* Background Image */}
      <div className="absolute top-[30vw] left-0 w-full h-full -z-10">
        <Image
          src="/Assets/background/berita-bg.svg"
          alt="Berita Background"
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative ">
        <BeritaHero />
        <BeritaCardsList />
        <EMagazineFlipPDF />
      </div>
    </div>
  );
};

export default BeritaPage;
