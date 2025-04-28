'use client';
import Image from 'next/image';
import confetti from '../../../public/Assets/image/confetti.svg';
import bg from '../../../public/Assets/image/bg_text.svg';
import mori from '../../../public/Assets/logo/mori.svg';
import whitelogo from '../../../public/Assets/logo/whitelogo.svg';
import o from '../../../public/Assets/icon/o2.svg';
import again from '../../../public/Assets/icon/again.svg';
import again_hover from '../../../public/Assets/icon/again_hover.svg';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Win3({ onPlayAgain }: { onPlayAgain: () => void }) {
  const handleExplore = () => {
    window.open('https://em.ub.ac.id/2024', '_blank');
  };

  const [animateBtn, setAnimateBtn] = useState(false);
  const [showExplore, setShowExplore] = useState(false);

  useEffect(() => {
    const playAgainDelay = setTimeout(() => {
      setAnimateBtn(true);
    }, 700);

    const exploreDelay = setTimeout(() => {
      setShowExplore(true);
    }, 900);

    return () => {
      clearTimeout(playAgainDelay);
      clearTimeout(exploreDelay);
    };
  }, []);

  return (
    <div className="absolute inset-0 flex justify-center items-center flex-col z-50">
      <div className="flex flex-col  items-center justify-center space-y-0 ">
        <div className="flex flex-row font_bold py-0  text-[4rem] sm:text-[5rem] md:text-[6rem] lg:text-[8rem] xl:text-[10rem] tracking-normal relative z-20">
          <Image
            src={o}
            alt="comingsoon"
            className="absolute translate-x-[393%] translate-y-[230%]  sm:translate-y-[250%] sm:translate-x-[425%] md:translate-y-[270%] md:translate-x-[450%]    xl:w-[67px] lg:w-[55px] md:w-[40px] sm:w-[35px] w-[30px] "
          />
          <span className="text-[#0049FF]">Vict</span>
          <span className="text-[#FF4900]">o</span>
          <span className="text-[#0049FF]">ry!</span>

          <Image src={mori} alt="coming soon" className="absolute xl:w-[151.7px] lg:translate-x-[390%] translate-x-[340%] translate-y-[30%] md:translate-x-[350%]  lg:w-[140px] md:w-[100px] sm:w-[85px] w-[70px]" />
        </div>
        <p className="font_medium text-white tracking-tight xl:text-[35px] lg:text-[30px] md:text-[20px] max-w-xs text-center md:max-w-full text-[17px]">
          Discover the stories, struggles, and successes that shaped us. <span className="hidden md:block"> Ready to check it out? </span>
        </p>

        <p className="mt-4 md:hidden font-bold text-white tracking-tight xl:text-[35px] lg:text-[30px] md:text-[20px] max-w-xs text-center md:max-w-full text-[17px]">Ready to check it out?</p>

        <div className="hidden md:flex flex-row justify-center items-center xl:text-[18px] lg:text-[16px] md:text-[14px] font_poppins_semibold gap-4 lg:mt-7 md:mt-5 sm:mt-2">
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={animateBtn ? { scale: 1, opacity: 1 } : {}}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            onClick={onPlayAgain}
            className="bg-[#F2F2F2] hover:bg-[#D7D7D7] rounded-full text-gray-400 hover:text-gray-700 cursor-pointer md:px-[81.23px] py-[13.54px] px-[60px] flex flex-row items-center justify-center gap-2"
          >
            <Image src={again} alt="coming soon" className="xl:w-[15.93px] lg:w-[13px] md:w-[14px] w-[9px]" />
            <p>Play Again</p>
          </motion.button>

          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={showExplore ? { scale: 1, opacity: 1 } : {}}
            transition={{ type: 'spring', stiffness: 250, damping: 18, delay: 0.1 }}
            onClick={handleExplore}
            className="bg-[#FF4900] hover:bg-[#FD9165] rounded-full text-white md:px-[81.23px] py-[13.54px] px-[60px] flex cursor-pointer flex-row items-center justify-center"
          >
            <p>Explore our Archive</p>
          </motion.button>
        </div>

        <div className="md:hidden fixed bottom-16 left-0 right-0 px-6 z-50 flex flex-col space-y-2">
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={animateBtn ? { scale: 1, opacity: 1 } : {}}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            onClick={onPlayAgain}
            className="bg-[#F2F2F2] hover:bg-[#D7D7D7] rounded-full text-gray-400 hover:text-gray-700 cursor-pointer py-3 w-full flex flex-row items-center justify-center gap-2 text-[14px]"
          >
            <Image src={again} alt="coming soon" className="w-[12px]" />
            <p>Play Again</p>
          </motion.button>

          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={showExplore ? { scale: 1, opacity: 1 } : {}}
            transition={{ type: 'spring', stiffness: 250, damping: 18, delay: 0.1 }}
            onClick={handleExplore}
            className="bg-[#FF4900] hover:bg-[#FD9165] rounded-full text-white py-3 w-full text-[14px] flex cursor-pointer flex-row items-center justify-center"
          >
            <p>Explore our Archive</p>
          </motion.button>
        </div>
      </div>

      <div className="flex flex-row items-center justify-center absolute top-5">
        <Image src={whitelogo} alt="white logo" className="w-auto" />
      </div>
    </div>
  );
}
