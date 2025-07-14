// components/Proker/ProkerSideCard.tsx
'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import CardBgSVGBlue from '@/assets/proker/prokercard-bg-blue.svg';
import CardBgSVGOrange from '@/assets/proker/prokercard-bg.svg';
import CardBgSVGDarkBlue from '@/assets/proker/prokercard-bg-darkblue.svg';

interface ProkerSideCardProps {
  title: string;
  type: 'Open Recruitment' | 'Mega Besar';
  department: string;
}

// Objek untuk menyimpan semua properti varian warna.
const colorVariants = {
  blue: {
    bgColor: 'bg-[#0049FF]',
    textColor: 'text-[#0049FF]',
    shadowClass: 'hover:shadow-[0_8px_15px_rgba(5,56,185,0.4)]',
    svg: CardBgSVGBlue,
  },
  orange: {
    bgColor: 'bg-[#FF4900]',
    textColor: 'text-[#FF4900]',
    shadowClass: 'hover:shadow-[0_8px_15px_rgba(255,73,0,0.4)]',
    svg: CardBgSVGOrange,
  },
  darkblue: {
    bgColor: 'bg-[#0538B9]',
    textColor: 'text-[#0538B9]',
    shadowClass: 'hover:shadow-[0_8px_15px_rgba(5,56,185,0.4)]',
    svg: CardBgSVGDarkBlue,
  },
};

const ProkerSideCard: React.FC<ProkerSideCardProps> = ({ title, type, department }) => {
  
  // --- PERUBAHAN DI SINI ---
  // Logika diubah untuk memilih warna secara acak dari semua varian yang ada.
  const availableVariants: ('blue' | 'orange' | 'darkblue')[] = ['blue', 'orange', 'darkblue'];
  const randomIndex = Math.floor(Math.random() * availableVariants.length);
  const variant = availableVariants[randomIndex];
  // --- BATAS PERUBAHAN ---

  // Ambil set properti warna yang sesuai dari objek colorVariants
  const currentVariant = colorVariants[variant];

  return (
    <div className={cn(
      "relative w-full p-5  rounded-4xl text-white overflow-hidden  duration-500 ease-in-out", 
      currentVariant.bgColor, 
      currentVariant.shadowClass
    )}>
      <Image 
        src={currentVariant.svg} 
        alt="card pattern" 
        fill 
        className="absolute inset-0 object-cover" 
      />
      <div className="relative z-10 flex flex-col gap-2">
        <div className="flex justify-end text-sm font-semibold">
          <span>{type}</span>
        </div>
        <div className="font-bold text-lg max-w-[200px]">
          <p>{title}</p>
        </div>
        <div>
          <span className={cn(
            "inline-block bg-white px-3 py-1 rounded-full text-sm font-semibold", 
            currentVariant.textColor
          )}>
            {department}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProkerSideCard;