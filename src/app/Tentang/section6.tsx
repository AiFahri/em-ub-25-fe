// File: section6.tsx (Lengkap dengan Animasi)
"use client";

import Image from "next/image";
import { useState, useRef, useLayoutEffect, useEffect } from "react"; 
import arrow from "../../../public/Assets/image/tentang/sec6/arrow.svg";
import Folder from "../Components/TentangComponents/Folder";
import orange from "../../../public/Assets/image/tentang/sec6/orange.svg";
import blue from "../../../public/Assets/image/tentang/sec6/blue.svg";
import mori1 from "../../../public/Assets/image/tentang/mori1.svg";
import ChatButton from "../Components/TentangComponents/ChatButton";


import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

const folderData = [

  {
    nama: "Satuan Pengendali Internal",
    imageUrl: blue,
    shadowColor: "rgba(16, 75, 169, 0.4)",
    deskripsi:
      "Ini adalah deskripsi untuk Satuan Pengendali Internal. Bertugas untuk memastikan semua berjalan sesuai rencana strategis.",
  },
  {
    nama: "Pergerakan",
    imageUrl: orange,
    shadowColor: "rgba(255, 73, 0, 0.4)",
    deskripsi:
      "Deskripsi untuk Pergerakan. Mengawal isu-isu strategis dan menginisiasi aksi yang berdampak bagi mahasiswa dan masyarakat.",
  },
  {
    nama: "Pelayanan",
    imageUrl: blue,
    shadowColor: "rgba(16, 75, 169, 0.4)",
    deskripsi:
      "Membangun dan menjaga hubungan baik dengan berbagai pihak eksternal untuk kemajuan organisasi.",
  },
  {
    nama: "Pengabdian",
    imageUrl: orange,
    shadowColor: "rgba(255, 73, 0, 0.4)",
    deskripsi:
      "Wujud nyata kontribusi Universitas Brawijaya kepada masyarakat melalui program-program pemberdayaan yang berkelanjutan.",
  },
  {
    nama: "Pengembangan ",
    imageUrl: blue,
    shadowColor: "rgba(16, 75, 169, 0.4)",
    deskripsi:
      "Meningkatkan kualitas sumber daya mahasiswa melalui pelatihan dan pengembangan kapasitas internal.",
  },
];

export default function Section6() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const activeData = folderData[activeIndex];


  const containerRef = useRef(null);
  const descriptionRef = useRef(null);


  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
          end: "bottom 20%",
          toggleActions: "restart reverse restart reverse",
        },
      });

      tl.from(".anim-title-s6", { y: -80, opacity: 0, skewX: -10, stagger: 0.1, duration: 1, ease: "power3.out" });
      tl.from(".anim-folder", {
        y: -300,
        opacity: 0,
        stagger: 0.15,
        duration: 1.2,
        ease: "bounce.out",
      }, "-=0.5");

      tl.from(".anim-desc-box", { scale: 0.7, opacity: 0, duration: 0.8, ease: "back.out(1.7)" }, "-=1");
      tl.from([".anim-mori-s6", ".anim-chat-s6"], { x: -100, opacity: 0, stagger: 0.2 }, "-=0.5");
      tl.from(descriptionRef.current, { opacity: 0, y: 20 }, "-=0.3");

    }, containerRef);

    return () => ctx.revert();
  }, []);
  

  useEffect(() => {
    if (descriptionRef.current) {
        gsap.timeline()
            .to(descriptionRef.current, { opacity: 0, y: -15, duration: 0.2, ease: "power2.in" })
            .to(descriptionRef.current, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" });
    }
  }, [activeIndex]); 


  return (
    <div ref={containerRef} className="relative w-11/12 mx-auto aspect-[1680/1000] sm:mt-0 mt-[-10vh] flex items-center flex-col gap-y-[3vw] overflow-hidden">
      <div className="flex flex-row items-center gap-x-[3%]">
        <Image src={arrow} alt="arrow" className="absolute left-[17%] top-[8%] w-[15%] anim-title-s6" />
        <h1 className="text-[#0049FF] text-[clamp(6vw,6vw,6rem)] font_bold text-outline-kustom2 drop-shadow-sm anim-title-s6">
          Arahan
        </h1>
        <h1 className="text-[#FF4900] text-[clamp(6vw,6vw,6rem)] font_bold text-outline-kustom2 drop-shadow-sm anim-title-s6">
          Strategis
        </h1>
      </div>

      <div
        className="flex flex-row items-end gap-x-[2%] justify-center w-full"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {folderData.map((folder, index) => {
          const isHovered = hoveredIndex === index;
          const isDimmed = hoveredIndex !== null && !isHovered;
          const isActive = activeIndex === index;
          return (
            <div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onClick={() => setActiveIndex(index)}
              style={{ cursor: "pointer" }}
              className="anim-folder" 
            >
              <Folder
                nama={folder.nama}
                imageUrl={folder.imageUrl}
                isHovered={isHovered}
                isDimmed={isDimmed}
                isActive={isActive}
                shadowColor={folder.shadowColor}
              />
            </div>
          );
        })}
      </div>

      <div className="w-full rounded-[2vw] bg-[linear-gradient(87.83deg,#A1BCFF_1.25%,#E6EDFF_100%)] justify-between flex flex-row p-[3vw] aspect-[1680/334] gap-x-[10vw] items-center anim-desc-box">
        <Image src={mori1} alt="Mori " className="w-[17%] rotate-[15deg] anim-mori-s6" />
        <div className="z-30 absolute bottom-[14%] left-[14%] w-[5%] anim-chat-s6">
          <ChatButton size="clamp(1vw, 1vw, 0.5rem)">Scroll ke bawah!</ChatButton>
        </div>
        <div className="flex flex-col items-center gap-y-[2vw]">
          <p ref={descriptionRef} className="text-[#0538B9] text-[clamp(1.5vw,1.5vw,1rem)] font_bold text-center">
            {activeData.deskripsi}
          </p>
        </div>
      </div>
    </div>
  );
}