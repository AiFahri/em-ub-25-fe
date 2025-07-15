// src/app/(pages)/proker/[slug]/page.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";

import Mori from "@/assets/proker/mori-full.svg";
import MoriCard from "@/assets/proker/mori-card-subpage.svg";
import SubpageBg from "@/assets/proker/subpage-bg.svg";
// import { FileText } from "lucide-react";
import ProkerDetailSkeleton from "@/components/proker/ProkerDetailSkeleton";
import Bubble1 from "@/assets/proker/proker-subpage-bubble1.svg";
import Bubble2 from "@/assets/proker/proker-subpage-bubble2.svg";
import Bubble3 from "@/assets/proker/proker-subpage-bubble3.svg";

import {
  GET_WORK_PROGRAM_BY_SLUG,
  LIST_WORK_PROGRAMS,
} from "@/graphql/queries/proker/prokerQueries";
import ProkerSideCard from "@/components/proker/ProkerSideCard"; // Pastikan path benar
// import MaskedImage from "@/components/proker/ProkerSubPageImage";
import ProkerSubPageImage from "@/components/proker/ProkerSubPageImage";

const IMAGE_BASE_URL = "https://is3.cloudhost.id/em-ub-2025/";

// const MinistryLogo: React.FC = () => (
//   <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg">
//     O
//   </div>
// );

