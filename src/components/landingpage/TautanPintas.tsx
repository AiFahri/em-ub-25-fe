'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';
import arrowUpRight from '@/assets/landingpage/icons/arrow-up-right.svg';
import arrowrightblue from '@/assets/landingpage/icons/arrow-right-blue.svg';
import SkeletonTautanPintas from './SkeleteonTautanPintas';
import arrowleftblue from '@/assets/landingpage/icons/arrow-left-blue.svg';
import { GET_LANDING_PAGE_DATA } from '@/graphql/queries/getLandingPageData';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const bgColors = ['#FF4900', '#0049FF', '#0538B9'];
const overlayColors = ['#FF7C48', '#3A73FF', '#002787'];

export default function TautanPintas() {
  const { data, loading, error } = useQuery(GET_LANDING_PAGE_DATA);

  const tautanPintasData = data?.listLinks?.links ?? [];
  const router = useRouter();
  const sectionVariant = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      rotateX: 15,
      y: 100,
    },
    visible: {
      opacity: 1,
      scale: [0.8, 1.02, 0.97, 1],
      rotateX: [15, 0],
      y: [100, -20, 10, 0],
      transition: {
        duration: 1.4,
        ease: [0.2, 0.8, 0.2, 1],
      },
    },
  };

  if (loading) return <SkeletonTautanPintas />;
  if (error) return <p className="text-center">Gagal memuat tautan pintas.</p>;
  return (
    <motion.section variants={sectionVariant} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="py-12 px-4 md:px-10 w-full relative">
      <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold text-center text-[#0538B9] mb-10 md:mb-16">Tautan Pintas</h2>

      <div className="relative">
        <div className="hidden md:block absolute inset-0 z-30 pointer-events-none">
          <button
            id="slider-button-left"
            className="swiper-button-prev group pointer-events-auto absolute left-4 top-1/2 -translate-y-1/2 
          min-w-[clamp(36px,4vw,56px)] min-h-[clamp(36px,4vw,56px)]
          flex justify-center items-center rounded-full
          transition-all duration-500 bg-white shadow-lg hover:shadow-xl 
          hover:scale-110 active:scale-95 z-30"
          >
            <Image src={arrowleftblue} alt="Previous" className="w-[clamp(16px,2vw,28px)] h-auto" />
          </button>

          <button
            id="slider-button-right"
            className="swiper-button-next group pointer-events-auto absolute right-4 top-1/2 -translate-y-1/2 
          min-w-[clamp(36px,4vw,56px)] min-h-[clamp(36px,4vw,56px)]
          flex justify-center items-center rounded-full
          transition-all duration-500 bg-white shadow-lg hover:shadow-xl 
          hover:scale-110 active:scale-95 z-30"
          >
            <Image src={arrowrightblue} alt="Next" className="w-[clamp(16px,2vw,28px)] h-auto" />
          </button>
        </div>

        <div className={`swiper multiple-slide-carousel swiper-container relative z-10`}>
          <Swiper
            modules={[Navigation]}
            loop={true}
            navigation={{
              nextEl: '#slider-button-right',
              prevEl: '#slider-button-left',
            }}
            spaceBetween={28}
            breakpoints={{
              0: { slidesPerView: 1.7 },
              640: { slidesPerView: 2.5 },
              1024: { slidesPerView: 3 },
              1600: { slidesPerView: 4 },
            }}
            className="swiper-wrapper mb-16"
          >
            {tautanPintasData.map((links: any, i: any) => (
              <SwiperSlide key={links.id}>
                <div onClick={() => router.push(`${links.url}`)} className="cursor-pointer relative h-[200px] lg:h-[320px] overflow-hidden rounded-[30px] group">
                  <div className="absolute inset-0" style={{ backgroundColor: overlayColors[i % overlayColors.length], zIndex: 0 }} />

                  <div
                    className={`absolute inset-0 flex items-end p-8 z-10
                  rounded-tr-[80%] text-white font-semibold text-2xl md:text-3xl lg:text-4xl
                  bg-[${bgColors[i % bgColors.length]}]
                  top-14 md:top-10 lg:top-20 lg:right-20 right-10
                  transform group-hover:scale-120 lg:group-hover:scale-140 md:scale-100
                  transition-all duration-300 ease-in-out`}
                  >
                    <div className="absolute top-[-5vw] right-[-1vw] md:right-[-1vw] md:-top-4 lg:-top-8 lg:right-[-0.8vw] z-20">
                      <Image
                        src={arrowUpRight}
                        alt="Arrow up right"
                        className="w-10 h-10 md:w-[6vw] md:h-[6vw] xl:w-[5vw] xl:h-[5vw] transform scale-100 group-hover:scale-50 lg:group-hover:scale-50 transition-all duration-300 ease-in-out"
                      />
                    </div>
                  </div>

                  <div className="absolute inset-0 top-10 md:top-10 lg:top-20 lg:right-20 flex items-end p-8 z-20 pointer-events-none">
                    <a href={links.url} className="block text-[18px] md:text-2xl lg:text-4xl font-semibold text-white line-clamp-3">
                      {links.title}
                    </a>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </motion.section>
  );
}
