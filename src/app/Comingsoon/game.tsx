'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Choice, determineResult, getBotChoice, Result } from '../utils/gameLogic';

import n from '../../../public/Assets/icon/comingsoon/days.svg';
import o from '../../../public/Assets/icon/comingsoon/o.svg';
import BtnPlay from '../Components/ComingsoonComponents/btnPlay';
import Animasi from '../Components/ComingsoonComponents/loadingdots';
import Lock from '../Components/ComingsoonComponents/lock';

import batu from '../../../public/Assets/icon/comingsoon/batu.png';
import gunting from '../../../public/Assets/icon/comingsoon/gunting.png';
import kertas from '../../../public/Assets/icon/comingsoon/kertas.png';

import batu_player from '../../../public/Assets/image/comingsoon/player/batu.svg';
import batu_player_mobile from '../../../public/Assets/image/comingsoon/player/batumobile.svg';
import gunting_player from '../../../public/Assets/image/comingsoon/player/gunting.svg';
import gunting_player_mobile from '../../../public/Assets/image/comingsoon/player/guntingmobile.svg';
import kertas_player from '../../../public/Assets/image/comingsoon/player/kertas.svg';
import kertas_player_mobile from '../../../public/Assets/image/comingsoon/player/kertasmobile.svg';

import batu_user from '../../../public/Assets/image/comingsoon/user/batu.svg';
import batu_user_user from '../../../public/Assets/image/comingsoon/user/batumobile.svg';
import gunting_user from '../../../public/Assets/image/comingsoon/user/gunting.svg';
import gunting_user_user from '../../../public/Assets/image/comingsoon/user/guntingmobile.svg';
import kertas_user from '../../../public/Assets/image/comingsoon/user/kertas.svg';
import kertas_user_user from '../../../public/Assets/image/comingsoon/user/kertasmobile.svg';

import whitelogo from '../../../public/Assets/logo/whitelogo.svg';

import minutes from '../../../public/Assets/icon/comingsoon//minutes.svg';
import orange from '../../../public/Assets/icon/comingsoon/orange.svg';

import BgGrid from '../Components/ComingsoonComponents/background/BgGrid';
import GameCard from '../Components/ComingsoonComponents/GameCard';
import ResultFlow from '../Components/ComingsoonComponents/ResultFlow';

import Opening from '../Components/ComingsoonComponents/Opening';


