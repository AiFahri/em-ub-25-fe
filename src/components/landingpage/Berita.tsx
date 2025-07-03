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

export default function Berita() {
  const { data, loading, error } = useQuery(GET_LANDING_PAGE_DATA);

  const beritaData = data?.listNews?.news ?? [];

  if (loading) return <p className="text-center">Memuat berita...</p>;
  if (error) return <p className="text-center">Gagal memuat berita.</p>;

  return (
    <section className="bg-white font-sans relative">
      <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold text-[#0538B9] mb-10 text-center">What&#39;s up right now?</h2>

      <div className="relative w-full px-4 md:px-10">
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
              <div className="relative h-fit overflow-hidden rounded-[40px]">
                <BeritaCard id={news.id} title={news.title} date={new Date(news.createdAt).toLocaleDateString('id-ID')} description={news.content} imageUrl={news.imageUrls?.[0] || ''} index={index} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="hidden md:block absolute inset-0 z-10 pointer-events-none">
          <button
            id="berita-prev"
            className="swiper-button-prev pointer-events-auto absolute left-4 top-1/2 -translate-y-14
             p-5 w-2 h-2 md:p-6 flex justify-center items-center md:w-12 md:h-12 rounded-full bg-white shadow-md transition duration-300"
          >
            <Image src={arrowleftblue} alt="Previous" className="hidden md:w-6" />
          </button>

          <button
            id="berita-next"
            className="swiper-button-next pointer-events-auto absolute right-4 top-1/2 -translate-y-14
             p-5 w-2 h-2 md:p-6 flex justify-center items-center md:w-12 md:h-12 rounded-full bg-white shadow-md transition duration-300"
          >
            <Image src={arrowrightblue} alt="Next" className="hidden md:w-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
