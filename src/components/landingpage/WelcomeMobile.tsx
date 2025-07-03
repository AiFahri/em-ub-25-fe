'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import MoriExpressionList from './MoriExpressionList';

import gemay from '@/assets/landingpage/icons/gemay.svg';
import bubblechat from '@/assets/landingpage/background/bubblechat.svg';
import ellipseorange from '@/assets/landingpage/icons/ellipse-orange.svg';
import line from '@/assets/landingpage/icons/Line.svg';
import calendarIcon from '@/assets/landingpage/icons/calendar.svg';
import s from '@/assets/landingpage/icons/s.svg';
import MoriFrameMobile from './MoriFrameMobile';
import ciclelightblue from '@/assets/landingpage/icons/eclipselightblue.svg';
import oneshape from '@/assets/landingpage/icons/1shape.svg';
import ArrowUpRight from '@/assets/landingpage/icons/arrow-up-right.svg';
import whitelogo from '../../../public/Assets/logo/whitelogo.svg';

export default function WelcomeMobile() {
  const [expression, setExpression] = useState<'gembira' | 'semangat' | 'bangga' | 'cemberut'>('cemberut');

  return (
    <section className="w-full flex justify-center px-4 sm:px-8 pt-6 pb-10">
      <div className="max-w-[600px] sm:max-w-[700px]">
        {/* Heading */}
        <div className="text-start mb-4">
          <h2 className="text-3xl sm:text-4xl text-black font-medium">Selamat Datang,</h2>
          <h2 className="text-5xl sm:text-6xl font-bold text-[#0049FF]">Sobat Mori!</h2>
        </div>

        <div className="w-full flex justify-center mb-2">
          <div className="relative w-full aspect-square">
            <div className="absolute top-[15%] right-0 w-[65%] z-20">
              <div className="inline-flex relative items-center px-5 sm:px-10 py-2 sm:py-3">
                <Image src={bubblechat} alt="chat" fill className="object-contain" />
                <span className="relative z-10 text-white text-[clamp(2.5vw,4vw,2rem)] font-semibold text-center">Halo, aku adalah Mori!</span>
              </div>
            </div>
            <div className="absolute top-[-10%] right-[0%] md:top-[-12%] md:right-[-13%] z-10">
              <div className="bg-[#FF4900] flex items-center justify-center rounded-full w-20 h-20 sm:w-[120px] sm:h-[120px] p-2 md:p-4">
                <Image src={ArrowUpRight} alt="arrow" className="w-[50%]" />
              </div>
            </div>

            <MoriFrameMobile expression={expression} />

            <Image src={gemay} alt="dekor" className="absolute top-[10%] left-[5%] w-[25%] z-10" />

            <Image src={ciclelightblue} alt="dekor" className="absolute bottom-[25%] right-[5%] w-[13%] sm:w-[13%] z-10" />

            <Image src={oneshape} alt="dekor" className="absolute top-[48%] right-2 w-[6%] sm:w-[7%] z-10" />
          </div>
        </div>

        <div className="w-full flex flex-col items-center mb-2">
          <h3 className="bg-[#FF4900] text-white text-2xl font-semibold px-4 py-2 rounded-full mb-4">Ekspresi Mori</h3>
          <MoriExpressionList current={expression} onSelect={setExpression} />
        </div>

        <div className="relative w-full mb-20">
          <div className="inverted-radius-descmori min-h-[300px] px-6 pt-6 pb-10 sm:pb-12">
            <div className="text-[#002787] text-lg sm:text-xl px-6 leading-relaxed font-[NeueHaasDisplay] text-end">
              <p>Mori adalah teman kecilmu yang siap memandu petualangan seru di dunia EM UB 2025. Mau mencari info kegiatan? Dokumentasi kece? Atau sekadar kepo sama EM UB? </p>
              <p className="mt-4 pl-[3rem]">Tenang saja, Mori siap nemenin kamu keliling. Ayo klik-klik bareng Mori, ya. Jangan takut nyasar, soalnya Mori hafal semua jalan di sini!</p>
            </div>
          </div>

          <div className="absolute bottom-0 left-2 w-[80px] h-[80px] bg-[#0049FF] rounded-full flex items-center justify-center shadow-md z-30">
            <Image src={whitelogo} alt="Logo EM UB (Bottom Left)" width={60} height={60} />
          </div>
        </div>

        <div className="relative w-full flex px-2 sm:px-4">
          <div className="relative w-full max-w-[300px] sm:minw-[350px] sm:max-w-[400px] border-4 border-[#0538B9] rounded-full py-6 px-4 sm:px-6 flex items-center gap-4 bg-white">
            <div className="shrink-0">
              <Image src={calendarIcon} alt="calendar" className="w-10 h-10  sm:w-13 sm:h-13" />
            </div>

            <div className="flex flex-col justify-center">
              <p className="text-[32px] sm:text-[48px] font-bold text-[#0538B9] leading-none">2025</p>
              <p className="text-[#0538B9] text-[14px] sm:text-[24px] leading-tight font-semibold">
                Kabinet <span className="font-bold">Simpul Memori</span>
              </p>
            </div>

            <div className="absolute -top-[60px] left-[70px] sm:left-[100px] w-[100px] sm:w-[120px] z-20">
              <Image src={s} alt="s" />
            </div>
            <div className="absolute top-[-17px] sm:top-[-20px] right-[10px] sm:right-[40px] w-[100px] sm:w-[120px] z-20">
              <Image src={line} alt="line" />
            </div>
            <div className="absolute top-5 right-[-90px] sm:right-[-110px] w-[80px] sm:w-[100px] z-20">
              <Image src={ellipseorange} alt="ellipseorange" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