export default function NotFound() {

  const [userChoice, setUserChoice] = useState<Choice | null>(null);
  const [botChoice, setBotChoice] = useState<Choice | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const pickRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<HTMLDivElement>(null);
  const [showResultFlow, setShowResultFlow] = useState(false);
  const [botDisplayChoice, setBotDisplayChoice] = useState<Choice>('rock');
  const [showPlayBtn, setShowPlayBtn] = useState(true);
  const [isOpening, setIsOpening] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [currentView, setCurrentView] = useState('opening');

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  
useEffect(() => {
  window.scrollTo({ top: 0, behavior: 'auto' });

  resetToOpening();
}, []);

const resetToOpening = () => {
  setUserChoice(null);
  setBotChoice(null);
  setResult(null);
  setIsOpening(true);
  setShowPlayBtn(true);
  setShowResultFlow(false);
  setCurrentView('opening');
  window.scrollTo({ top: 0, behavior: 'auto' });
};

  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpening(false);
    }, 1400);

    return () => clearTimeout(timer);
  }, [isOpening]);

  useEffect(() => {
    const choices: Choice[] = ['rock', 'paper', 'scissors'];
    const totalDuration = 4000;
    let elapsed = 0;
    const initialDelay = 80;
    let currentDelay = initialDelay;
    let timeoutId: NodeJS.Timeout;

    function animate() {
      setBotDisplayChoice(choices[Math.floor(Math.random() * 3)]);
      elapsed += currentDelay;

      if (elapsed >= totalDuration) {
        setBotDisplayChoice(botChoice!);
        return;
      }

      const progress = elapsed / totalDuration;

      const maxDelay = 800;
      currentDelay = initialDelay + (maxDelay - initialDelay) * (progress * progress);

      timeoutId = setTimeout(animate, currentDelay);
    }

    animate();

    return () => clearTimeout(timeoutId);
  }, [botChoice]);

  const handle = (localChoice: 'batu' | 'kertas' | 'gunting') => {
    const translatedChoice: Choice = localChoice === 'batu' ? 'rock' : localChoice === 'kertas' ? 'paper' : 'scissors';
    const bot = getBotChoice(translatedChoice);
    const hasil = determineResult(translatedChoice, bot);

    setUserChoice(translatedChoice);
    setBotChoice(bot);
    setResult(hasil);
    setCurrentView('result');

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 200);
  };

  const imageMapUser: Record<Choice, string> = {
    rock: isMobile ? batu_user_user : batu_user,
    paper: isMobile ? kertas_user_user : kertas_user,
    scissors: isMobile ? gunting_user_user : gunting_user,
  };

  const imageMapBot: Record<Choice, string> = {
    rock: isMobile ? batu_player_mobile : batu_player,
    paper: isMobile ? kertas_player_mobile : kertas_player,
    scissors: isMobile ? gunting_player_mobile : gunting_player,
  };

  const labelMap: Record<Choice, string> = {
    rock: 'Rock',
    paper: 'Paper',
    scissors: 'Scissors',
  };

  const handlePlayAgain = () => {
    resetToOpening();
  };

  useEffect(() => {
    if (userChoice && botChoice && result) {
      const timer = setTimeout(() => {
        setShowResultFlow(true);
      }, 4500);

      return () => clearTimeout(timer);
    }
  }, [userChoice, botChoice, result]);

  useEffect(() => {
    if (userChoice && botChoice && result) {
      const soundMap: Record<Result, { src: string; delay: number; volume: number }[]> = {
        win: [{ src: '/sounds/victory.mp3', delay: 4300, volume: 0.2 }],
        lose: [
          { src: '/sounds/beepCountdown.mp3', delay: 6000, volume: 0.2 },
          { src: '/sounds/glitch.mp3', delay: 8000, volume: 0.2 },
          { src: '/sounds/victory.mp3', delay: 10400, volume: 0.2 },
        ],
      };

      const timeouts: NodeJS.Timeout[] = [];

      soundMap[result].forEach(({ src, delay, volume }) => {
        const timeout = setTimeout(() => {
          const audio = new Audio(src);
          audio.volume = volume;
          audio.play().catch((err) => {
            console.error(`Gagal play sound "${src}":`, err);
          });
        }, delay);

        timeouts.push(timeout);
      });

      return () => {
        timeouts.forEach(clearTimeout);
      };
    }
  }, [userChoice, botChoice, result]);

 
    useEffect(() => {
      if (userChoice && botChoice && result) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
      return () => { document.body.style.overflow = ''; };
    }, [currentView,userChoice, botChoice, result]);
  
    useEffect(() => {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }, []);



    const handlePlay = () => {
      setCurrentView('game');
      setTimeout(() => {
        if (gameRef.current) {
          gameRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    };

if (currentView === 'result' && userChoice && botChoice && result) {
      return (
        <div ref={resultRef} className=" w-full h-screen overflow-hidden">
          <BgGrid 
            classNameVertical="opacity-40 object-cover translate-x-[-20%] translate-y-[0.5%]" 
            classNameHorizontal="opacity-40 object-cover translate-y-[34%] z-50" 
            speedVertical={1} 
            speedHorizontal={1} 
          />
          <div className="absolute inset-0 bg-[#001B5E]" />
  
          <div
            className="absolute inset-0 opacity-70 sm:block hidden"
            style={{
              background: 'linear-gradient(200.32deg, #000000 -20.61%, #0049FF 184.91%)',
              clipPath: 'polygon(58% 0%, 58% 0%, 52% 40%, 41% 100%)',
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.45] sm:block hidden"
            style={{
              background: 'linear-gradient(200.32deg, #000000 -20.61%, #0049FF 184.91%)',
              clipPath: 'polygon(0% 100%, 41% 100%, 58% 0%, 0% 0%)',
            }}
          />
  
          <motion.div 
            initial={{ y: 500 }} 
            animate={{ y: 0 }} 
            transition={{ duration: 0.5, ease: 'easeInOut' }} 
            className="relative z-20 flex flex-col items-center justify-center h-full"
          >
            <div className="sm:block hidden">
              <div className="flex flex-row items-center justify-center absolute top-6 right-0 left-0">
                <Image src={whitelogo} alt="white logo" className="w-auto" />
              </div>
            </div>
  
            <div className="hidden sm:flex flex-row items-center justify-between w-full xl:px-20 lg:px-16 md:px-12 sm:px-4 px-5 xl:text-[121.32px] lg:text-[100px] md:text-[80px] text-[50px] absolute xl:-translate-y-[150%] sm:-translate-y-[180%]">
              <h1 className="text-[#0049FF] font_bold">Mori</h1>
              <h1 className="text-[#FF4900] font_bold xl:pr-16 lg:pr-12 sm:pr-8 pr-4">you</h1>
            </div>
  
            <div className="sm:hidden flex flex-col items-center justify-center absolute right-0 left-0 translate-y-[-130%]">
              <p className="font_regular text-white text-[20px]">{labelMap[botDisplayChoice]}</p>
              <h1 className="font_bold text-[#0049FF] text-[36px] tracking-tight leading-none">Mori</h1>
            </div>
  
            <div className="relative w-full ">
              <div className="flex sm:flex-row relative flex-col justify-between h-screen items-center">
                <div className="relative">
                  {botChoice && (
                   
                     
                      <Image 
                        src={imageMapBot[botDisplayChoice]} 
                        alt="pilihan bot"
                        className="relative xl:w-auto lg:w-[400px] md:w-[330px] sm:w-[250px] w-[60vw] sm:h-auto h-[30vh]" 
                      />
                  
                  )}
                </div>
                <div className="relative ">
                  {userChoice && (
                
                      
                      <Image 
                        src={imageMapUser[userChoice]} 
                        alt="pilihan user" 
                        className="relative xl:w-auto lg:w-[400px] md:w-[330px] sm:w-[250px] w-[60vw]  sm:h-auto h-[30vh] object-contain" 
                      />
                   
                  )}
                </div>
              </div>
              <h1 className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 font_bold xl:text-[121.32px] lg:text-[100px] md:text-[80px] text-[60px] text-white">VS</h1>
            </div>
  
            <div className="sm:hidden flex flex-col items-center justify-center absolute right-0 left-0 translate-y-[130%]">
              <h1 className="font_bold text-[#FF4900] text-[36px] tracking-tight leading-none">You</h1>
              <p className="font_regular text-white text-[20px]">{labelMap[userChoice]}</p>
            </div>
  
            <div className="hidden sm:flex flex-row items-center justify-between w-full xl:px-40 lg:px-30 md:px-25 sm:px-15 px-10 xl:text-[42.52px] lg:text-[38px] md:text-[30px] text-[20px] absolute translate-y-[500%]">
              <h1 className="font_regular text-white">{labelMap[botDisplayChoice]}</h1>
              <h1 className="font_regular text-white">{labelMap[userChoice]}</h1>
            </div>
          </motion.div>
          
          {showResultFlow && (
            <div className="absolute inset-0 z-50 w-full h-full">
              <ResultFlow isWinner={result === 'win'} onPlayAgain={handlePlayAgain} />
            </div>
          )}
        </div>
      );
    }


  return (
    <div className='flex flex-col h-screen overflow-hidden'>
      <div className="relative flex flex-col items-center w-full justify-center min-h-screen bg-[#001B5E]">
      <Opening />
        <BgGrid classNameVertical="object-cover translate-x-[-20%] opacity-40" classNameHorizontal="opacity-40 object-cover translate-y-[34%] " speedVertical={1} speedHorizontal={1} />
        <Lock />

        <div className="flex z-30  flex-col items-center space-y-6 mb-14">
          <div className="hidden md:flex flex-row items-center justify-center z-30 font_bold whitespace-nowrap space-x-6 text-[4rem] sm:text-[5rem] md:text-[6rem] lg:text-[7rem] xl:text-[10rem]">
            <div className="flex flex-row items-center text-[#0049FF]">
              <span>ha</span>
              <Image src={n} alt="n" className="h-10 mt-2 sm:mt-1 md:mt-1.5 lg:mt-1 xl:mt-0 sm:h-14 md:h-16 lg:h-[5rem] xl:h-[8rem] w-auto" />
              <span>g</span>
            </div>
            <div className="flex flex-row items-center text-[#0049FF]">
              <span>o</span>
              <Image src={o} alt="o" className="h-10 sm:h-14 md:h-16 lg:h-[5rem] xl:h-[8rem] mt-2 w-auto" />
            </div>
            <div className="flex flex-row items-center text-[#FF4900]">
              <span>there</span>
              <Animasi />
            </div>
          </div>
          
          <div className="md:hidden z-30 flex flex-col items-center justify-center font_bold text-[3.5rem] leading-none space-y-2">
            <div className="flex flex-row items-center  text-[#0049FF]">
              <span>ha</span>
              <Image src={n} alt="n" className="h-[2.5rem] w-auto translate-y-[6px] ml-[2px]" />
              <span>g</span>
              <Image src={o} alt="o" className="h-[2.5rem] w-auto translate-y-[6px] ml-4" />
              <span>n</span>
            </div>
            <div className="flex flex-row items-center text-[#FF4900]">
              <span>there</span>
              <Animasi />
            </div>
          </div>

          <h2 className="text-lg hidden md:block text-white font_regular text-center md:text-xl lg:text-2xl xl:text-[42.52px]">We’re cooking up something awesome. While we polish up the site, lets play a game!</h2>
          <h2 className="text-lg md:hidden text-white font_regular font-normal text-center md:text-xl lg:text-2xl xl:text-[42.52px]">We’re cooking up something awesome.</h2>
        </div>
        {!isOpening && showPlayBtn && (
          <BtnPlay 
            onClick={() => {
              setShowPlayBtn(false);
              setCurrentView('game');
              handlePlay();
            }} 
          />
        )}
        <p className="text-[14px] md:hidden w-full mt-2 text-white font-normal text-center fixed bottom-[50px] ">While we polish up the site, lets play a game!</p>

        <div className="flex flex-row items-center justify-center absolute top-5">
          <Image src={whitelogo} alt="white logo" className="w-auto" />
        </div>
      </div>

      {currentView === 'game' && (
        
    
      <div  ref={gameRef} className="relative flex flex-col items-center justify-center  min-h-screen bg-[#001B5E] w-full">
        <Lock/>
        <BgGrid classNameVertical="object-cover translate-x-[-20%] opacity-40" classNameHorizontal="object-cover translate-y-[34%] opacity-40" speedVertical={0.7} speedHorizontal={1} />
        <div className="flex flex-row items-center justify-center absolute top-5">
          <Image src={whitelogo} alt="white logo" className="w-auto" />
        </div>

        <div ref={pickRef} className="relative flex flex-col sm:mb-80 px-4 ">
          <div className="flex flex-row items-center justify-center font_bold whitespace-nowrap space-x-6 text-7xl sm:text-9xl md:text-[8rem]">
            <div className="flex flex-row items-center space-x-5 z-20">
              <span className="text-[#FF4900]">pick</span>
              <span className="text-[#0049FF]">one!</span>
            </div>
          </div>
          <h2 className="text-white font_regular text-center text-lg sm:text-3xl md:text-[30px] flex flex-row items-center">
            Win the game, unlock the surprise.
            <span className="font_bold inline-block align-middle mx-1 text-lg sm:text-3xl md:text-[30px]">Ready?</span>
          </h2>
        </div>

        <div className="relative  sm:absolute sm:bottom-[-50px] w-full flex sm:flex-row flex-col items-center justify-center space-x-[-60px] space-y-[-70px] sm:mr-0 mr-12 ">
          <Image src={minutes} alt="coming soon" className="rotate-[167.99deg] translate-y-[70%] md:block hidden z-20 xl:w-[15%] lg:w-[30%] md:w-[20%] " />
          <GameCard
            src={gunting}
            alt="Scissors"
            onClick={() => handle('gunting')}
            className=" -translate-x-16 sm:-translate-x-0 mt-10 sm:rotate-[-5.61deg] rotate-[-10deg] shadow-[#fff] hover:shadow-[0px_0px_100px] relative z-30 cursor-pointer lg:w-[40%] xl:w-[20%] w-[35%] sm:mb-0 hover:z-50"
          />
          <GameCard
            src={kertas}
            alt="Paper"
            onClick={() => handle('kertas')}
            className="translate-x-16 sm:translate-x-0 sm:mb-[-30px] sm:rotate-0 rotate-[15.79deg] shadow-[#fff] hover:shadow-[0px_0px_100px] z-40 relative lg:w-[40%] xl:w-[20%] w-[35%]"
          />
          <GameCard
            src={batu}
            alt="Rock"
            onClick={() => handle('batu')}
            className="-translate-x-16 sm:-translate-x-0 mt-5  sm:mb-[-30px] shadow-[#fff] hover:shadow-[0px_0px_100px] sm:mt-0 relative z-30 sm:rotate-[5.61deg] rotate-[-10deg] lg:w-[40%] xl:w-[20%] w-[35%] hover:z-50"
          />
          <Image src={orange} alt="coming soon" className="rotate-[196.58deg] translate-y-[50%] xl:w-[15%] lg:w-[30%] md:w-[20%] md:block hidden z-20" />
        </div>
      </div>
      )}
    </div>
      
  );
}