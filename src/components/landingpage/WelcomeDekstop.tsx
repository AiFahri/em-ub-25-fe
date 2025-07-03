'use client';
import { useState } from 'react';
import Image from 'next/image';
import MoriFrame from './MoriFrame';
import MoriExpressionList from './MoriExpressionList';
import ArrowUpRight from '@/assets/landingpage/icons/arrow-up-right.svg';
import gemay from '@/assets/landingpage/icons/gemay.svg';
import gemay2 from '@/assets/landingpage/icons/gemay-2.svg';
import calendarIcon from '@/assets/landingpage/icons/calendar.svg';
import bubblechat from '@/assets/landingpage/background/bubblechat.svg';
import logo from '@/assets/logo/logoEM.svg';
import borderkalender from '@/assets/landingpage/background/border-kalender.svg';
import deskripsimori from '@/assets/landingpage/background/deskripsi-mori.svg';
import eclipse from '@/assets/landingpage/icons/welcome-eclipse.svg';
import decor from '@/assets/landingpage/icons/welcome-decor-1.svg';
import line from '@/assets/landingpage/icons/Line.svg';

export default function WelcomeDesktop() {
  const [expression, setExpression] = useState<'gembira' | 'semangat' | 'bangga' | 'cemberut'>('cemberut');

  return (
    <section className="relative w-full px-4 md:px-16 py-10 flex flex-col gap-14 items-center bg-white">
      <div
        className="absolute z-10 
  top-[-30px] left-1/2 -translate-x-1/2
  md:top-[-50px] md:left-[45%]"
      >
        <div className="bg-[#FF4900] flex items-center justify-center rounded-full w-[120px] h-[120px] md:w-[156px] md:h-[156px] p-4">
          <Image src={ArrowUpRight} alt="arrow" width={50} height={50} className="md:w-[60px] md:h-[60px]" />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-12 items-start w-full max-w-7xl relative">
        <div className="flex flex-col gap-6 relative items-center md:items-start w-full md:w-[45%]">
          <div className="relative">
            <MoriFrame expression={expression} />

            <div className="absolute top-20 left-64 z-10">
              <div className="relative w-[200px] md:w-[422px] h-[62px] flex items-center justify-center">
                <Image src={bubblechat} alt="Halo Bubble" fill className="object-contain" />
                <span className="absolute text-white text-sm md:text-[32px] font-semibold px-4 text-center">Halo, aku adalah Mori!</span>
              </div>
            </div>
            <Image src={gemay} alt="dekor" className="absolute top-14 left-16 w-10 h-10 z-20 md:w-[115px] md:h-[115px]" />
            <Image src={gemay2} alt="dekor" className="absolute bottom-24 -right-16 w-6 h-6 z-20 md:w-[100px] md:h-[103px]" />
          </div>

          <div className="relative mt-10 w-[420px] md:w-full md:h-[284px] h-[185px]">
            <Image src={borderkalender} alt="Border Kalender" fill className="object-contain" />

            <div className="w-full pl-24 flex items-center justify-between h-full font-[NeueHaasDisplay]">
              <div className="flex flex-col justify-center mt-5">
                <p className="text-[120px] font-bold text-[#0049FF] leading-none">2025</p>
                <div className="flex items-center -translate-y-3 gap-x-10">
                  <p className="text-[#0049FF] font-semibold text-[27px] leading-tight">
                    Kabinet <span className="font-bold">Simpul Memori</span>
                  </p>
                  <Image src={calendarIcon} alt="calendar" width={80} height={80} />
                </div>
              </div>
            </div>

            <div className="absolute w-[271px] h-[138px] md:-top-[46px] md:left-[440px] bg-[#0049FF] py-2 rounded-[100px] flex items-center gap-4 shadow-md z-10">
              <Image src={logo} alt="Logo" fill className="w-full h-full px-3" />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center md:items-end gap-6 w-full">
          <div className="w-full flex justify-end font-[NeueHaasDisplay]">
            <h2 className="text-black text-3xl md:text-[53px] font-bold">
              Selamat datang,
              <br />
              <span className="text-[#0538B9] text-5xl md:text-[110px]">Sobat Mori!</span>
            </h2>
          </div>

          <div className="flex flex-col items-end gap-4 w-full">
            <h3 className="bg-[#FF4900] text-white font-medium font-[NeueHaasDisplay] tracking-wider text-xl md:text-[44px] px-6 py-2 rounded-full">Ekspresi Mori</h3>
            <MoriExpressionList current={expression} onSelect={setExpression} />
          </div>

          <div className="relative md:w-[553px] md:h-[524px] -translate-y-[30px] rounded-[40px] z-10">
            <Image src={deskripsimori} alt="Background Deskripsi Mori" fill className="object-cover z-10" />

            <div className="relative z-20 px-20 py-12 text-[23px] text-right font-[NeueHaasDisplay] text-[#002787] leading-relaxed">
              <p>Mori adalah teman kecilmu yang siap memandu petualangan seru di dunia EM UB 2025. Mau mencari info kegiatan? Dokumentasi kece? Atau sekadar kepo sama EM UB?</p>
              <br />
              <p>Tenang saja, Mori siap nemenin kamu keliling. Ayo klik-klik bareng Mori, ya. Jangan takut nyasar, soalnya Mori hafal semua jalan di sini!</p>

              <Image src={eclipse} alt="Eclipse dekor" className="absolute bottom-[-40px] left-[-20px] w-[87px] h-[87px] z-20" />
              <Image src={line} alt="Line dekor" className="absolute bottom-[-100px] right-[100px] w-[137px] z-20" />
            </div>
          </div>

          <Image src={decor} alt="Decor" className="absolute bottom-[-70px] right-[300px] w-[122px] h-[128px] z-0" />
        </div>
      </div>
    </section>
  );
}
