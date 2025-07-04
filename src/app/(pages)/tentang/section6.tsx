"use client";

import Image from "next/image";
import { useState, useRef, useLayoutEffect, useEffect } from "react";
import Folder from "../../../components/tentang/Folder";
import ChatButton from "../../../components/tentang/ChatButton";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const folderData = [
  {
    nama: "Satuan Pengendali Internal",
    imageUrl: "/Assets/image/tentang/sec6/blue.svg",
    shadowColor: "rgba(16, 75, 169, 0.4)",
    deskripsi: [
      "Pengawasan terhadap kinerja kementerian/biro di EM UB 2025 dalam aspek fungsional, operasional, dan keuangan menggunakan key performance indicators (KPI).",
      "Membuat, mensosialisasikan, dan mengawasi implementasi standar operasional prosedur (SOP) kinerja kementerian/biro Merancang sistem birokrasi yang adaptif terhadap perubahan dan berkelanjutan",
      "Memberikan pelatihan dan pengembangan terhadap seluruh fungsionaris EM UB 2025 terkait soft skills dan hard skills yang berguna untuk saat bekerja",
      "Membentuk silabus pengembangan sumber daya internal fungsionaris EM UB 2025",
      "Melayani kebutuhan seluruh perangkat organisasi EM UB 2025 dalam menjalankan tugasnya",
    ],
  },
  {
    nama: "Pergerakan",
    imageUrl: "/Assets/image/tentang/sec6/orange.svg",
    shadowColor: "rgba(255, 73, 0, 0.4)",
    deskripsi: [
      "Hadir sebagai garda terdepan yang proaktif dan progresif dalam mengawal isu advokasi kemahasiswaan di Universitas Brawijaya, dengan fokus pada kekerasan seksual dan perundungan, kebijakan kampus, dan pemenuhan hak-hak mahasiswa serta isu sosial-politik di tingkat wilayah dan nasional yang berorientasi pada kesejahteraan rakyat.",
      "Memperkuat peran aktif seluruh elemen masyarakat, termasuk mahasiswa, dalam mewujudkan tatanan sosial yang lebih adil dan demokratis dengan berlandaskan empati, rasionalitas, dan intelektualitas.",
      "Optimasi sinergitas dengan berbagai simpul gerakan sebagai upaya peningkatan efektivitas gerakan sosial melalui penguatan partisipasi masyarakat secara inklusif.",
    ],
  },
  {
    nama: "Pelayanan",
    imageUrl: "/Assets/image/tentang/sec6/blue.svg",
    shadowColor: "rgba(16, 75, 169, 0.4)",
    deskripsi: [
      "Garda terdepan bagi seluruh mahasiswa Universitas Brawijaya yang berfokus pada pengelolaan berbagai fungsi atau unit layanan secara terkoordinasi untuk memastikan integrasi, efisiensi, dan efektivitas dalam menyelesaikan keluhan yang ada",
      "Menjaga stabilitas hubungan serta memperkuat kolaborasi antar LKM/Forda dan unit lembaga kerjasama yang ada di Brawijaya",
      "Membangun jaringan sinergis yang menghubungkan mitra eksternal dan menjaring kebutuhan bilateral dan/atau multilateral yang dilakukan oleh Brawijaya",
    ],
  },
  {
    nama: "Pengabdian",
    imageUrl: "/Assets/image/tentang/sec6/orange.svg",
    shadowColor: "rgba(255, 73, 0, 0.4)",
    deskripsi: [
      "Hadir sebagai wujud representasi Universitas Brawijaya terhadap tridharma perguruan tinggi (pengabdian kepada masyarakat) kepada masyarakat Kota Malang, Jawa Timur dan Indonesia.",
      "Membangun dan mempererat komunikasi dengan berbagai elemen masyarakat, mulai dari tingkat Kota Malang, Malang Raya, Jawa Timur, hingga di tingkat nasional di Indonesia.",
      "Menekankan pada aspek keberlanjutan dan manfaat jangka panjang dalam setiap kegiatan pengabdian. Program yang disusun bertujuan untuk mencapai sasaran yang tepat, sesuai dengan kebutuhan yang ada dalam masyarakat.",
      "Melakukan usaha rekomendasi dan kritis terhadap isu sosial, lingkungan dan pendidikan.",
    ],
  },
  {
    nama: "Pengembangan ",
    imageUrl: "/Assets/image/tentang/sec6/blue.svg",
    shadowColor: "rgba(16, 75, 169, 0.4)",
    deskripsi: [
      "Membangun ekosistem yang mengoptimalkan jaringan, pembinaan, dan proyeksi untuk mengembangkan minat, bakat, akademik, dan kepemimpinan bagi seluruh Simpul Brawijaya.",
      "Menciptakan inkubator inklusif yang mendukung perkembangan individu dan menciptakan lingkungan kolaboratif.",
      "Memfasilitasi mahasiswa Universitas Brawijaya untuk mencapai prestasi yang membanggakan, sekaligus berkontribusi dalam mempertinggi reputasi universitas di tingkat nasional maupun internasional.",
      "Menyediakan platform pengembangan yang memfokuskan pada persiapan karir, dengan tujuan mengoptimalkan proyeksi karir bagi seluruh elemen dan simpul dalam ekosistem Universitas Brawijaya.",
    ],
  },
];

