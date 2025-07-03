"use client";

import React, { useRef, useLayoutEffect } from 'react';
import Image from "next/image";


import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


import star from "../../../public/Assets/image/tentang/sec2/in_img.svg";
import bg_grid from "../../../public/Assets/background/tentang/bg_grid.svg";
import adaptif_bg from "../../../public/Assets/background/tentang/sec4/adaptif.svg";
import rasional_bg from "../../../public/Assets/background/tentang/sec4/rasional.svg";
import akomodatif_bg from "../../../public/Assets/background/tentang/sec4/akomodatif.svg";
import harmonisasi_bg from "../../../public/Assets/background/tentang/sec4/harmonisasi.svg";
import adaptif_icon from "../../../public/Assets/image/tentang/sec4/adaptif_image.svg";
import rasional_icon from "../../../public/Assets/image/tentang/sec4/rasional_image.svg";
import akomodatif_icon from "../../../public/Assets/image/tentang/sec4/akomodatif_image.svg";
import harmonisasi_icon from "../../../public/Assets/image/tentang/sec4/harmonisasi_image.svg";


gsap.registerPlugin(ScrollTrigger);

export default function Section4() {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 65%",
          end: "bottom 20%",
          toggleActions: "restart reverse restart reverse",
        }
      });

      tl.from(".anim-title-1", { x: -100, opacity: 0, skewX: 15, duration: 1, ease: "power3.out" })
        .from(".anim-title-2", { x: 100, opacity: 0, skewX: -15, duration: 1, ease: "power3.out" }, "<"); 


      tl.from([".anim-star-1", ".anim-star-2"], {
        scale: 0,
        opacity: 0,
        rotation: 180,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)",
        stagger: 0.2,
      }, "-=0.7"); 


      const puzzleEase = "back.out(1.4)";
      const puzzleDuration = 1.2;

      tl.from(".anim-puzzle-1", { x: -200, y: -150, rotation: -45, scale: 0.5, opacity: 0, duration: puzzleDuration, ease: puzzleEase, clearProps: "all" }, "-=1.2")
        .from(".anim-puzzle-2", { x: 200, y: -150, rotation: 45, scale: 0.5, opacity: 0, duration: puzzleDuration, ease: puzzleEase, clearProps: "all" }, "<0.2")
        .from(".anim-puzzle-3", { x: -200, y: 150, rotation: 25, scale: 0.5, opacity: 0, duration: puzzleDuration, ease: puzzleEase, clearProps: "all" }, "<0.2")
        .from(".anim-puzzle-4", { x: 200, y: 150, rotation: -25, scale: 0.5, opacity: 0, duration: puzzleDuration, ease: puzzleEase, clearProps: "all" }, "<0.2");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full flex flex-col items-center justify-center bg-[linear-gradient(182.56deg,_#FFFFFF_2.22%,_#FFCBB5_50.08%,_#FFFFFF_97.93%)] aspect-[964/886] overflow-hidden">
      <Image
        src={bg_grid}
        alt="Background Section 1"
        className="absolute top-0 opacity-50"
      />
      <div className="relative w-[65%] mx-auto text-center flex flex-col aspect-[734/260] leading-[8vw]">
        <h1 className="font_bold text-[clamp(8vw,8vw,7rem)] text-[#0538B9] tracking-[-0.03em] text-outline-kustom2 z-10 anim-title-1">
          Nilai Dasar
        </h1>
        <h1 className="font_bold text-[clamp(10vw,10vw,9rem)] text-[#7CA1FF] tracking-[-0.03em] text-outline-kustom2 z-10 anim-title-2">
          Organisasi
        </h1>
        <Image
          src={star}
          alt="star"
          className="absolute animate-spin [animation-duration:20s] left-[7%] w-[23%] top-[8%] rotate-[15deg] anim-star-1"
        />
        <Image
          src={star}
          alt="star"
          className="absolute animate-spin [animation-duration:20s] right-[1%] w-[20%] bottom-[8%] rotate-[15deg] anim-star-2"
        />
      </div>

      {/* puzzle disini */}
      <div className="relative w-11/12 mx-auto grid grid-cols-2">

        {/* Menambahkan kelas animasi pada setiap puzzle */}
        <div className="w-full z-10 transition-all duration-300 ease-in-out hover:scale-105 hover:translate-y-[-1vw] hover:translate-x-[-1vw] anim-puzzle-1">
          <div className="relative aspect-[450/200]">
            <Image src={adaptif_bg} alt="Adaptif shape" layout="fill" className="object-contain" />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 sm:gap-y-[2vw] sm:mt-[2vw]">
              <div className="relative w-[28%] aspect-square">
                <Image src={adaptif_icon} alt="Adaptif icon" layout="fill" className="object-contain" />
              </div>
              <h1 className="font_bold text-white text-center text-[clamp(2.5vw,2.5vw,1.5rem)] leading-tight transform -translate-y-1/2">
                Adaptif
              </h1>
            </div>
          </div>
        </div>

        <div className="w-full z-20 ml-[-39%] transition-all duration-300 ease-in-out hover:scale-105 hover:translate-y-[-1vw] hover:translate-x-[1vw] anim-puzzle-2">
          <div className="relative aspect-[450/200]">
            <Image src={rasional_bg} alt="Rasional shape" layout="fill" className="object-contain" />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 sm:gap-y-[2vw] sm:mt-[2vw]">
              <div className="relative w-[28%] aspect-square">
                <Image src={rasional_icon} alt="Rasional icon" layout="fill" className="object-contain" />
              </div>
              <h1 className="font_bold text-white text-center leading-tight transform -translate-y-1/2 text-[clamp(2.5vw,2.5vw,1.5rem)]">
                Rasional
              </h1>
            </div>
          </div>
        </div>

        <div className="w-full ml-[30.5%] mt-[-5%] z-30 transition-all duration-300 ease-in-out hover:scale-105 hover:translate-y-[1vw] hover:translate-x-[-1vw] anim-puzzle-3">
          <div className="relative aspect-[400/200]">
            <Image src={akomodatif_bg} alt="Akomodatif shape" layout="fill" className="object-contain" />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 sm:gap-y-[2vw] sm:mt-[2vw]">
              <div className="relative w-[28%] aspect-square">
                <Image src={akomodatif_icon} alt="Akomodatif icon" layout="fill" className="object-contain" />
              </div>
              <h1 className="font_bold text-white text-center leading-tight transform -translate-y-1/2 text-[clamp(2.5vw,2.5vw,1.5rem)]">
                Akomodatif
              </h1>
            </div>
          </div>
        </div>

        <div className="w-full ml-[-13%] mt-[2%] z-40 transition-all duration-300 ease-in-out hover:scale-105 hover:translate-x-[1vw] anim-puzzle-4">
          <div className="relative aspect-[465/200]">
            <Image src={harmonisasi_bg} alt="Harmonisasi shape" layout="fill" className="object-contain" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-y-[1vw] ml-[3vw]">
              <div className="relative w-[28%] aspect-square mt-[2vw]">
                <Image src={harmonisasi_icon} alt="Harmonisasi icon" layout="fill" className="object-contain" />
              </div>
              <h1 className="font_bold text-white text-center text-[clamp(2.5vw,2.5vw,1.5rem)] leading-tight mb-[3vw]">
                Harmonisasi
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}   