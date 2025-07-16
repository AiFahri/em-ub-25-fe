'use client';

import React from 'react';
import Image from 'next/image';
import CardBgSVGOrange from '@/assets/proker/prokercard-bg.svg';
import CardBgSVGBlue from '@/assets/proker/prokercard-bg-blue.svg';
import CardBgSVGDarkBlue from '@/assets/proker/prokercard-bg-darkblue.svg';
import { cn } from '@/lib/utils';
import { ImageIcon } from 'lucide-react';

interface ProkerCardMainProps {
  title: string;
  type: 'Open Recruitment' | 'Mega Besar';
  department: string;
  imageUrl?: string;
}

const ProkerCardMain: React.FC<ProkerCardMainProps> = ({ title, type, department, imageUrl }) => {
  const variants = ['blue', 'orange', 'darkBlue'];
  const slugHash = Math.abs(title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0));
  const variantIndex = slugHash % variants.length;
  const randomVariant = variants[variantIndex];

  const getColors = (variant: string) => {
    switch (variant) {
      case 'blue':
        return {
          bgColor: 'bg-[#0047FF]',
          departmentTextColor: 'text-[#0047FF]',
          borderColor: 'border-[#0047FF]',
          bgSVG: CardBgSVGBlue,
          shadowClass: 'hover:shadow-xl hover:shadow-blue-500/40',
        };
      case 'orange':
        return {
          bgColor: 'bg-[#FF4C00]',
          departmentTextColor: 'text-[#FF4C00]',
          borderColor: 'border-[#FF4C00]',
          bgSVG: CardBgSVGOrange,
          shadowClass: 'hover:shadow-xl hover:shadow-orange-500/40',
        };
      case 'darkBlue':
        return {
          bgColor: 'bg-[#1E3A8A]',
          departmentTextColor: 'text-[#1E3A8A]',
          borderColor: 'border-[#1E3A8A]',
          bgSVG: CardBgSVGDarkBlue,
          shadowClass: 'hover:shadow-xl hover:shadow-blue-900/40',
        };
      default:
        return {
          bgColor: 'bg-[#0047FF]',
          departmentTextColor: 'text-[#0047FF]',
          borderColor: 'border-[#0047FF]',
          bgSVG: CardBgSVGBlue,
          shadowClass: 'hover:shadow-xl hover:shadow-blue-500/40',
        };
    }
  };

  const { bgColor, departmentTextColor, borderColor, bgSVG, shadowClass } = getColors(randomVariant);

  return (
    <div className={cn('w-full h-[350px] lg:h-[400px] rounded-4xl overflow-hidden flex flex-col', 'transition-all duration-300 ease-in-out transform hover:-translate-y-2', shadowClass)}>
      {/* Area Gambar (tidak berubah) */}
      <div className={cn('w-full aspect-video flex items-center justify-center overflow-hidden border-t-2 border-x-2 rounded-t-4xl', borderColor)}>
        {imageUrl ? (
          <Image src={imageUrl} alt={title} width={400} height={225} className="w-full h-full object-cover" />
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-400">
            <ImageIcon size={64} />
            <span className="mt-2 text-base">No Image</span>
          </div>
        )}
      </div>

      {/* Footer */}

      <div className={cn('relative border-x-2 border-b-2 rounded-b-4xl p-5 flex-1 flex flex-col', borderColor, bgColor)}>
        {/* Background pattern (tidak berubah) */}
        <div className="absolute inset-0">
          <Image src={bgSVG} alt="Background Pattern" fill className="object-cover opacity-80" />
        </div>

        {/* Konten */}

        <div className="relative z-10 flex flex-col justify-between h-full">
          {/* Bagian Atas: Type */}
          <div>
            <div className="flex justify-end">
              <span className="bg-white bg-opacity-90 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">{type}</span>
            </div>
          </div>

          {/* Bagian Bawah: Title & Department */}
          <div className="mt-3">
            <h3 className="text-white font-bold text-xl md:text-2xl leading-tight mb-3">{title}</h3>
            <div className="flex justify-start">
              <span className={cn('bg-white px-4 py-1.5 rounded-full text-base font-bold', departmentTextColor)}>{department}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProkerCardMain;
