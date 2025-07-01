'use client';

import React from "react";
import Image from "next/image";
import { useRef, useLayoutEffect } from "react";
import bg from "../../../public/assets/background/tentang/sec2/bg.svg";
import vector from "../../../public/Assets/image/tentang/vector_sec2.svg";
import vector2 from "../../../public/Assets/image/tentang/vector2.svg";
import bg_left from "../../../public/Assets/background/tentang/sec2/bg_left.svg";
import bg_right from "../../../public/Assets/background/tentang/sec2/bg_right.svg";
import smile from "../../../public/Assets/icon/tentang/section2/smile.svg";
import ghost from "../../../public/Assets/icon/tentang/section2/ghost.svg";
import mad from "../../../public/Assets/icon/tentang/section2/mad.svg";
import Letters from "../Components/TentangComponents/Letters";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Section2() {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "bottom 20%",
          toggleActions: "restart reverse restart reverse",
        }
      });

      // 1. Animasi Elemen Dekoratif TERLEBIH DAHULU
      tl.from(".anim-decor", {
        opacity: 0,
        scale: 0.5,
        stagger: {
          each: 0.2,
          from: "random"
        },
        duration: 1.2,
        ease: "power2.out"
      });
      
      // 2. SETELAH ITU, animasikan Konten Utama
      tl.from(".anim-main-content", {
        xPercent: -20,
        opacity: 0,
        scale: 0.95,
        duration: 1.2,
        ease: "power3.out"
      }, ">-0.8");

      // ================== START PERUBAHAN DI SINI ==================
      // 3. Terakhir, animasikan Judul. HANYA animasikan posisi, bukan opacity.
      tl.from(".anim-main-title", {
        yPercent: -100,
        // opacity: 0, <-- DIHAPUS untuk membiarkan Framer Motion bekerja
        duration: 1,
        ease: "back.out(1.7)"
      }, "<0.3");
      // =================== AKHIR PERUBAHAN ===================

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative w-full aspect-[1900/1000] overflow-x-hidden" ref={containerRef}>
      {/* main content */}
      <div className="relative w-[95%] mx-auto h-full z-20 anim-main-content">
        <Image src={bg} alt="Background Section 2" fill className="z-10" />

        <div className="relative z-20 flex flex-col justify-center h-full w-full">
          <Image src={bg_left} alt="Background Section 2" className="absolute left-[3.4%] w-[42%]" />
          <Image src={smile} alt="Smile Icon" className="shake-on-hover absolute left-[40.7%] top-[39%] w-[6.5%]" />
          <Image src={bg_right} alt="Background Section 2" className="absolute right-[6%] w-[42%]" />
          <Image src={ghost} alt="Ghost Icon" className="shake-on-hover absolute right-[42.6%] bottom-[17%] w-[7.5%]" />
          <Image src={mad} alt="Mad Icon" className="shake-on-hover absolute right-[2.5%] top-[32%] w-[7%]" />
          <h1 className="absolute right-[5.1%] bottom-[36%] border-[0.7vw] border-[#0049FF] rounded-full w-[4%] h-[7%]" />
          
          {/* Kelas animasi tetap di sini, tapi GSAP hanya akan mengubah posisinya */}
          <Letters
            text="Sambutan"
            className="font_bold text-[#FF4900] text-[clamp(7vw,7vw,8rem)] tracking-[-0.04em] absolute top-[10%] left-[14.5%] text-outline-kustom anim-main-title"
            delayStart={1.5}
          />
        </div>
      </div>

      {/* content variation / DEKORASI */}
      <div className="absolute top-1 left-0 w-[12%] h-[50%] border-[1vw] border-[#FF4900] rounded-r-full anim-decor" />
      <Image src={vector} alt="vector" className="absolute top-0 right-[1%] w-[15%] anim-decor" />
      <Image src={vector2} alt="vector" className="absolute bottom-0 left-0 w-[20%] anim-decor" />
      <div className="absolute bottom-[3%] right-[2%] w-[25%] h-[20%] bg-[#FF7C48] rounded-t-full anim-decor" />
    </div>
  );
}