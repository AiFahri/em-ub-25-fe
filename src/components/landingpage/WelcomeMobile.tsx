'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import MoriExpressionList from './MoriExpressionList';
import { motion } from 'framer-motion';
import gemay from '@/assets/landingpage/icons/gemay.svg';
import bubblechat from '@/assets/landingpage/background/bubblechat.svg';
import ellipseorange from '@/assets/landingpage/icons/ellipse-orange.svg';
import line from '@/assets/landingpage/icons/Line.svg';
import calendarIcon from '@/assets/landingpage/icons/calendar.svg';
import s from '@/assets/landingpage/icons/s.svg';
import MoriFrameMobile from './MoriFrameMobile';
import ciclelightblue from '@/assets/landingpage/icons/eclipselightblue.svg';
import oneshape from '@/assets/landingpage/icons/1shape.svg';
import ArrowUpRight from '@/assets/landingpage/icons/arrow-up-right.svg';
import whitelogo from '../../../public/Assets/logo/whitelogo.svg';
import Typewriter from 'typewriter-effect';

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

export default function WelcomeMobile() {
  const [expression, setExpression] = useState<'gembira' | 'semangat' | 'bangga'>('gembira');

  return (
    <motion.section initial="hidden" animate="show" viewport={{ once: true, amount: 0.3 }} variants={fadeUp} className="w-full flex justify-center px-4 sm:px-8 pt-6 pb-10">
      <div className="max-w-[600px] sm:max-w-[700px]">
        <motion.div custom={0} variants={fadeUp} className="text-start mb-4">
          <h2 className="text-[clamp(5vw,8vw,5.8vw)] leading-3 text-black font-medium">Selamat Datang,</h2>
          <h2 className="text-[clamp(12vw,15vw,13vw)] font-bold text-[#0538B9]">Sobat Mori!</h2>
        </motion.div>

        <motion.div custom={1} variants={fadeUp} className="w-full flex justify-center mb-2">
          <div className="relative w-full aspect-square">
            <motion.div custom={2} variants={fadeUp} className="absolute top-[15%] right-0 w-[60%] z-20">
              <div className="relative items-center px-5 sm:px-10 py-2 sm:py-3">
                <Image src={bubblechat} alt="chat" fill className="object-contain" />
                <div className="relative z-10 text-white text-[clamp(2.5vw,4vw,2rem)] font-semibold text-center whitespace-nowrap overflow-hidden">
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

            <motion.div custom={3} variants={fadeUp} className="absolute top-[-10%] right-[0%] md:top-[-12%] md:right-[-13%] z-10">
              <motion.div
                whileHover={{
                  scale: 1.15,
                  boxShadow: '0 0 30px rgba(255, 73, 0, 0.6)',
                  y: -4,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 15,
                }}
                className="bg-[#FF4900] flex items-center justify-center rounded-full w-[18vw] h-[18vw] sm:w-[120px] sm:h-[120px] p-2 md:p-4"
              >
                <motion.img src={ArrowUpRight.src} alt="arrow" className="w-[8vw] sm:w-[40px]" whileHover={{ rotate: 360 }} transition={{ duration: 0.6, ease: 'easeInOut' }} />
              </motion.div>
            </motion.div>

            <MoriFrameMobile expression={expression} />
            <Image src={gemay} alt="dekor" className="absolute top-[10%] left-[5%] w-[25%] z-10" />
            <Image src={ciclelightblue} alt="dekor" className="absolute bottom-[25%] right-[5%] w-[13%] sm:w-[13%] z-10" />
            <Image src={oneshape} alt="dekor" className="absolute top-[48%] right-2 w-[6%] sm:w-[7%] z-10" />
          </div>
        </motion.div>

        <motion.div custom={4} variants={fadeUp} className="w-full flex flex-col items-center mb-2">
          <h3 className="bg-[#FF4900] text-white text-2xl font-semibold px-4 py-2 rounded-full mb-4">Ekspresi Mori</h3>
          <MoriExpressionList current={expression} onSelect={setExpression} />
        </motion.div>

        <motion.div custom={5} variants={fadeUp} className="relative w-full mb-20">
          <div className="inverted-radius-descmori min-h-[300px] px-6 pt-6 pb-10 sm:pb-12">
            <div className="text-[#002787] text-lg sm:text-xl px-6 leading-relaxed font-[NeueHaasDisplay] text-end">
              <p>Mori adalah teman kecilmu yang siap memandu petualangan seru di dunia EM UB 2025. Mau mencari info kegiatan? Dokumentasi kece? Atau sekadar kepo sama EM UB? </p>
              <p className="mt-4 pl-[3rem]">Tenang saja, Mori siap nemenin kamu keliling. Ayo klik-klik bareng Mori, ya. Jangan takut nyasar, soalnya Mori hafal semua jalan di sini!</p>
            </div>
          </div>

          <div className="absolute bottom-0 left-2 w-[80px] h-[80px] bg-[#0049FF] rounded-full flex items-center justify-center shadow-md z-30">
            <Image src={whitelogo} alt="Logo EM UB (Bottom Left)" width={60} height={60} />
          </div>
        </motion.div>

        <motion.div custom={6} variants={fadeUp} className="relative w-full flex px-2 sm:px-4">
          <div className="relative w-full max-w-[300px] sm:minw-[350px] sm:max-w-[400px] border-4 border-[#0538B9] rounded-full py-6 px-4 sm:px-6 flex items-center gap-4 bg-white">
            <div className="shrink-0">
              <Image src={calendarIcon} alt="calendar" className="w-10 h-10  sm:w-13 sm:h-13" />
            </div>

            <div className="flex flex-col justify-center">
              <p className="text-[32px] sm:text-[48px] font-bold text-[#0538B9] leading-none">2025</p>
              <p className="text-[#0538B9] text-[14px] sm:text-[24px] leading-tight font-semibold">
                Kabinet <span className="font-bold">Simpul Memori</span>
              </p>
            </div>

            <div className="absolute -top-[60px] left-[70px] sm:left-[100px] w-[100px] sm:w-[120px] z-20">
              <Image src={s} alt="s" />
            </div>
            <div className="absolute top-[-17px] sm:top-[-20px] right-[10px] sm:right-[40px] w-[100px] sm:w-[120px] overflow-x-hidden z-20">
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
            <div className="absolute top-5 right-[-90px] sm:right-[-110px] w-[80px] sm:w-[100px] z-20">
              <Image src={ellipseorange} alt="ellipseorange" />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
