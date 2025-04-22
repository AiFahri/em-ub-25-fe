'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import logo from '../../../public/Assets/logo/logoEM_blue.svg';

const MotionImage = motion(Image);

export default function Opening() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {showSplash && (
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: 0 }}
            exit={{
              y: '-100%',
              transition: { duration: 1 },
            }}
            className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-[radial-gradient(circle_at_center,_#ffffff_20%,_#001B5E_100%)] z-50 overflow-hidden"
          >
            <div className="p-28 flex flex-col items-center justify-center w-full h-full relative">
              <MotionImage
                initial={{
                  y: 350,
                  opacity: 0,
                }}
                animate={{
                  y: 0,
                  opacity: 1,
                }}
                transition={{
                  y: { duration: 0.5 },
                  opacity: { duration: 1 },
                }}
                src={logo}
                alt="Logo"
                className="absolute md:w-[20%] md:h-[25%] w-[50%] h-[20%] z-10"
                loading="lazy"
                draggable="false"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
