'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

import bg from '../../../public/Assets/image/bg_def.svg';
import mori from '../../../public/Assets/logo/sad_mori.svg';
import happyMori from '../../../public/Assets/logo/mori.svg';
import whitelogo from '../../../public/Assets/logo/whitelogo.svg';
import minute from '../../../public/Assets/icon/def.svg';
import bg_red from '../../../public/Assets/background/bg_red.svg';
import bg_error from '../../../public/Assets/background/bg_error.svg';
import again from '../../../public/Assets/icon/again.svg';
import o from '../../../public/Assets/icon/o3.svg';
import light from '../../../public/Assets/image/light.svg';
import { motion } from 'framer-motion';

export default function Lose({ onPlayAgain }: { onPlayAgain: () => void }) {
  const [countdown, setCountdown] = useState(4);

  const [showFinalPage, setShowFinalPage] = useState(false);

  const [animateButton, setAnimateButton] = useState(false);

  useEffect(() => {
    if (showFinalPage) {
      const timer = setTimeout(() => {
        setAnimateButton(true);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [showFinalPage]);

  useEffect(() => {
    if (countdown <= 0) {
      setShowFinalPage(true);
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1500);

    return () => clearTimeout(timer);
  }, [countdown]);

  if (showFinalPage) {
    return (
      <motion.div initial={{ y: 300, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: 'spring', stiffness: 120, damping: 12 }} className="absolute inset-0 flex justify-center items-center flex-col z-50 ">
        <motion.div className="absolute h-11/12" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}>
          <Image src={light} alt="spinning light" className="h-full w-full brightness-150 blur-sm saturate-150 opacity-90 animate-pulse" />
        </motion.div>

        <div className="flex flex-col items-center justify-center px-4 py-6 min-h-screen text-white space-y-4 lg:space-y-6">
          <div className="block md:hidden w-[100px] h-[100px] mb-2">
            <Image src={happyMori} alt="top image" width={200} height={200} />
          </div>

          <div className="relative flex font-bold text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] tracking-normal z-20 leading-none">
            <Image
              src={o}
              alt="emoji"
              className="absolute w-[23px] sm:w-[40px] md:w-[55px] lg:w-[70px]
                 translate-x-[48px] translate-y-[38px] sm:translate-x-[60px] sm:translate-y-[40px]
                 md:translate-x-[93px] md:translate-y-[74px]
                 lg:translate-x-[115px] lg:translate-y-[90px]"
            />
            <span className="text-[#FF4900]">g</span>
            <span className="text-[#0049FF]">o</span>
            <span className="text-[#FF4900]">tcha!</span>
          </div>

          <p className="text-center text-[14px] md:text-[18px] lg:text-[24px] max-w-xs md:max-w-full font-medium">Just kidding! You lost the game, not the site. Wanna try again?</p>

          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={animateButton ? { scale: 1, opacity: 1 } : {}}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            onClick={onPlayAgain}
            className={`
    bg-[#F2F2F2] hover:bg-[#D7D7D7] rounded-full text-gray-400 hover:text-gray-700 w-[350px] justify-center md:max-w-3xs
    flex items-center gap-2 z-50 font-semibold
    text-[12px] sm:text-[14px] md:text-[16px]
    fixed bottom-16 left-1/2 -translate-x-1/2 md:static md:translate-x-0
    px-[50px] py-[12px] sm:px-[60px] sm:py-[14px] md:px-[60px] md:py-[14px]
  `}
          >
            <Image src={again} alt="retry" className="w-[12px] sm:w-[14px] md:w-[16px]" />
            <p>Play Again</p>
          </motion.button>

          <p className="text-[12px] md:hidden w-full mt-2 text-white font-normal text-center fixed bottom-[50px] left-1/2 -translate-x-1/2">Win the game to unlock the surprise!</p>
        </div>

        <div className="flex flex-row items-center justify-center absolute top-5">
          <Image src={whitelogo} alt="white logo" className="w-auto" />
        </div>
      </motion.div>
    );
  }

  let style = {};
  let text = '';
  let colorText = '#0049FF';

  switch (countdown) {
    case 4:
      style = {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      };
      text = 'Unauthorized access detected';
      break;
    case 3:
      style = {
        backgroundImage: `url(${bg_red.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      };
      text = 'Site now will self destruct in 3.';
      break;
    case 2:
      style = {
        backgroundImage: `url(${bg_error.src})`,
      };
      text = 'Site now will self destruct in 2.';
      break;
    case 1:
      style = {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      };
      text = 'Site now will self destruct in 1.';
      break;
    default:
      style = {
        backgroundColor: 'black',
      };
      text = 'Waktu habis!';
      break;
  }

  return (
    <div className="absolute inset-0 flex justify-center items-center flex-col z-50" style={style}>
      <div className="flex flex-col items-center justify-center space-y-0">
        <div className="flex flex-row font_bold py-0 text-[4rem] sm:text-[5rem] md:text-[6rem] lg:text-[8rem] xl:text-[135.32px] tracking-normal relative z-20">
          <span style={{ color: colorText }}>defe</span>
          <Image src={minute} alt="coming soon" className="mt-2 xl:w-[78.5px] lg:w-[70px] md:w-[55px] sm:w-[45px] w-[35px]" />
          <span style={{ color: colorText }}>t</span>
        </div>

        <div className="relative flex flex-row items-center justify-center">
          <Image src={bg} alt="coming soon" className="lg:w-[661px] md:w-[500px] w-[220px]" />
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <p className=" text-white tracking-tight xl:text-[42px] lg:text-[36px] md:text-[30px] text-[13px] relative z-20 text-nowrap">{text}</p>
          </div>
        </div>

        <Image
          src={mori}
          alt="coming soon"
          className="absolute xl:translate-y-[130px] lg:translate-y-[100px] md:translate-y-[80px] sm:translate-y-[60px] translate-y-[45px] xl:translate-x-[440px] lg:translate-x-[420px] md:translate-x-[330px] sm:translate-x-[260px] translate-x-[140px] xl:w-[260px] lg:w-[200px] md:w-[180px] sm:w-[140px] w-[80px]"
        />
      </div>

      <div className="flex flex-row items-center justify-center absolute top-5">
        <Image src={whitelogo} alt="white logo" className="w-auto" />
      </div>
    </div>
  );
}
