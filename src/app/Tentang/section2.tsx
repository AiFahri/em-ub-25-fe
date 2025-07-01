"use client";

import styles from "../Components/TentangComponents/BackgroundNama.module.css";
import React from "react";
import Image from "next/image";
import { useRef, useLayoutEffect } from "react";
import bg from "../../../public/Assets/background/tentang/sec2/bg_left.svg";
import pres from "../../../public/Assets/image/tentang/sec2/pres.svg";
import vector from "../../../public/Assets/image/tentang/vector_sec2.svg";
import vector2 from "../../../public/Assets/image/tentang/vector2.svg";
import smile from "../../../public/Assets/icon/tentang/section2/smile.svg";
import ghost from "../../../public/Assets/icon/tentang/section2/ghost.svg";
import mad from "../../../public/Assets/icon/tentang/section2/mad.svg";
import bridge from "../../../public/Assets/icon/tentang/section2/bridge.svg";
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
        },
      });

      // 1. Animasi Elemen Dekoratif TERLEBIH DAHULU
      tl.from(".anim-decor", {
        opacity: 0,
        scale: 0.5,
        stagger: {
          each: 0.2,
          from: "random",
        },
        duration: 1.2,
        ease: "power2.out",
      });

      // 2. SETELAH ITU, animasikan Konten Utama
      tl.from(
        ".anim-main-content",
        {
          xPercent: -20,
          opacity: 0,
          scale: 0.95,
          duration: 1.2,
          ease: "power3.out",
        },
        ">-0.8"
      );

      // ================== START PERUBAHAN DI SINI ==================
      // 3. Terakhir, animasikan Judul. HANYA animasikan posisi, bukan opacity.
      tl.from(
        ".anim-main-title",
        {
          yPercent: -100,
          // opacity: 0, <-- DIHAPUS untuk membiarkan Framer Motion bekerja
          duration: 1,
          ease: "back.out(1.7)",
        },
        "<0.3"
      );
      // =================== AKHIR PERUBAHAN ===================
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative w-full flex flex-col items-center aspect-[1850/1900]">
      <h1 className="text-[#FF4900] font_bold text-[10vw] text-outline-kustom drop-shadow-sm">
        Sambutan
      </h1>

      <div className="relative flex flex-row  aspect-[1660/700] w-[95%]">
        <div className="relative w-[60%] ml-[1.5vw]">
          <Image src={bg} alt="bg" className="w-full overflow-hidden " />
          <Image
            src={pres}
            alt="pres"
            className="absolute w-[60%] bottom-[7.2%] left-1/2 -translate-x-1/2"
          />
        </div>
        <Image
          src={mad}
          alt="mad"
          className="w-[7%] absolute right-[37%] top-[19%] z-10"
        />
        <Image
          src={ghost}
          alt="ghost"
          className="w-[7.5%] absolute left-[0%] bottom-[8.5%] z-10"
        />
        <Image
          src={smile}
          alt="smile"
          className="w-[9%] absolute right-[38%] bottom-[6%] z-10 border-[#FF4900] border-[1.2vw] rounded-full p-[0.7vw]"
        />
        <Image
          src={bridge}
          alt="bridge"
          className="w-[6%] absolute right-[34.8%] bottom-[15%] z-10"
        />
        <div className="w-[40%] flex flex-col items-center  relative ">
          <div className="flex flex-col  text-start gap-y-[0.1vw] leading-[10vw] ">
            <h1 className="text-[#0049FF] font_bold text-[6vw] text-outline-kustom2 drop-shadow-sm">
              Presiden
            </h1>
            <h2 className="text-[#0049FF] font_bold text-[7vw] text-outline-kustom drop-shadow-sm leading-[6vw]">
              EM UB <br />
              2025
            </h2>
          </div>
          <h1
            className={`${styles.namaContainer} bg-[#FF4900]  px-[5vw] py-[1vw] text-center absolute bottom-[-5%] right-[2%] z-20 text-[#fff] font_bold text-[2.5vw] rounded-full`}
          >
            <span>Azka Rasyad Alfatdi</span>
          </h1>
        </div>
      </div>
      <h1>tes</h1>
    </div>
  );
}