const ProkerDetailPage: React.FC = () => {
  const params = useParams();
  const slug = params?.slug as string;

  const {
    loading: detailLoading,
    error: detailError,
    data: detailData,
  } = useQuery(GET_WORK_PROGRAM_BY_SLUG, {
    variables: { slug },
  });

  const {
    loading: listLoading,
    error: listError,
    data: listData,
  } = useQuery(LIST_WORK_PROGRAMS);

  const isLoading = detailLoading || listLoading;
  const proker = detailData?.getWorkProgramBySlug;

  const otherProkers = listData?.listWorkPrograms?.workPrograms.filter(
    (p: { slug: string }) => p.slug !== slug
  );

  if (isLoading) {
    return <ProkerDetailSkeleton />;
  }
  if (detailError || listError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        Error: {detailError?.message || listError?.message}
      </div>
    );
  }
  if (!proker) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        Program Kerja tidak ditemukan.
      </div>
    );
  }

  const mainImageUrl =
    proker.imageUrls && proker.imageUrls.length > 0
      ? `${IMAGE_BASE_URL}${proker.imageUrls[0]}`
      : null;

  // Animation variants for Mori
  const moriAnimationVariants = {
    animate: {
      y: [0, -40, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const backgroundAnimationVariants = {
    animate: {
      y: [0, -40, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <main className="w-full min-h-screen bg-gradient-to-r from-white via-white to-[#E3F1FF]">
      <div className="relative">
        <motion.div 
          className="absolute mt-20 top-0 left-0 w-full h-[85vh] md:h-[55vh] z-0"
          variants={backgroundAnimationVariants}
          animate="animate"
        >
          <Image
            src={SubpageBg}
            alt="Background Pattern"
            fill
            className="object-cover opacity-60"
          />
        </motion.div>

        <div className="relative mt-32 z-10">
          <header className="pt-24 pb-16 md:pt-32 md:pb-24 container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-center items-center text-center sm:text-left gap-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-[#0033A1] leading-tight">
              {proker.title}
            </h1>
          </header>

          {/* Main Content Grid (Desktop) */}
          <div className="mx-auto px-4 sm:px-6 lg:px-8 pb-24">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-12 xl:gap-x-16 gap-y-12 items-start">
       
              {/* --- GAMBAR UTAMA (KIRI ATAS) --- */}
              <div className="lg:col-span-2 container mt-16 md:mt-24 lg:mt-32">
                <ProkerSubPageImage imageUrl={mainImageUrl} />
              </div>

              {/* --- MASKOT (KANAN ATAS) --- */}
              <div className="hidden lg:flex flex-col gap-8 items-center mt-62">
                <div className="relative w-full h-96">
                  <div className="absolute inset-0 z-10">
                    <Image
                      src={MoriCard}
                      alt="Mori Container"
                      fill
                      className="object-contain drop-shadow-xl"
                    />
                  </div>
                  <div className="absolute inset-0 z-20 flex items-center justify-center">
                    <motion.div 
                      className="relative -mt-50"
                      variants={moriAnimationVariants}
                      animate="animate"
                    >
                      <Image
                        src={Mori}
                        alt="Mori Mascot"
                        width={470}
                        height={340}
                        className="object-contain "
                      />
                    </motion.div>
                    <div className="absolute flex items-center rounded-2xl justify-center mt-46 ">
                      <div className="p-10 w-[25vw] h-[7vw] rounded-xl  bg-gradient-to-bl from-[#FF763F] to-[#FF4900]   text-white font-bold">
                      </div>
                    </div>

                  {/* Bubble "Program Kerja Menarik" (Bubble1) */}
                  <div className="absolute z-30 bottom-20 -left-12 w-[420px] pointer-events-none">
                    <Image
                      src={Bubble1}
                      alt="Program Kerja Menarik"
                      className="object-contain drop-shadow-md"
                    />
                  </div>

                  <div className="absolute z-30 bottom-3 right-5 w-[280px] pointer-events-none">
                    <Image
                      src={Bubble3}
                      alt="Waktunya Menjelajah"
                      className="object-contain drop-shadow-md"
                    />
                  </div>

                  {/* Bubble "Sudah Banyak..." (Bubble2) */}
                  <div className="absolute z-30 bottom-16 right-0 w-[300px] pointer-events-none">
                    <Image
                      src={Bubble2}
                      alt="Sudah banyak yang bergabung"
                      className="object-contain drop-shadow-md"
                    />
                  </div>

                  </div>
                </div>
              </div>

              {/* --- DESKRIPSI (KIRI BAWAH) --- */}
              <div className="lg:col-span-2 prose lg:prose-xl max-w-none text-gray-800 backdrop-blur-md p-8 md:p-12 rounded-3xl  border border-white/50">
                <div
                  className="text-lg leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: proker.content || "Tidak ada deskripsi.",
                  }}
                />
              </div>

              {/* --- DAFTAR PROKER LAIN (KANAN BAWAH - DESKTOP) --- */}
              <div className="hidden lg:flex flex-col gap-6 w-full max-w-sm mx-auto max-h-[32rem] overflow-y-auto no-scrollbar p-4">
                {otherProkers &&
                  otherProkers.map((otherProker: { 
                    slug: string; 
                    name: string; 
                    title: string;
                    description: string; 
                    ministry: { name: string }; 
                    ministryName: string;
                    imageUrls: string[];
                    isMegaBesar: boolean;
                  }) => (
                    <Link
                      href={`/proker/${otherProker.slug}`}
                      key={otherProker.slug}
                      className="transform transition-all duration-300"
                    >
                      <ProkerSideCard
                        title={otherProker.title}
                        type={
                          otherProker.isMegaBesar
                            ? "Mega Besar"
                            : "Open Recruitment"
                        }
                        department={otherProker.ministryName}
                      />
                    </Link>
                  ))}
              </div>
            </div>
          </div>

          {/* Mobile Section - Mori Mascot */}
          <div className="lg:hidden px-4 sm:px-6 pb-12 ">
            <div className="flex justify-center">
              <div className="relative w-full max-w-md h-96">
                <div className="absolute inset-0 z-10">
                  <Image
                    src={MoriCard}
                    alt="Mori Container"
                    width={400}
                    height={300}
                    className="object-contain drop-shadow-xl w-full h-auto"
                  />
                </div>
                <div className="relative z-20 flex items-center justify-center pt-8">
                  <motion.div 
                    className="relative -mt-12"
                    variants={moriAnimationVariants}
                    animate="animate"
                  >
                    <Image
                      src={Mori}
                      alt="Mori Mascot"
                      width={300}
                      height={220}
                      className="object-contain drop-shadow-lg"
                    />
                  </motion.div>
                  
                  {/* Div untuk nutupin kaki Mori */}
                  <div className="absolute flex items-center rounded-2xl justify-center mt-32">
                    <div className="p-4 mt-2 w-96 h-20 rounded-xl bg-gradient-to-bl from-[#FF763F] to-[#FF4900] text-white font-bold">
                    </div>
                  </div>

                  {/* Bubble "Program Kerja Menarik" (Bubble1) */}
                  <div className="absolute z-30 bottom-16 -left-2 w-[200px] pointer-events-none">
                    <Image
                      src={Bubble1}
                      alt="Program Kerja Menarik"
                      className="object-contain drop-shadow-md"
                    />
                  </div>

                  {/* Bubble "Waktunya Menjelajah" (Bubble3) */}
                  <div className="absolute z-30 bottom-2 right-2 w-[200px] pointer-events-none">
                    <Image
                      src={Bubble3}
                      alt="Waktunya Menjelajah"
                      className="object-contain drop-shadow-md"
                    />
                  </div>

                
                  <div className="absolute z-30 bottom-12 right-0 w-[200px] pointer-events-none">
                    <Image
                      src={Bubble2}
                      alt="Sudah banyak yang bergabung"
                      className="object-contain drop-shadow-md"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Section - Proker Lainnya */}
          <div className="lg:hidden px-4 sm:px-6 pb-24">
            <div className="">
             
              
              <div className="space-y-4">
                {otherProkers && otherProkers.slice(0, 4).map((otherProker: { 
                  slug: string; 
                  name: string; 
                  title: string;
                  description: string; 
                  ministry: { name: string }; 
                  ministryName: string;
                  imageUrls: string[];
                  isMegaBesar: boolean;
                }) => (
                  <Link
                    href={`/proker/${otherProker.slug}`}
                    key={otherProker.slug}
                    className="block transform transition-all duration-300"
                  >
                    <ProkerSideCard
                      title={otherProker.title}
                      type={
                        otherProker.isMegaBesar
                          ? "Mega Besar"
                          : "Open Recruitment"
                      }
                      department={otherProker.ministryName}
                    />
                  </Link>
                ))}
              </div>

          
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProkerDetailPage;