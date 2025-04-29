'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import btnicon from '../../../../public/Assets/icon/comingsoon/btnPlay.svg';

export default function BtnPlay({ onClick }: { onClick: () => void }) {
  const handleClick = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    const audio = new Audio('/sounds/click.mp3');
    audio.play();

    setTimeout(() => {
      document.body.style.overflow = 'hidden';
      onClick();
    }, 100);
  };

  return (
    <motion.button
      onClick={handleClick}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className={`
        bg-[#FF4900] text-white flex flex-row gap-1 items-center justify-center
        rounded-[28.2px] shadow-[#FD9165] hover:shadow-[0px_0px_50px]
        py-[13.54px] px-[81.23px] cursor-pointer transition duration-200 ease-in-out
        font-medium text-[20.31px] z-50 w-[350px] md:max-w-3xs

        fixed bottom-20  
        md:static md:translate-x-0 md:mt-6
      `}
    >
      <Image src={btnicon} alt="white logo" className="w-auto" />
      <p>Play</p>
    </motion.button>
  );
}
