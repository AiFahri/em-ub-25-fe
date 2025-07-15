'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function SkeletonTautanPintas() {
  return (
    <section className="py-12 px-4 md:px-10 w-full relative">
      <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold text-center text-[#0538B9] mb-10 md:mb-16 animate-pulse">Tautan Pintas</h2>

      <Swiper
        spaceBetween={28}
        slidesPerView={3}
        breakpoints={{
          0: { slidesPerView: 1.7 },
          640: { slidesPerView: 2.5 },
          1024: { slidesPerView: 3 },
          1600: { slidesPerView: 4 },
        }}
        className="swiper-wrapper mb-16"
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <SwiperSlide key={i}>
            <div className="h-full px-2">
              {' '}
              <div className="relative h-[200px] lg:h-[320px] rounded-[30px] overflow-hidden bg-gray-200 animate-pulse shadow-md">
                <div className="absolute inset-0 bg-gray-300 opacity-50" />
                <div className="absolute top-6 right-6 w-10 h-10 md:w-14 md:h-14 bg-gray-400 rounded-full z-10" />
                <div className="absolute bottom-6 left-6 h-6 md:h-8 w-3/4 bg-gray-400 rounded z-10" />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
