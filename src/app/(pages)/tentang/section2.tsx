"use client";

import styles from "../../../components/tentang/BackgroundNama.module.css";
import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const dataProfil = {
  presiden: {
    jabatan: "Presiden",
    nama: "Azka Rasyad Alfatdi",
    fakultas: "Fakultas Hukum 2021",
    gambar: "/Assets/image/tentang/sec2/Presiden.webp",
    background: "/Assets/background/tentang/sec2/bg_left.svg",
    smiley: "/Assets/icon/tentang/section2/smile.svg",
    bridge: "/Assets/icon/tentang/section2/bridge.svg",
    deskripsi: [
      "Dengan penuh rasa bangga dan hormat, saya, selaku Presiden Eksekutif Mahasiswa Universitas Brawijaya Tahun 2025, menyampaikan salam hangat kepada seluruh mahasiswa dan sivitas akademika Universitas Brawijaya yang saya cintai.",
      "Eksekutif Mahasiswa Universitas Brawijaya bukanlah sekadar struktur, melainkan sebuah simpul! Simpul dari semangat, simpul dari mimpi, simpul dari kekuatan kolektif seluruh elemen mahasiswa Universitas Brawijaya.  Semua terajut dalam satu ikatan perjuangan: Brawijaya yang lebih digdaya!",
      "EM UB bukan milik satu kelompok. Bukan pula milik satu arus. EM UB adalah milik kita semua. EM UB adalah wadah, jembatan, dan garda depan gerakan mahasiswa yang menjunjung nilai akademis, etika, dan keberpihakan terhadap rakyat. Di sinilah kita bertemu. Di sinilah kita menyatu. Karena di Brawijaya, kita tidak berjalan sendiri-sendiri. Kita berjalan sebagai satu tubuh!",
      "Tahun 2025 adalah waktu kita untuk bangkit, untuk memekikkan semangat perubahan, dan untuk menjadikan kampus ini bukan hanya ruang belajar, tetapi juga ruang berdaya, ruang berkarya, dan ruang bersuara! Kita bukan generasi yang hanya duduk menunggu perubahan, kita adalah generasi yang menciptakannya!",
      'EM UB hadir bukan hanya untuk mengelola program kerja, tetapi untuk membangun peradaban. Kami bergerak dengan data, berpikir dengan nurani, dan berjuang dengan keberanian. Visi kami jelas: "Mewujudkan Eksekutif Mahasiswa Universitas Brawijaya 2025 sebagai Simpul Memori yang Inklusif dan Progresif dalam Harmonisasi Cita Karakter Brawijaya."',
      "EM UB mengundang rekan-rekan semua, dari mahasiswa baru yang penuh semangat, hingga mahasiswa tingkat akhir yang sarat pengalaman, untuk menjadi bagian dari perubahan ini. Mari kita satukan barisan, satukan pikiran, kita satukan tekad, dan kita pancangkan panji Brawijaya sebagai kampus rakyat, kampus perjuangan, kampus peradaban, kampus masa depan!",
      "Akhir kata, kepada seluruh warga kampus Universitas Brawijaya: Bersatulah dalam mimpi! Bergeraklah dalam visi! Berjuanglah dalam integritas! Karena kita bukan hanya mahasiswa biasa. Kita adalah anak zaman yang sedang menulis sejarah!",
    ],
    welcomeWords: [
      "Assalamu’alaikum warahmatullahi wabarakatuh, Salam sejahtera bagi kita semua, Om swastiastu, Namo buddhaya, Salam kebajikan, Rahayu",
      "Hidup mahasiswa! Hidup Rakyat Indonesia Kita Satu Brawijaya!",
    ],
    closingWords: [
      "Hidup mahasiswa! Hidup rakyat Indonesia! Kita Satu Brawijaya!",
      "Wassalamu’alaikum warahmatullahi wabarakatuh.",
      "Malang, 2025",
      "Presiden Eksekutif Mahasiswa Universitas Brawijaya",
    ],
  },
  wapres: {
    jabatan: "Wakil Presiden",
    nama: "Muhammad Ghifari Aulia",
    fakultas: "Fakultas Teknik 2021",
    gambar: "/Assets/image/tentang/sec2/Wakil Presiden EM.png",
    background: "/Assets/background/tentang/sec2/bg_wapres.svg",
    smiley: "/Assets/icon/tentang/section2/smileOrange.svg",
    bridge: "/Assets/icon/tentang/section2/bridgeBlue.svg",
    deskripsi: [
      "Jika ada hal-hal baik yang dapat kami pertaruhkan, maka organisasi ini adalah jawabannya. Organisasi yang sedang berusaha untuk bisa terus tumbuh, berkembang, dan menjawab segala tantangan dengan cara yang adaptif dan rasional...",
      "Dalam segala dinamika yang ada, kami memilih untuk berjalan secara rasional: membuat keputusan yang berbasis pada data, refleksi, dan kepentingan bersama...",
      "Sebagai penutup, kami percaya bahwa ARAH gerak organisasi ini selayaknya berpijak pada nilai keadilan dan bermuara pada terciptanya kesejahteraan bersama...",
    ],
    welcomeWords: [
      "Assalamualaikum Warohmatullah Wabarakatuh",
      "Salam Keadilan Sejahtera, Bagi kita semua.",
      "Selamat datang di laman resmi Eksekutif Mahasiswa Universitas Brawijaya 2025.",
    ],
    closingWords: [""],
  },
};

