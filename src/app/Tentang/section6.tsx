// File: section6.tsx (Disesuaikan untuk Gambar)
"use client";

import Image from "next/image";
import { useState } from "react";
import arrow from "../../../public/Assets/image/tentang/sec6/arrow.svg";
import Folder from "../Components/TentangComponents/Folder";
import orange from "../../../public/Assets/image/tentang/sec6/orange.svg";
import blue from "../../../public/Assets/image/tentang/sec6/blue.svg";
import mori1 from "../../../public/Assets/image/tentang/mori1.svg";
import ChatButton from "../Components/TentangComponents/ChatButton";

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
    nama: "Diplomasi dan Jaringan Organisasi",
    imageUrl: blue,
    shadowColor: "rgba(16, 75, 169, 0.4)",
    deskripsi:
      "Membangun dan menjaga hubungan baik dengan berbagai pihak eksternal untuk kemajuan organisasi.",
  },
  {
    nama: "Pengabdian dan Pemberdayaan Masyarakat",
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

  return (
    <div className="relative w-11/12 mx-auto aspect-[1680/1000] sm:mt-0 mt-[-20vh] flex items-center flex-col gap-y-[3vw]">
      <div className="flex flex-row items-center gap-x-[3%]">
        <Image
          src={arrow}
          alt="arrow"
          className="absolute left-[17%] top-[8%] w-[15%]"
        />

        <h1 className="text-[#0049FF] text-[6vw] font_bold text-outline-kustom2 drop-shadow-sm">Arahan</h1>

        <h1 className="text-[#FF4900] text-[6vw] font_bold text-outline-kustom2 drop-shadow-sm">
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
            // 4. Tambahkan event onClick untuk mengubah state aktif
            <div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onClick={() => setActiveIndex(index)} // <-- TAMBAHKAN INI
              style={{ cursor: "pointer" }} // Ubah cursor menjadi pointer
            >
              <Folder
                nama={folder.nama}
                imageUrl={folder.imageUrl}
                isHovered={isHovered}
                isDimmed={isDimmed}
                isActive={isActive} // <-- KIRIM INFO 'ACTIVE' KE KOMPONEN FOLDER
                shadowColor={folder.shadowColor}
              />
            </div>
          );
        })}
      </div>

      <div className="w-full rounded-[2vw] bg-[linear-gradient(87.83deg,#A1BCFF_1.25%,#E6EDFF_100%)] justify-between flex flex-row p-[3vw] aspect-[1680/334] gap-x-[10vw] items-center">
        <Image src={mori1} alt="Mori " className="w-[17%] rotate-[15deg]" />
        <div className="z-30 absolute bottom-[14%] left-[14%] w-[5%]">
          <ChatButton size="0.9vw">Scroll ke bawah!</ChatButton>
        </div>
        <div className="flex flex-col items-center gap-y-[2vw]">
          {/* 5. Ganti teks statis dengan teks dinamis dari activeData */}
          {/* Saya sarankan menggunakan <p> untuk deskripsi panjang */}
          <p className="text-[#0538B9] text-[1.5vw] font_bold text-center">
            {activeData.deskripsi}
          </p>
        </div>
      </div>
    </div>
  );
}
