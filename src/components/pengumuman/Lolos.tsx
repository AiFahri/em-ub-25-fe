'use client';
import Image from 'next/image';
import confetti from '@/assets/pengumuman/background/confetti.svg';
import bubblechat from '@/assets/pengumuman/icon/bubblechat.svg';
import mori from '@/assets/pengumuman/icon/moriterima.png';
import o from '@/assets/pengumuman/icon/o.svg';
import kado from '@/assets/pengumuman/icon/kado.svg';
import tutupkado from '@/assets/pengumuman/icon/tutupkado.svg';
import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';

const Lolos = () => {
  const [isExit, setIsExit] = useState(false);
  const [showKado, setShowKado] = useState(false);
  const [showBubbleText, setShowBubbleText] = useState(false);
  const [showLinkText, setShowLinkText] = useState(false);
  const [bubbleWidth, setBubbleWidth] = useState(0);
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const timeout = setTimeout(() => setIsExit(true), 3000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (isExit) {
      const timeout = setTimeout(() => setShowKado(true), 1000);
      return () => clearTimeout(timeout);
    }
  }, [isExit]);

  useEffect(() => {
    if (showKado) {
      const bubbleDelay = setTimeout(() => setShowBubbleText(true), 3500);
      const textDelay = setTimeout(() => setShowLinkText(true), 4300);
      return () => {
        clearTimeout(bubbleDelay);
        clearTimeout(textDelay);
      };
    }
  }, [showKado]);

  useEffect(() => {
    if (showLinkText && linkRef.current) {
      const width = linkRef.current.offsetWidth;
      setBubbleWidth(width + 48);
    }
  }, [showLinkText]);

  return (
    <div className="absolute inset-0 bg-black/40 flex justify-center items-center z-20 px-4 overflow-hidden">
      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, ease: 'easeOut' }} className="absolute w-full h-full z-0">
        <Image src={confetti} alt="confetti animation" className="w-full h-screen object-cover" />
      </motion.div>

      <div className="flex flex-col md:flex-row items-center justify-center z-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isExit ? { x: '-150%', opacity: 0 } : { x: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className="flex flex-col items-center justify-center text-center"
        >
          <div className="relative font_bold text-[#FF4900] text-[4rem] md:text-[6rem] lg:text-[8rem] xl:text-[10rem]">
            Lolos!
            <Image src={o} alt="mata kiri" className="absolute top-[60%] left-[32%] xl:w-[67px] lg:w-[55px] md:w-[40px] sm:w-[30px] w-[20px] -translate-x-1/2 -translate-y-1/2 z-30" />
            <Image src={o} alt="mata kanan" className="absolute top-[60%] left-[62%] xl:w-[67px] lg:w-[55px] md:w-[40px] sm:w-[30px] w-[20px] -translate-x-1/2 -translate-y-1/2 z-30" />
          </div>

          <div className="relative mt-2 sm:mt-4">
            <Image src={bubblechat} alt="bubble" className="w-[250px] sm:w-[350px] md:w-[400px] lg:w-[700px]" />
            <div className="absolute inset-0 z-10 flex items-center justify-center px-2">
              <p className="font_medium text-white tracking-tight text-[12px] md:text-[20px] lg:text-[36px] text-center">Keren sekali. Selamat berpsoses, Braw!</p>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={isExit ? { x: '150%', opacity: 0 } : { x: 0, opacity: 1, scale: 1 }} transition={{ duration: 0.7, ease: 'easeInOut' }}>
          <Image src={mori} alt="mori" className="w-[120px] sm:w-[160px] md:w-[280px] xl:w-[500px] lg:-translate-x-20 md:translate-y-5 md:-translate-x-10" />
        </motion.div>
      </div>

      {showKado && (
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '-50%', opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="absolute top-[65%] left-1/2 -translate-x-1/2 flex flex-col items-center justify-center z-30"
        >
          <motion.div
            initial={{ x: 0, y: 0, rotate: 0 }}
            animate={{
              x: [0, 0, 0, 90],
              y: [0, -10, 0, -5, 0, -150],
              rotate: [0, 0, 0, 35],
            }}
            transition={{
              duration: 3.2,
              ease: 'easeInOut',
              times: [0, 0.25, 0.4, 0.6, 0.75, 1],
            }}
            className="z-40"
          >
            <Image src={tutupkado} alt="tutup kado" className="w-[250px] md:w-[400px]" />
          </motion.div>

          <div className="-mt-5 relative">
            <Image src={kado} alt="kado" className="z-30 w-[200px] md:w-[340px]" />

            {showBubbleText && (
              <motion.div
                initial={{
                  y: 200,
                  rotate: 45,
                  width: 40,
                  opacity: 0,
                }}
                animate={{
                  y: -180,
                  rotate: 0,
                  width: bubbleWidth || 100,
                  opacity: 1,
                }}
                transition={{
                  duration: 1.2,
                  ease: 'easeInOut',
                }}
                className="absolute md:bottom-[50%] left-1/2 -translate-x-1/2 z-40 bg-[#FF4900] text-white text-sm md:text-lg py-2 rounded-full shadow-md overflow-hidden whitespace-nowrap flex items-center justify-center origin-center px-4"
              >
                {showLinkText && (
                  <motion.a
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    href="https://chat.whatsapp.com/GYhei7Knvj1DGtDEBeeuM2"
                    target="_blank"
                    rel="noopener noreferrer"
                    ref={linkRef}
                    className="text-center"
                  >
                    https://chat.whatsapp.com/GYhei7Knvj1DGtDEBeeuM2
                  </motion.a>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Lolos;
