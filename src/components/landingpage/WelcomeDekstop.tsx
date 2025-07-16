'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import MoriFrame from './MoriFrame';
import MoriExpressionList from './MoriExpressionList';
import ArrowUpRight from '@/assets/landingpage/icons/arrow-up-right.svg';
import gemay from '@/assets/landingpage/icons/gemay.svg';
import gemay2 from '@/assets/landingpage/icons/gemay-2.svg';
import Typewriter from 'typewriter-effect';
import calendarIcon from '@/assets/landingpage/icons/calendar.svg';
import bubblechat from '@/assets/landingpage/background/bubblechat.svg';
import logo from '@/assets/logo/logoEM.svg';
import borderkalender from '@/assets/landingpage/background/border-kalender.svg';
import eclipse from '@/assets/landingpage/icons/welcome-eclipse.svg';
import decor from '@/assets/landingpage/icons/welcome-decor-1.svg';
import line from '@/assets/landingpage/icons/Line.svg';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
      delay: i * 0.2,
    },
  }),
};

export default function WelcomeDesktop() {
  const [expression, setExpression] = useState<'gembira' | 'semangat' | 'bangga'>('gembira');

  return (
    <motion.section initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="relative w-full px-4 md:px-16 py-10 flex flex-col gap-14 items-center bg-white">
      <div className="flex flex-col md:flex-row items-start w-full relative">
        <motion.div custom={1} variants={fadeUp} className="absolute z-10 top-[-4vw] left-[33vw]">
          <motion.div whileHover={{ scale: 1.1, y: -3 }} transition={{ type: 'spring', stiffness: 300, damping: 15 }} className="bg-[#FF4900] flex items-center justify-center rounded-full w-[9vw] h-[9vw] p-4">
            <motion.img src={ArrowUpRight.src} alt="arrow" className="w-[4vw]" whileHover={{ rotate: 360 }} transition={{ duration: 0.6, ease: 'easeInOut' }} />
          </motion.div>
        </motion.div>

        <motion.div custom={2} variants={fadeUp} className="flex flex-col gap-6 relative items-center md:items-start w-full md:w-[45%]">
          <div className="relative w-full">
            <MoriFrame expression={expression} />

            <motion.div custom={3} variants={fadeUp} className="absolute top-[7vw] left-[18vw] z-10">
              <div className="relative w-[25vw] h-[10vw] flex items-center justify-center">
                <Image src={bubblechat} alt="Halo Bubble" fill className="object-contain" />
                <div className="absolute text-white text-[clamp(1vw,2vw,4vw)] font-semibold px-4 text-center whitespace-nowrap overflow-hidden">
                  <Typewriter
                    onInit={(typewriter) => {
                      typewriter.typeString('Halo, aku adalah Mori!').pauseFor(1500).deleteAll().start();
                    }}
                    options={{
                      loop: true,
                      delay: 75,
                      deleteSpeed: 50,
                      cursor: '',
                    }}
                  />
                </div>
              </div>
            </motion.div>

            <motion.div whileHover={{ rotate: [0, -8, 8, -6, 6, -4, 4, 0] }} transition={{ duration: 1.5, ease: 'easeInOut' }} className="absolute top-[4vw] left-[6vw] z-20 md:w-[10vw]">
              <Image src={gemay} alt="dekor" className="w-full h-full object-contain" />
            </motion.div>

            <motion.div whileHover={{ x: [0, -10, 10, -8, 8, -4, 4, 0] }} transition={{ duration: 1.5, ease: 'easeInOut' }} className="absolute bottom-[8vw] -right-[5vw] z-20 w-[8vw]">
              <Image src={gemay2} alt="dekor" className="w-full h-full object-contain" />
            </motion.div>
          </div>

          <motion.div custom={4} variants={fadeUp} className="relative mt-10 w-[40vw] md:h-[25vw]">
            <Image src={borderkalender} alt="Border Kalender" fill className="object-contain" />
            <div className="w-full pl-[5vw] flex items-center justify-between h-full font-[NeueHaasDisplay]">
              <div className="flex flex-col justify-center mt-5">
                <p className="text-[7vw] font-bold text-[#0538B9] leading-none">2025</p>
                <div className="flex items-center -translate-y-3 gap-x-10">
                  <p className="text-[#0538B9] font-semibold text-[2vw] leading-tight">
                    Kabinet <span className="font-bold">Simpul Memori</span>
                  </p>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5, y: 30 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.7, type: 'spring', bounce: 0.6 }}
                    viewport={{ once: true }}
                  >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5, y: 30 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.7, type: 'spring', bounce: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <Image src={calendarIcon} alt="calendar" className="w-[4vw]" />
                  </motion.div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div custom={5} variants={fadeUp} className="flex flex-col items-center md:items-end gap-6 w-full">
          <div className="w-full flex justify-end font-[NeueHaasDisplay]">
            <motion.h2 custom={6} variants={fadeUp} className="text-black text-[clamp(2.5vw,3vw,6vw)] font-bold flex flex-col">
              <span className="flex flex-wrap gap-x-2">
                {['Selamat', 'datang,'].map((word, i) => (
                  <motion.span
                    key={word}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.2 }}
                    viewport={{ once: true }}
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
              <span className="flex flex-wrap gap-x-2">
                {['Sobat', 'Mori!'].map((word, i) => (
                  <motion.span
                    key={word}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 + i * 0.2 }}
                    viewport={{ once: true }}
                    className={i === 0 ? "text-[#0538B9] text-[clamp(7vw,6vw,7vw)]" : "text-[#0538B9] text-[clamp(7vw,6vw,7vw)]"}
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
            </motion.h2>
          </div>

          <motion.div custom={7} variants={fadeUp} className="flex flex-col items-end gap-4 w-full max-w-screen-md mx-auto">
            <h3 className="bg-[#FF4900] text-white font-medium font-[NeueHaasDisplay] text-[clamp(1.2vw,3vw,4vw)] px-6 py-2 rounded-full">Ekspresi Mori</h3>
            <MoriExpressionList current={expression} onSelect={setExpression} />
          </motion.div>

          <motion.div custom={8} variants={fadeUp} className="relative w-[35vw] -translate-y-[30px] rounded-[40px] z-10">
            <div className="absolute w-[18vw] h-[8vw] top-[3vw] right-[36vw] bg-[#0049FF] py-2 rounded-[10vw] flex items-center  z-10">
              <Image src={logo} alt="Logo" className=" px-3 mt-[1vw] w-[15vw] mx-auto" />
            </div>
            <div className="z-20 inverted-radius-descmori min-h-[10vw] px-6 pt-6 pb-10 sm:pb-12">
              <motion.div
                className="text-[#002787] text-[clamp(1vw,1.5vw,2vw)] px-6 leading-relaxed font-[NeueHaasDisplay] text-end"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={{
                  hidden: {},
                  visible: {
                    transition: { staggerChildren: 0.22 },
                  },
                }}
              >
                <motion.p
                  variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}
                >
                  Mori adalah teman kecilmu yang siap memandu petualangan seru di dunia EM UB 2025. Mau mencari info kegiatan? Dokumentasi kece? Atau sekadar kepo sama EM UB?
                </motion.p>
                <motion.p
                  className="mt-4 pl-[3rem]"
                  variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}
                >
                  Tenang saja, Mori siap nemenin kamu keliling. Ayo klik-klik bareng Mori, ya. Jangan takut nyasar, soalnya Mori hafal semua jalan di sini!
                </motion.p>
              </motion.div>
            </div>
            <Image src={eclipse} alt="Eclipse dekor" className="absolute bottom-[3vw] left-[-2vw] w-[5vw]" />
            <div className="absolute inset-0 -z-10">
              <div className="absolute bottom-[-3vw] right-[5vw] z-0">
                <div className="relative w-[8vw] h-[1vw] overflow-hidden">
                  <motion.img
                    src={line.src}
                    alt="Line dekor"
                    className="w-full h-full"
                    initial={{ x: '100%' }}
                    animate={{ x: ['100%', '-100%'] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: 'loop',
                      ease: 'linear',
                    }}
                  />
                </div>
              </div>
              <Image src={decor} alt="Decor" className="absolute bottom-[-5.8vw] right-[19vw] w-[8vw]" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
