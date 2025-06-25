"use client";

import Image from "next/image";
import orange from "../../../public/Assets/image/tentang/sec7/orange.svg";
import blue from "../../../public/Assets/image/tentang/sec7/blue.svg";
import arrow_blue from "../../../public/Assets/image/tentang/sec7/arrow_blue.svg";
import arrow_orange from "../../../public/Assets/image/tentang/sec7/arrow_orange.svg";
import hashtag from "../../../public/Assets/image/tentang/sec7/hashtag.svg";

export default function Section7() {
  return (
    <div className="w-full aspect-[2238/724] justify-center items-center overflow-hidden flex relative">
      <div className="flex flex-col justify-center items-center text-outline-kustom3 tracking-tighter leading-[9vw] drop-shadow-sm text-[9vw]">
        <h1 className="text-[#0049FF] font_bold">STRUKTUR</h1>
        
        {/* --- PERBAIKAN HANYA DI SINI: Tambahkan kelas 'relative' --- */}
        <div className="relative flex flex-row gap-x-[1vw] items-center">
          <h1 className="text-[#FF4900] z-20 font_bold">SIMPUL</h1>
          <h1 className="text-[#0049FF] font_bold z-30">MEMORI</h1>
          
          {/* Posisi semua gambar di bawah ini sekarang akan stabil */}
          <Image
            src={orange}
            alt="orange"
            className="absolute z-10 right-[13%] bottom-[31%] w-[8%] rotate-[19deg] 
                       transition-all duration-300 ease-in-out 
                       hover:scale-110 hover:z-50"
          />
          <Image
            src={blue}
            alt="blue"
            className="absolute z-10 left-[41.5%] bottom-[15%] w-[7%] rotate-[28deg] transition-all duration-300 ease-in-out 
                       hover:scale-110 hover:z-50"
          />
          <Image
            src={hashtag}
            alt="hashtag"
            className="absolute z-30 right-[-6%] bottom-[-22%] w-[12%]"
          />
          <Image
            src={arrow_blue}
            alt="blue arrow"
            className="absolute z-10 left-[0%] bottom-[-45%] w-[20%]"
          />
          <Image
            src={arrow_orange}
            alt="orange arrow"
            className="absolute z-10 left-[1%] top-[-120%] w-[20%]"
          />
        </div>
      </div>

      {/* Gambar-gambar di luar komposisi utama ini tidak diubah */}
      <Image
        src={orange}
        alt="orange outer"
        className="absolute left-[-4%] bottom-[4%] w-[10%] rotate-[25deg] transition-all duration-300 ease-in-out 
                   hover:scale-110 hover:z-50"
      />
      <Image
        src={blue}
        alt="blue outer"
        className="absolute right-[-4%] top-[10%] w-[15%] rotate-[-34deg] transition-all duration-300 ease-in-out 
                   hover:scale-110 hover:z-50"
      />
    </div>
  );
}