export default function Section6() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const activeData = folderData[activeIndex];

  const containerRef = useRef(null);
  const descriptionRef = useRef(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        "(min-width: 768px)": () => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 60%",
              end: "bottom 20%",
              toggleActions: "restart reverse restart reverse",
            },
          });

          tl.from(".anim-title-s6", {
            y: -80,
            opacity: 0,
            skewX: -10,
            stagger: 0.1,
            duration: 1,
            ease: "power3.out",
          });
          tl.from(
            ".anim-folder",
            {
              y: -300,
              opacity: 0,
              stagger: 0.15,
              duration: 1.2,
              ease: "bounce.out",
            },
            "-=0.5"
          );
          tl.from(
            ".anim-desc-box",
            { scale: 0.7, opacity: 0, duration: 0.8, ease: "back.out(1.7)" },
            "-=1"
          );
          tl.from(
            [".anim-mori-s6", ".anim-chat-s6"],
            { x: -100, opacity: 0, stagger: 0.2 },
            "-=0.5"
          );
          tl.from(descriptionRef.current, { opacity: 0, y: 20 }, "-=0.3");
        },

        "(max-width: 767px)": () => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 90%",
              end: "bottom 20%",
              toggleActions: "restart reverse restart reverse",
            },
          });

          tl.from(".anim-title-s6", {
            y: -50,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: "power2.out",
          });
          tl.from(
            [".anim-mori-s6", ".anim-chat-s6"],
            { x: -100, opacity: 0, stagger: 0.2 },
            "-=0.5"
          );
          tl.from(
            ".anim-folder",
            {
              y: -100,
              opacity: 0,
              stagger: 0.1,
              duration: 0.8,
              ease: "power2.out",
            },
            "-=0.3"
          );
          tl.from(
            ".anim-desc-box",
            { scale: 0.9, opacity: 0, duration: 0.6, ease: "power2.out" },
            "-=0.5"
          );
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (descriptionRef.current) {
      gsap
        .timeline()
        .to(descriptionRef.current, {
          opacity: 0,
          y: -15,
          duration: 0.2,
          ease: "power2.in",
        })
        .to(descriptionRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        });
    }
  }, [activeIndex]);

  return (
    <div
      ref={containerRef}
      className="relative w-full mx-auto sm:aspect-[1680/920] mb-10  sm:mt-0 flex items-center flex-col"
    >
      <div className="flex flex-row items-center gap-x-[3%] mb-[1vw]">
        <Image
          src="/Assets/image/tentang/sec6/arrow.svg"
          alt="arrow"
          className="absolute left-[20%] top-[3%] sm:top-[7%] w-[15%] anim-title-s6"
          width={100}
          height={100}
        />
        <h1 className="text-[#0049FF] text-[clamp(6vw,6vw,6rem)] font_bold text-outline-kustom2 drop-shadow-sm anim-title-s6">
          Arahan
        </h1>
        <h1 className="text-[#FF4900] text-[clamp(6vw,6vw,6rem)] font_bold text-outline-kustom2 drop-shadow-sm anim-title-s6">
          Strategis
        </h1>
      </div>

      <div
        className="flex flex-row items-end gap-x-[2%] w-full md:justify-center justify-start overflow-x-auto snap-x snap-mandatory px-4 pt-[5vw] pb-[10vw] mb-[-2vw] scrollbar-hide"
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
              className="anim-folder snap-start flex-shrink-0 sm:px-0 px-[1vw]"
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

      <Image
        src="/Assets/image/tentang/mori1.svg"
        alt="Mori"
        className="sm:absolute sm:mb-0  bottom-[10%] left-0 sm:w-[25%] w-[25%] z-30 rotate-[15deg] anim-mori-s6"
        width={300}
        height={300}
      />

      <div className="rounded-[2vw] bg-[linear-gradient(87.83deg,#A1BCFF_1.25%,#E6EDFF_100%)] w-11/12 sm:justify-between justify-center flex flex-row p-[3vw] aspect-[1680/334] gap-x-[2vw] items-center anim-desc-box">
        <div className="z-30 sm:flex items-end mt-[15vw] ml-[10vw] justify-end flex-col anim-chat-s6 hidden">
          <ChatButton size="clamp(1.5vw, 1.5vw, 0.5rem)">
            Scroll ke bawah!
          </ChatButton>
        </div>

        <div
          ref={descriptionRef}
          className="w-[80%] sm:w-[70%]  sm:overflow-y-auto sm:pr-4 flex flex-col justify-end items-start gap-y-3 text-start sm:pt-0 sm:pb-0 pt-[2vw] pb-[1vw]"
        >
          {activeData.deskripsi.map((line, index) => (
            <p
              key={index}
              className="text-[#0538B9] sm:text-[clamp(1.5vw,1.5vw,1rem)] font_bold"
            >
              {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