type ProfilKey = keyof typeof dataProfil;

export default function Section2() {
  const containerRef = useRef(null);
  const [profilAktif, setProfilAktif] = useState<ProfilKey>("presiden");
  const [isExpanded, setIsExpanded] = useState(false);
  const profileContentRef = useRef(null);
  const descriptionWrapperRef = useRef(null);
  const clickMeRef = useRef(null);
  const isInitialMount = useRef(true);

  const handleProfileToggle = () => {
    if (!profileContentRef.current || !descriptionWrapperRef.current) return;

    gsap
      .timeline({
        onComplete: () => {
          setProfilAktif((prev) =>
            prev === "presiden" ? "wapres" : "presiden"
          );
        },
      })
      .to([profileContentRef.current, descriptionWrapperRef.current], {
        opacity: 0,
        y: -20,
        duration: 0.4,
        ease: "power2.in",
        stagger: 0.1,
      });
  };

  const handleToggleExpand = () => {
    setIsExpanded((prevState) => !prevState);
  };

  const dataSekarang = dataProfil[profilAktif];

  useEffect(() => {
    setIsExpanded(false);
  }, [profilAktif]);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 95%",
          end: "bottom 30%",
          toggleActions: "restart reverse restart reverse",
        },
      });
      tl.from(".anim-decor", {
        opacity: 0, scale: 0.5, stagger: { each: 0.2, from: "random" },
        duration: 0.8, ease: "power2.out",
      });
      tl.from(".anim-main-content, .anim-main-title", {
        xPercent: -20, opacity: 0, scale: 0.95,
        duration: 0.8, ease: "power3.out", stagger: 0.1
      }, ">-0.4");

      if (clickMeRef.current) {
        gsap.to(clickMeRef.current, { y: -15, repeat: -1, yoyo: true, duration: 0.8, ease: "sine.inOut" });
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (profileContentRef.current && descriptionWrapperRef.current) {
      gsap.fromTo(
        [profileContentRef.current, descriptionWrapperRef.current],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.15 }
      );
    }
  }, [profilAktif]);

  return (
    <div
      ref={containerRef}
      className="relative w-full flex flex-col items-center pb-20 mt-[-2vw]"
    >
      <h1 className="text-[#FF4900] font_bold text-[10vw] text-outline-kustom drop-shadow-sm overflow-hidden anim-main-title">
        Sambutan
      </h1>

      <div
        ref={profileContentRef}
        className="relative flex flex-row aspect-[1660/700] w-[95%] anim-main-content"
      >
        <div className="relative w-[60%] ml-[1.5vw]">
          <Image
            src={dataSekarang.background}
            alt="bg_profil"
            className="w-full"
            width={0}
            height={0}
          />
          <Image
            src={dataSekarang.gambar}
            alt="foto_profil"
            className="absolute w-[35%] bottom-[7.2%] left-1/2 -translate-x-1/2"
            width={0}
            height={0}
          />
        </div>

        <Image
          src="/Assets/icon/tentang/section2/mad.svg"
          alt="mad"
          className="w-[7%] absolute right-[37%] top-[19%] z-10 anim-decor"
          width={0}
          height={0}
        />
        <Image
          src="/Assets/icon/tentang/section2/ghost.svg"
          alt="ghost"
          className="w-[7.5%] absolute left-[0%] bottom-[8.5%] z-10 anim-decor"
          width={0}
          height={0}
        />
        <Image
          src={dataSekarang.smiley}
          alt="smiley"
          className={`w-[9%] absolute right-[38%] bottom-[6%] z-10 border-[1.2vw] rounded-full p-[0.7vw] cursor-pointer anim-decor ${profilAktif === "presiden" ? "border-[#FF4900]" : "border-[#0049FF]"
            }`}
          onClick={handleProfileToggle}
          width={0}
          height={0}
        />
        <Image
          src={dataSekarang.bridge}
          alt="bridge"
          className="w-[6%] absolute right-[34.8%] bottom-[15%] z-10 anim-decor"
          width={0}
          height={0}
        />
        <Image
          ref={clickMeRef}
          src="/Assets/icon/tentang/section2/clickMe.svg"
          alt="clickMe"
          className="w-[20vw] absolute right-0 bottom-0 z-30"
          width={0}
          height={0}
        />

        <div className="w-[40%] flex flex-col items-center relative">
          <div
            className={`flex flex-col text-start gap-y-[0.1vw] leading-[10vw] ${profilAktif === "presiden" ? "ml-[0vw]" : "ml-[2.5vw]"
              }`}
          >
            <h1
              className={`font_bold text-outline-kustom2 drop-shadow-sm ${profilAktif === "presiden"
                ? "text-[6vw] text-[#0049FF]"
                : "text-[5vw] text-[#FF4900]"
                }`}
            >
              {dataSekarang.jabatan}
            </h1>
            <h2
              className={`text-[#0049FF] font_bold text-[7vw] text-outline-kustom drop-shadow-sm leading-[6vw] ${profilAktif === "presiden" ? "text-[#0049FF]" : "text-[#FF4900]"
                }`}
            >
              EM UB <br />
              2025
            </h2>
          </div>

          <div className="flex flex-col items-center justify-center relative gap-y-[1vw] right-[1vw] absolute bottom-[-7%]">
            <h1
              className={`${styles.namaContainer
                } py-[1vw] text-center text-white font_bold text-[2.5vw] rounded-full ${profilAktif === "presiden"
                  ? "px-[6vw] bg-[#FF4900]"
                  : "px-[3.2vw] bg-[#0049FF]"
                }`}
            >
              {dataSekarang.nama}
            </h1>

            <h2
              className={`px-[5vw] py-[1vw] text-center text-white text-[2vw] font-bold rounded-full ${profilAktif === "presiden" ? "bg-[#FF4900]" : "bg-[#0049FF]"
                }`}
            >
              {dataSekarang.fakultas}
            </h2>
          </div>
        </div>
      </div>

      <div ref={descriptionWrapperRef} className="relative w-[90%] mt-4">
        <div className="background-dengan-tonjolan w-full bg-[#E6EDFF] drop-shadow-xl flex flex-col justify-start text-[#0049FF] p-[3vw] gap-y-[1.5vw] text-[1.5vw] relative z-10">
          {dataSekarang.welcomeWords.map((text, index) => (
            <p
              key={`welcome-${index}`}
              className={`text-[1.8vw] mb-[1.5vw] font_bold ${profilAktif === "presiden" ? "w-full" : "max-w-[35%]"
                }`}
            >
              {text}
            </p>
          ))}

          <div
            className={`transition-all duration-700 ease-in-out transition-transform  ${isExpanded
              ? "max-h-full opacity-100"
              : "max-h-[20vw] opacity-100 overflow-y-auto custom-scrollbar"
              }`}
          >
            <div className="pt-[1.5vw]">
              {dataSekarang.deskripsi.map((text, index) => (
                <p
                  key={`desc-${index}`}
                  className="text-[1.8vw] leading-tight mb-[1.5vw]"
                >
                  {text}
                </p>
              ))}
            </div>

            <div className="pt-[1.5vw]">
              {dataSekarang.closingWords.map((text, index) => (
                <p
                  key={`closing-${index}`}
                  className="text-[1.8vw] leading-tight max-w-[35%] mb-[1.5vw]"
                >
                  {text}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div
          onClick={handleToggleExpand}
          className="w-[5vw] h-[5vw] bg-[#0049FF] rounded-full flex absolute bottom-0 right-0 -translate-x-[5%] translate-y-3/5 cursor-pointer z-20"
        >
          <Image
            src="/Assets/icon/tentang/section2/arrow.svg"
            alt="arrow"
            className={`w-[50%] mx-auto transition-transform duration-500 ease-in-out ${isExpanded ? "rotate-180" : "rotate-0"
              }`}
            width={0}
            height={0}
          />
        </div>
      </div>
    </div>
  );
}
