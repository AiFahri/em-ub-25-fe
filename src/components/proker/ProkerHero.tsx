import Herosection from "@/assets/proker/hero-proker.svg";
import Herobg from "@/assets/proker/hero-bg-proker.svg";
import MoriCard from "@/assets/proker/mori-card-proker.svg";
import bubble1 from "@/assets/proker/programkerjamenarik-bubble.svg";
import bubble2 from "@/assets/proker/sudahbanyak-bubble.svg";
import bubble3 from "@/assets/proker/waktunyamenjelajah-bubble.svg";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ProkerHero = () => {
  const [animationComplete, setAnimationComplete] = useState(false);

  // Prevent scroll during animation
  useEffect(() => {
    if (!animationComplete) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [animationComplete]);

  return (
    <div className="relative w-full h-[600px] md:h-[900px] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#FDB090] to-[#fff]">
      {/* Background Herobg pattern dengan animasi floating */}
      <motion.div 
        className="absolute left-0 top-0 w-full h-full z-0 pointer-events-none select-none"
        animate={{
          y: [0, -10, 0]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Image src={Herobg} alt="Background Hero Proker" fill className="object-cover object-top" priority />
      </motion.div>
      
      {/* SVG Herosection as main background shape, centered and not full width dengan animasi dari kiri */}
      <motion.div 
        className="absolute left-1/2 top-24 md:top-0 -translate-x-1/2 w-[90vw] h-[320px] md:h-full z-10 flex items-center justify-center pointer-events-none select-none"
        initial={{ x: -10000, opacity: 1 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ 
          delay: 5, // Mulai setelah semua bubble selesai
          duration: 1.2,
          ease: [0.68, -0.55, 0.265, 1.2] // Bounce effect
        }}
      >
        <Image src={Herosection} alt="Hero Section Shape" fill className="object-contain" priority />
      </motion.div>
      
      {/* Main content: Title & sub, centered dengan animasi setelah herosection */}
      <div className="relative z-20 grid grid-cols-3 grid-rows-2 w-full max-w-7xl mx-auto mt-16 md:mt-72 items-center">
        
        {/* Item 1: "Program Kerja" di baris 1, merentang 2 kolom dengan animasi */}
        <motion.h1 
          className="col-span-3 col-start-1 row-start-1 text-white text-4xl md:text-[140px] font-bold drop-shadow-lg tracking-tight leading-tight pr-4 -translate-y-4 -translate-x-20"
          initial={{ 
            x: "50%", 
            scaleX: 0, 
            opacity: 0,
            transformOrigin: "right center"
          }}
          animate={{ 
            x: 0, 
            scaleX: 1, 
            opacity: 1,
            transformOrigin: "right center"
          }}
          transition={{ 
            delay: 6.5, // Mulai setelah herosection selesai (5 + 1.2)
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1]
          }}
        >
          Program Kerja
        </motion.h1>
        
        {/* Item 2: "EM UB 2025" di baris 2, kolom 2 dengan animasi */}
        <motion.div 
          className="col-start-2 col-span-2 row-start-2 inline-block rounded-full -translate-x-10 px-10 py-4"
          initial={{ 
            x: "30%", 
            scaleX: 0, 
            opacity: 0,
            transformOrigin: "right center"
          }}
          animate={{ 
            x: 0, 
            scaleX: 1, 
            opacity: 1,
            transformOrigin: "right center"
          }}
          transition={{ 
            delay: 8, // Sedikit setelah "Program Kerja"
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1]
          }}
        >
          <span className="text-white text-2xl md:text-7xl font-bold">EM UB 2025</span>
        </motion.div>
      </div>
      
      {/* Right: MoriCard & bubbles, big and in bottom right */}
      <div className="absolute bottom-0 right-0 z-30 flex flex-col items-end pr-6 pl-10 pb-4">
        <div className="relative">
          {/* MoriCard dengan animasi slide dari kanan */}
          <motion.div
            initial={{ x: "100%", opacity: 1 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ 
              duration: 1, 
              ease: [0.22, 1, 0.36, 1] // Custom cubic bezier untuk smooth effect
            }}
          >
            <Image src={MoriCard} alt="Mori Card" width={520} height={320} className="" />
          </motion.div>
          
          {/* Bubble overlays dengan delay bertahap */}
          <motion.div 
            className="absolute -left-20 top-[400px]"
            initial={{ x: 1000, opacity: 1 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ 
              delay: 4, // Delay 1 detik setelah MoriCard
              duration: 1,
              ease: [0.22, 1, 0.36, 1]
            }}
          >
            <Image src={bubble3} alt="Bubble 3" width={300} height={60} />
          </motion.div>
          
          <motion.div 
            className="absolute left-[220px] bottom-20"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ 
              delay: 1, // Delay 1.3 detik
              duration: 1,
               ease: [0.22, 1, 0.36, 1]
            }}
          >
            <Image src={bubble2} alt="Bubble 2" width={450} height={60} />
          </motion.div>
          
          <motion.div 
            className="absolute left-[220px] bottom-8"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ 
              delay: 2.5, // Delay 1.6 detik
              duration: 1,
               ease: [0.22, 1, 0.36, 1]
            }}
          >
            <Image src={bubble1} alt="Bubble 1" width={450} height={60} />
          </motion.div>
        </div>
      </div>
      
      {/* Stats: di bawah semua, rata tengah dengan animasi bounce dari bawah */}
      <div className="relative z-20 w-full flex flex-row ml-20 gap-16 mt-auto mb-8 md:mb-12">
        <motion.div 
          className="flex flex-col items-center"
          initial={{ y: 150, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ 
            delay: 9, // Setelah teks selesai
            duration: 0.3,
            ease: [0.68, -0.6, 0.32, 1.6] // Bounce dengan beberapa pantulan
          }}
        >
          <span className="text-[#FF4900] text-5xl md:text-9xl font-extrabold drop-shadow">06+</span>
          <span className="text-[#222] text-xl md:text-3xl font-semibold mt-2">Program Kerja</span>
        </motion.div>
        <motion.div 
          className="flex flex-col items-center"
          initial={{ y: 150, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ 
            delay: 9.5, // Jeda 1 detik
            duration: 0.3,
            ease: [0.68, -0.6, 0.32, 1.6] // Bounce dengan beberapa pantulan
          }}
        >
          <span className="text-[#FF4900] text-5xl md:text-9xl font-extrabold drop-shadow">05+</span>
          <span className="text-[#222] text-xl md:text-3xl font-semibold mt-2">Kementerian</span>
        </motion.div>
        <motion.div 
          className="flex flex-col items-center"
          initial={{ y: 150, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ 
            delay: 10, // Jeda 1 detik
            duration: 0.3,
            ease: [0.68, -0.6, 0.32, 1.6] // Bounce dengan beberapa pantulan
          }}
          onAnimationComplete={() => setAnimationComplete(true)} // Set animation complete
        >
          <span className="text-[#FF4900] text-5xl md:text-9xl font-extrabold drop-shadow">10rb+</span>
          <span className="text-[#222] text-xl md:text-3xl font-semibold mt-2">Mahasiswa Terlibat</span>
        </motion.div>
      </div>
    </div>
  );
};

export default ProkerHero;