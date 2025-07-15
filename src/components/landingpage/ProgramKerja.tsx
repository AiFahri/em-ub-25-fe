'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import ProgramKerjaCard from './ProgramKerjaCard';
import face from '@/assets/landingpage/icons/maskot-face.svg';
import circleBlue from '@/assets/landingpage/icons/circle-blue.svg';
import circleQuarter from '@/assets/landingpage/icons/circle-quarter-blue.svg';
import k from '@/assets/landingpage/icons/k-outline.svg';
import CountUp from './CountUp';
import SkeletonProgramKerjaCard from './SkeletonProgramKerjaCard';
import { useEffect, useRef } from 'react';
import vektor33 from '@/assets/landingpage/icons/Vector33.svg';
import vektor34 from '@/assets/landingpage/icons/Vector34.svg';
import { useQuery } from '@apollo/client';
import { GET_LANDING_PAGE_DATA } from '@/graphql/queries/getLandingPageData';

const bgColorPattern = ['bg-[#0538B9]', 'bg-[#0049FF]', 'bg-[#FF4900]', 'bg-[#0049FF]', 'bg-[#0049FF]'];

export default function ProgramKerja() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { data, loading, error } = useQuery(GET_LANDING_PAGE_DATA);

  const workProgramsData = data?.listWorkPrograms?.workPrograms ?? [];
  useEffect(() => {
    let animationFrameId: number;

    const scroll = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollLeft += 0.5;
        if (scrollRef.current.scrollLeft >= scrollRef.current.scrollWidth - scrollRef.current.clientWidth) {
          scrollRef.current.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const slideLeft = {
    hidden: { opacity: 0, x: -80, scale: 0.8 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 1, ease: 'easeOut' },
    },
  };

  const slideRight = {
    hidden: { opacity: 0, x: 80 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1, ease: 'easeOut', delay: 0.4 },
    },
  };

  const bounceUp = {
    hidden: { opacity: 0, y: 60 },
    visible: (i: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.3 + 0.6,
        duration: 0.8,
        ease: 'backOut',
      },
    }),
  };

  if (loading) {
    return (
      <section className="py-10 px-3 md:px-6 lg:px-[5vh] font-sans">
        <div className="flex justify-center mb-12">
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold text-[#0538B9] text-center animate-pulse">Program Kerja</h2>
        </div>

        <div className="flex gap-6 overflow-x-auto scrollbar-hide px-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonProgramKerjaCard key={i} />
          ))}
        </div>
      </section>
    );
  }

  if (error) return <p className="text-center">Gagal memuat Program Kerja.</p>;

  return (
    <section className="py-10 px-3 md:px-6 lg:px-[5vh] font-sans overflow-hidden">
      <style>{`
                @keyframes shake {
                    0%, 100% { transform: rotate(0deg); }
                    25% { transform: rotate(-10deg); }
                    75% { transform: rotate(10deg); }
                }
                .animate-shake {
                    animation: shake 0.5s ease-in-out infinite;
                }
            `}</style>
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="flex justify-center flex-col md:px-20">
        <div className="relative flex flex-col lg:flex-row items-center justify-center gap-8 mb-24 md:mb-32 font-[NeueHaasDisplay]">
          <motion.div variants={slideLeft} className="order-2 lg:order-1 relative w-[80vw] max-w-[480px] aspect-[16/10] h-auto flex-shrink-0">
            <Image
              src={k}
              alt="shape"
              className="absolute
      w-[30%] sm:w-[150px] md:w-[170px] lg:w-[165px]
      top-[40px] sm:top-[48px] md:top-[64px] lg:top-20
      left-[14%] sm:left-[60px] md:left-[32px] lg:left-5"
            />
            <Image
              src={circleBlue}
              alt="circle blue"
              className="absolute
      w-[40%] sm:w-[180px] md:w-[200px] lg:w-[240px]
      top-[0px] sm:top-[0px] md:top-[0px]
      right-[14%] sm:right-[15%] md:right-[32px] lg:right-10"
            />
            <Image
              src={face}
              alt="maskot"
              className="absolute
      w-[90px] sm:w-[120px] md:w-[130px] lg:w-[170px]
      top-[80px] sm:top-[96px] md:top-[104px] lg:top-32
      right-[10%] sm:right-[10%] md:right-[40px] lg:right-5
      z-10"
            />
            <Image
              src={circleQuarter}
              alt="half circle"
              className="absolute
      w-[30%] sm:w-[120px] md:w-[140px] lg:w-[140px]
      -bottom-[14%] sm:bottom-[0%] md:-bottom-[30px] lg:-bottom-20
      right-[30%] sm:right-[32%] md:right-[120px] lg:right-36"
            />
            <button
              className="absolute z-20 transition font-semibold font-[poppins] hover:brightness-110
      text-[12px] sm:text-[14px] md:text-[16px] lg:text-[clamp(14px,1.3vw,19px)]
      px-[20px] sm:px-[24px] md:px-[28px] lg:px-7
      py-[10px] sm:py-[12px] md:py-[14px] lg:py-4
      bg-[#FF4900] text-white rounded-full
      bottom-[0%] sm:bottom-[35px] md:bottom-[10px] lg:-bottom-10
      left-[15%] sm:left-[20%] md:left-[80px] lg:left-14"
            >
              Lihat Selengkapnya
            </button>
          </motion.div>

          <motion.div variants={slideRight} className="order-1 lg:order-2 flex-1 justify-center items-center text-center lg:text-left">
            <h2 className="text-[clamp(5vw,8vw,50px)] font-black leading-tight">
              <span className="text-[#0538B9]">Program kerja mega besar,</span>
              <span className="text-[#BACEFF]"> dari kami untuk mahasiswa Brawijaya.</span>
            </h2>
          </motion.div>
        </div>

        <motion.div className="flex flex-row justify-center xl:justify-between items-end mb-16 text-center font-[NeueHaasDisplay] gap-6 md:gap-8 px-4">
          {[
            { target: 10, label: 'Program Kerja Mega Besar' },
            { target: 17, label: 'Kementerian & Biro' },
            { target: 550, label: 'Fungsionaris Terlibat' },
          ].map((item, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={bounceUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="min-w-[90px] md:min-w-[150px] lg:min-w-[180px] xl:w-full flex flex-col justify-between items-center"
            >
              <h3 className="text-[#FF4900] font-bold leading-none text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] xl:text-[8rem]">
                <span className="inline-flex items-center overflow-hidden">
                  <CountUp target={item.target} />
                  {item.label === 'Fungsionaris Terlibat' && <span className="pl-1">+</span>}
                </span>
              </h3>

              <div className="min-h-[3.5rem] sm:min-h-[3.8rem] md:min-h-[4rem] lg:min-h-[4.2rem] xl:min-h-[4.5rem] flex items-start justify-center text-center">
                {item.label === 'Program Kerja Mega Besar' ? (
                  <p className="text-black font-medium text-[12px] md:text-lg lg:text-xl xl:text-3xl leading-tight">
                    Program Kerja
                    <br />
                    Mega Besar
                  </p>
                ) : (
                  <p className="text-black font-medium text-[12px] md:text-lg lg:text-xl xl:text-3xl leading-tight">{item.label}</p>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <div className="relative">
        <Image src={vektor34} alt="vektor34" className=" w-[100px] md:w-[200px] lg:w-[250px] absolute left-[0%] -top-[10%] pointer-events-none z-10" />

        <div ref={scrollRef} className="overflow-x-auto scrollbar-hide relative z-20">
          <div className="flex gap-6 md:mt-10 md:px-4 w-max">
            {[...workProgramsData, ...workProgramsData].map((workProgram, i) => (
              <ProgramKerjaCard
                index={i}
                key={`${workProgram.id}-${i}`}
                title={workProgram.title}
                description={workProgram.content}
                kementerian={workProgram.ministryID}
                bgColor={bgColorPattern[i % bgColorPattern.length]}
                slug={workProgram.slug}
              />
            ))}
          </div>
        </div>

        <Image src={vektor33} alt="vektor33" className=" w-[150px] md:w-[200px] lg:w-[300px] absolute -bottom-[12%] -right-[2%] pointer-events-none z-10" />
      </div>
    </section>
  );
}
