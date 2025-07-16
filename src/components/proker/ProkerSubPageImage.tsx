'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import Frame from '@/assets/proker/prokerdetail-mask-shape.svg';
import FallbackImage from '@/assets/proker/mori-card-proker.svg';
import arrowrightblue from '@/assets/landingpage/icons/arrow-right-blue.svg';
import arrowleftblue from '@/assets/landingpage/icons/arrow-left-blue.svg';
import instagram from '@/assets/proker/Instagram.svg';

interface ProkerSubPageImageProps {
  imageUrl: string[] | null | undefined;
  instagramUrl?: string;
}

const ProkerSubPageImage: React.FC<ProkerSubPageImageProps> = ({ imageUrl, instagramUrl }) => {
  const images = imageUrl && imageUrl.length > 0 ? imageUrl : [FallbackImage.src];

  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="relative w-full h-[400px] md:h-[500px]">
      <button ref={prevRef} className="flex absolute z-20 left-3 md:left-8 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-md p-2 rounded-full shadow">
        <Image src={arrowleftblue} alt="Previous" className="w-3 h-3 md:w-6 md:h-6" />
      </button>
      <button ref={nextRef} className="absolute z-20 right-3 md:right-8 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-md p-2 rounded-full shadow">
        <Image src={arrowrightblue} alt="Next" className="w-3 h-3 md:w-6 md:h-6" />
      </button>

      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        loop
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          const navigation = swiper.params.navigation as {
            prevEl?: HTMLElement | null;
            nextEl?: HTMLElement | null;
          };

          navigation.prevEl = prevRef.current;
          navigation.nextEl = nextRef.current;
        }}
        modules={[Navigation]}
        className="w-full h-full"
      >
        {images.map((url, index) => (
          <SwiperSlide key={index}>
            <div
              className="w-full h-full"
              style={{
                maskImage: `url(${Frame.src})`,
                WebkitMaskImage: `url(${Frame.src})`,
                maskSize: 'contain',
                WebkitMaskSize: 'contain',
                maskRepeat: 'no-repeat',
                WebkitMaskRepeat: 'no-repeat',
                maskPosition: 'center',
                WebkitMaskPosition: 'center',
              }}
            >
              <Image src={url} fill alt={`Gambar Proker ${index + 1}`} className="object-cover" unoptimized />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="absolute z-30 translate-x-[55vw] translate-y-[-10vw] lg:translate-y-[-5vw] lg:translate-x-[45vw] flex items-center gap-2 px-3 py-1">
        <Image src={instagram} alt="Instagram Icon" className="w-5 md:w-6" />
        <a href={instagramUrl} target="_blank" className="text-[#0538B9] font-semibold text-[clamp(1vw,1.5vw,3vw)] hover:underline">
          Instagram
        </a>
      </div>
    </div>
  );
};

export default ProkerSubPageImage;
