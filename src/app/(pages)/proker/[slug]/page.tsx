// src/app/(pages)/proker/[slug]/page.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useQuery } from '@apollo/client';
import { motion } from 'framer-motion';
import Modal from '@/components/pendaftaran/Modal';
import { easeInOut } from 'framer-motion';

import Mori from '@/assets/proker/mori-full.svg';
import MoriCard from '@/assets/proker/mori-card-subpage.svg';
import SubpageBg from '@/assets/proker/subpage-bg.svg';

import ProkerDetailSkeleton from '@/components/proker/ProkerDetailSkeleton';
import Bubble1 from '@/assets/proker/proker-subpage-bubble1.svg';
import Bubble2 from '@/assets/proker/proker-subpage-bubble2.svg';
import Bubble3 from '@/assets/proker/proker-subpage-bubble3.svg';
import instagram from '@/assets/proker/Instagram.svg';

import { GET_WORK_PROGRAM_BY_SLUG, LIST_WORK_PROGRAMS } from '@/graphql/queries/proker/prokerQueries';
import ProkerSideCard from '@/components/proker/ProkerSideCard';
import SubmittedModal from '@/components/pendaftaran/SubmittedModal';

import ProkerSubPageImage from '@/components/proker/ProkerSubPageImage';

const IMAGE_BASE_URL = 'https://is3.cloudhost.id/emub/';

interface WorkProgram {
  id: string;
  title: string;
  slug: string;
  content: string;
  imageUrls?: string[];
  isMegaBesar: boolean;
  instagramUrl: string;
  isGeneral: boolean;
  registerLink: string;
  form?: {
    myResponse?: {
      fillStatus?: string;
    };
    groupLink?: string;
  };
  ministryName: string;
}

