'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import BeritaCard from './BeritaCard';
import { beritaData } from '@/data/beritaData';
import Image from 'next/image';
import arrowrightblue from '@/assets/landingpage/icons/arrow-right-blue.svg';
import arrowleftblue from '@/assets/landingpage/icons/arrow-left-blue.svg';
import { useQuery } from '@apollo/client';
import { GET_LANDING_PAGE_DATA } from '@/graphql/queries/getLandingPageData';
import { motion } from 'framer-motion';
import SkeletonBeritaCard from './SkeletonBeritaCard';

export default function Berita() {
  const { data, loading, error } = useQuery(GET_LANDING_PAGE_DATA);

  const beritaData = data?.listNews?.news ?? [];
  const titleVariant = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: 'spring', duration: 1, bounce: 0.4 },
    },
  };

  const carouselVariant = {
    hidden: { y: 100, scale: 0.95, opacity: 0 },
    visible: {
      y: 0,
      scale: 1,
      opacity: 1,
      transition: { type: 'spring', duration: 1.2, delay: 0.2 },
    },
  };

  if (loading) {
    return (
      <section className="bg-white font-sans relative">
        <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold text-[#0538B9] mb-10 text-center animate-pulse">What&#39;s up right now?</h2>

        <div className="relative w-full px-4 md:px-10">
          <Swiper
            modules={[Navigation]}
            loop={false}
            breakpoints={{
              0: {
                slidesPerView: 1.5,
                spaceBetween: 8,
              },
              640: {
                slidesPerView: 2.5,
                spaceBetween: 12,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1600: {
                slidesPerView: 4,
                spaceBetween: 28,
              },
            }}
            className="mb-16"
          >
            {Array.from({ length: 4 }).map((_, i) => (
              <SwiperSlide key={i}>
                <div className="relative h-fit">
                  <SkeletonBeritaCard index={i} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    );
  }
  if (error) return <p className="text-center">Gagal memuat berita.</p>;
  console.log(beritaData);

  return (
    <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="bg-white font-sans relative">
      <motion.h2 variants={titleVariant} className="text-4xl md:text-6xl lg:text-8xl font-bold text-[#0538B9] mb-10 text-center">
        What&#39;s up right now?
      </motion.h2>

      <motion.div variants={carouselVariant} className="relative w-full px-4 md:px-10">
        <Swiper
          modules={[Navigation]}
          loop={true}
          navigation={{
            nextEl: '#berita-next',
            prevEl: '#berita-prev',
          }}
          breakpoints={{
            0: {
              slidesPerView: 1.5,
              spaceBetween: 8,
            },
            640: {
              slidesPerView: 2.5,
              spaceBetween: 12,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1600: {
              slidesPerView: 4,
              spaceBetween: 28,
            },
          }}
          className="mb-16"
        >
          {beritaData.map((news: any, index: any) => (
            <SwiperSlide key={news.id}>
              <div className="relative h-fit">
                <BeritaCard id={news.id} title={news.title} date={new Date(news.createdAt).toLocaleDateString('id-ID')} description={news.content} imageUrl={news.imageUrls?.[0] || ''} index={index} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="hidden md:block absolute inset-0 z-10 pointer-events-none">
          <button
            id="berita-prev"
            className="swiper-button-prev pointer-events-auto absolute left-4 top-1/2 translate-x-[2vw] -translate-y-[5vw]
        min-w-[clamp(36px,4vw,56px)] min-h-[clamp(36px,4vw,56px)]
        flex justify-center items-center rounded-full
        transition-all duration-500 bg-white shadow-lg hover:shadow-xl 
        hover:scale-110 active:scale-95 z-30"
          >
            <Image src={arrowleftblue} alt="Previous" className="w-[clamp(16px,2vw,28px)] h-auto" />
          </button>

          <button
            id="berita-next"
            className="swiper-button-next pointer-events-auto absolute right-4 -translate-x-[2vw] top-1/2 -translate-y-[5vw]
        min-w-[clamp(36px,4vw,56px)] min-h-[clamp(36px,4vw,56px)]
        flex justify-center items-center rounded-full
        transition-all duration-500 bg-white shadow-lg hover:shadow-xl 
        hover:scale-110 active:scale-95 z-30"
          >
            <Image src={arrowrightblue} alt="Next" className="w-[clamp(16px,2vw,28px)] h-auto" />
          </button>
        </div>
      </motion.div>
    </motion.section>
  );
}