const ProkerDetailPage = () => {
  const params = useParams();
  const slug = params.slug;
  const [isMobile, setIsMobile] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalMode, setModalMode] = React.useState<'confirm' | 'success' | null>(null);
  const [groupLink, setGroupLink] = React.useState('');

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const {
    loading: detailLoading,
    error: detailError,
    data: detailData,
  } = useQuery(GET_WORK_PROGRAM_BY_SLUG, {
    variables: { slug },
    context: {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    },
  });

  const {
    loading: listLoading,
    error: listError,
    data: listData,
  } = useQuery(LIST_WORK_PROGRAMS, {
    variables: {
      input: {
        keyword: '',
        orderBy: 'ID_DESC',
      },
    },
  });

  const isLoading = detailLoading || listLoading;
  const proker = detailData?.getWorkProgramBySlug;

  const otherProkers = listData?.listWorkPrograms?.workPrograms.filter((p: WorkProgram) => p.slug !== slug);
  const isGeneral = proker?.isGeneral;

  if (isLoading) {
    return <ProkerDetailSkeleton />;
  }
  if (detailError || listError) {
    return <div className="min-h-screen flex items-center justify-center bg-red-50">Error: {detailError?.message || listError?.message}</div>;
  }
  if (!proker) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-100">Program Kerja tidak ditemukan.</div>;
  }

  const mainImageUrl = proker.imageUrls?.map((url: string) => `${IMAGE_BASE_URL}${url}`) || null;
  const instagramUrl = proker.instagramUrl;
  const moriAnimationVariants = {
    animate: {
      y: [0, -40, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: easeInOut,
      },
    },
  };

  const backgroundAnimationVariants = {
    animate: {
      y: [0, -80, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: easeInOut,
      },
    },
  };

  return (
    <main className="w-full min-h-screen bg-gradient-to-r from-white via-white to-[#E3F1FF]">
      <div className="relative">
        <motion.div
          className="absolute z-0"
          style={{
            marginTop: 'clamp(5rem, 8vw, 8rem)',
            top: 0,
            left: 0,
            width: '100%',
            height: 'clamp(20vh, 85vh, 55vh)',
          }}
          variants={backgroundAnimationVariants}
          animate="animate"
        >
          <Image src={SubpageBg} alt="Background Pattern" fill className="object-cover opacity-60" />
        </motion.div>

        <div className="relative z-10">
          <header
            className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-center items-center text-center sm:text-left gap-8"
            style={{
              paddingTop: 'clamp(6rem, 8vw, 8rem)',
              paddingBottom: 'clamp(2rem, 4vw, 3rem)',
            }}
          >
            <h1
              className="font-black text-[#0033A1] leading-tight mt-[2vw]"
              style={{
                fontSize: 'clamp(2.5rem, 7vw, 4rem)',
              }}
            >
              {proker.title}
            </h1>
          </header>

          <div className="mx-auto px-4 sm:px-6 lg:px-8 pb-24">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-12 xl:gap-x-16 items-start relative">
              <div
                className="lg:col-span-2 container"
                style={{
                  marginTop: 'clamp(1rem, 4vw, 2rem)',
                }}
              >
                <ProkerSubPageImage imageUrl={mainImageUrl} instagramUrl={instagramUrl} />
              </div>

              <div
                className="hidden lg:flex flex-col gap-8 items-center"
                style={{
                  marginTop: 'clamp(8rem, 10vw, 9rem)',
                }}
              >
                <div
                  className="relative w-full"
                  style={{
                    height: 'clamp(24rem, 30vw, 30rem)',
                  }}
                >
                  <div className="absolute inset-0 z-10">
                    <Image src={MoriCard} alt="Mori Container" fill className="object-contain drop-shadow-xl" />
                  </div>
                  <div className="absolute inset-0 z-20 flex items-center justify-center">
                    <motion.div
                      className="relative"
                      style={{
                        marginTop: 'clamp(-12rem, -15vw, -15rem)',
                      }}
                      variants={moriAnimationVariants}
                      animate="animate"
                    >
                      <Image
                        src={Mori}
                        alt="Mori Mascot"
                        width={470}
                        height={340}
                        className="object-contain"
                        style={{
                          width: 'clamp(20rem, 25vw, 30rem)',
                          height: 'auto',
                        }}
                      />
                    </motion.div>
                    <div
                      className="absolute inset-x-0 flex items-center justify-center"
                      style={{
                        bottom: '8vw',
                      }}
                    >
                      <div
                        className="rounded-lg bg-gradient-to-bl from-[#FF763F] to-[#FF4900] text-white font-bold"
                        style={{
                          width: 'clamp(15rem, 5vw, 20rem)',
                          height: 'clamp(5rem, 0.2vw, 2rem)',
                        }}
                      ></div>
                    </div>

                    <motion.div
                      className="absolute z-30 pointer-events-none"
                      style={{
                        bottom: '30%',
                        left: '-15%',
                        width: 'clamp(9rem, 14vw, 21rem)',
                      }}
                      initial={{ x: '100%', opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{
                        delay: isMobile ? 0.8 : 2,
                        duration: isMobile ? 0.6 : 1,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <Image src={Bubble1} alt="Proker apanih braw" className="object-contain drop-shadow-md w-full h-auto" />
                    </motion.div>
                    <motion.div
                      className="absolute z-30 pointer-events-none"
                      style={{
                        bottom: '15%',
                        right: '0%',
                        width: 'clamp(8rem, 14vw, 20rem)',
                      }}
                      initial={{ x: '100%', opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{
                        delay: isMobile ? 1.2 : 3,
                        duration: isMobile ? 0.6 : 1,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <Image src={Bubble3} alt="Klik di bawah braw" className="object-contain drop-shadow-md w-full h-auto" />
                    </motion.div>
                    <motion.div
                      className="absolute z-30 pointer-events-none"
                      style={{
                        bottom: '25%',
                        right: '0%',
                        width: 'clamp(8rem, 14vw, 20rem)',
                      }}
                      initial={{ x: '100%', opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{
                        delay: isMobile ? 0.4 : 1,
                        duration: isMobile ? 0.6 : 1,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <Image src={Bubble2} alt="Kepoin yang lain" className="object-contain drop-shadow-md w-full h-auto" />
                    </motion.div>
                  </div>
                </div>
              </div>

              <div
                className="lg:col-span-2 prose lg:prose-xl max-w-none text-gray-800 backdrop-blur-md rounded-3xl border border-white/50"
                style={{
                  padding: 'clamp(2rem, 4vw, 3rem)',
                  fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
                  lineHeight: 'clamp(1.5, 2vw, 1.75)',
                }}
              >
                <div
                  className="leading-relaxed text-justify"
                  dangerouslySetInnerHTML={{
                    __html: proker.content || 'Tidak ada deskripsi.',
                  }}
                />
                {typeof proker?.hasForm === 'boolean' && proker.hasForm && (
                  <div className="mt-8 flex justify-center">
                    <button
                      onClick={() => {
                        console.log('[DEBUG] Full proker.form:', proker?.form);
                        console.log('[DEBUG] myResponse:', proker?.form?.myResponse);
                        console.log('[DEBUG] fillStatus:', proker?.form?.myResponse?.fillStatus);
                        console.log('[DEBUG] groupLink:', proker?.form?.groupLink);

                        const isSubmitted = proker?.form?.myResponse?.fillStatus === 'submitted';

                        if (isSubmitted) {
                          const groupLink = proker?.form?.groupLink ?? '';
                          setGroupLink(groupLink);
                          setModalMode('success');
                        } else {
                          setIsModalOpen(true);
                        }
                      }}
                      className="inline-block px-10 py-1 bg-[#FF4900] text-white rounded-3xl font-semibold hover:bg-[#0038c1] transition-colors duration-200"
                    >
                      Daftar
                    </button>
                  </div>
                )}
              </div>

              <div
                className="hidden lg:flex flex-col gap-6 w-full max-w-sm mx-auto no-scrollbar p-4"
                style={{
                  maxHeight: 'clamp(25rem, 32rem, 40rem)',
                  overflowY: 'auto',
                }}
              >
                {otherProkers &&
                  otherProkers.map((otherProker: WorkProgram) => (
                    <Link href={`/proker/${otherProker.slug}`} key={otherProker.slug} className="transform transition-all duration-300">
                      <ProkerSideCard title={otherProker.title} type={otherProker.isMegaBesar ? 'Mega Besar' : 'Open Recruitment'} department={otherProker.ministryName} />
                    </Link>
                  ))}
              </div>
            </div>
          </div>

          <div className="lg:hidden px-4 sm:px-6 pb-12">
            <div className="flex justify-center">
              <div
                className="relative w-full max-w-md"
                style={{
                  height: 'clamp(20rem, 35vw, 25rem)',
                }}
              >
                <div className="absolute inset-0 z-10">
                  <Image src={MoriCard} alt="Mori Container" width={400} height={300} className="object-contain drop-shadow-xl w-full h-auto" />
                </div>
                <div
                  className="relative z-20 flex items-center justify-center"
                  style={{
                    paddingTop: 'clamp(2rem, 6vw, 3rem)',
                  }}
                >
                  <motion.div
                    className="relative"
                    style={{
                      marginTop: 'clamp(-3rem, -8vw, -4rem)',
                    }}
                    variants={moriAnimationVariants}
                    animate="animate"
                  >
                    <Image
                      src={Mori}
                      alt="Mori Mascot"
                      width={300}
                      height={220}
                      className="object-contain drop-shadow-lg"
                      style={{
                        width: 'clamp(15rem, 25vw, 20rem)',
                        height: 'auto',
                      }}
                    />
                  </motion.div>

                  <div
                    className="lg:hidden absolute inset-x-0 flex items-center justify-center"
                    style={{
                      bottom: '1vw',
                    }}
                  >
                    <div
                      className="rounded-lg bg-gradient-to-bl from-[#FF763F] to-[#FF4900] text-white font-bold"
                      style={{
                        width: 'clamp(18rem, 5vw, 20rem)',
                        height: 'clamp(2rem, 0.2vw, 2rem)',
                      }}
                    ></div>
                  </div>

                  {/* Div untuk nutupin kaki Mori */}
                  {/* <div className="absolute inset-x-0 flex items-center justify-center"
                    style={{
                      bottom: '-25%'
                    }}
                  >
                    <div className="rounded-xl bg-gradient-to-bl from-[#FF763F] to-[#FF4900] text-white font-bold"
                      style={{
                        width: 'clamp(20rem, 10vw, 25rem)',
                        height: 'clamp(6rem, 20vw, 40rem)'
                      }}
                    >
                    </div>
                  </div> */}

                  <motion.div
                    className="absolute z-30 pointer-events-none"
                    style={{
                      bottom: 'clamp(-20rem, 15vw, -1rem)',
                      left: 'clamp(-0.5rem, -2vw, -1rem)',
                      width: 'clamp(6rem, 30vw, 12rem)',
                    }}
                    initial={{ x: '100%', opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                      delay: isMobile ? 0.8 : 2,
                      duration: isMobile ? 0.4 : 1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Image src={Bubble1} alt="Proker Apanih Braw" className="object-contain drop-shadow-md w-[80vw] h-auto" />
                  </motion.div>

                  <motion.div
                    className="absolute z-30 pointer-events-none"
                    style={{
                      bottom: 'clamp(-20rem, 15vw, -3rem)',
                      right: 0,
                      width: 'clamp(5rem, 25vw,8)',
                    }}
                    initial={{ x: '100%', opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                      delay: isMobile ? 1.2 : 3,
                      duration: isMobile ? 0.4 : 1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Image src={Bubble3} alt="Klik di Bawah Braw" className="object-contain drop-shadow-md translate-y-2 w-[28vw]" />
                  </motion.div>

                  <motion.div
                    className="absolute z-30 pointer-events-none"
                    style={{
                      bottom: 'clamp(-20rem, 15vw, -1rem)',
                      right: 0,
                      width: 'clamp(6rem, 28vw, 11rem)',
                    }}
                    initial={{ x: '100%', opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                      delay: isMobile ? 0.4 : 1,
                      duration: isMobile ? 0.4 : 1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Image src={Bubble2} alt=" Kepoin yang lain, Yuk!" className="object-contain drop-shadow-md w-[100vh] h-auto" />
                  </motion.div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:hidden px-4 sm:px-6 pb-24">
            <div className="space-y-4">
              {otherProkers &&
                otherProkers.slice(0, 4).map((otherProker: WorkProgram) => (
                  <Link href={`/proker/${otherProker.slug}`} key={otherProker.slug} className="block transform transition-all duration-300">
                    <ProkerSideCard title={otherProker.title} type={otherProker.isMegaBesar ? 'Mega Besar' : 'Open Recruitment'} department={otherProker.ministryName} />
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          setIsModalOpen(false);
          window.location.href = proker.registerLink;
        }}
        isGeneral={isGeneral}
      />
      {modalMode === 'success' && <SubmittedModal mode="success" onClose={() => setModalMode(null)} groupLink={groupLink} />}
    </main>
  );
};

export default ProkerDetailPage;
