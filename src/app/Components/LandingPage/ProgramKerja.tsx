'use client';

import Image from 'next/image';
import ProgramKerjaCard from './ProgramKerjaCard';
import { programList } from '../../data/programKerjaData';
import face from '../../assets/icons/maskot-face.svg';
import circleBlue from '../../assets/icons/circle-blue.svg';
import circleQuarter from '../../assets/icons/circle-quarter-blue.svg';
import k from '../../assets/icons/k-outline.svg';

export default function ProgramKerja() {
  return (
    <section className="py-20 px-6 lg:px-16 font-sans">
      <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8 mb-32 font-[NeueHaasDisplay]">
        <div className="relative w-[480px] h-[300px] flex-shrink-0">
          <Image src={k} alt="shape" width={165} height={165} className="absolute top-20 left-5" />

          <Image src={circleBlue} alt="circle blue" width={240} height={240} className="absolute top-0 right-10" />

          <Image src={face} alt="maskot" width={170} height={170} className="absolute top-32 right-5 z-10" />

          <Image src={circleQuarter} alt="half circle" width={140} height={140} className="absolute -bottom-20 right-36" />

          <button className="absolute -bottom-10 left-14 text-[19px] bg-[#FF4900] text-white px-7 py-4 rounded-4xl font-semibold font-[poppins] hover:brightness-110 transition z-20">Lihat Selengkapnya</button>
        </div>

        <div className="flex-1 text-center lg:text-left">
          <h2 className="text-4xl lg:text-7xl font-black leading-tight">
            <span className="text-[#0538B9]">Program kerja mega besar,</span>

            <span className="text-[#BACEFF]"> dari kami untuk mahasiswa Brawijaya.</span>
          </h2>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-10 mb-16 text-center font-[NeueHaasDisplay]">
        <div>
          <h3 className="text-[#FF4900] text-[140px] font-bold leading-none">06+</h3>
          <p className="text-black text-4xl font-medium">Program Kerja</p>
        </div>
        <div>
          <h3 className="text-[#FF4900] text-[140px] font-bold leading-none">05+</h3>
          <p className="text-black text-4xl font-medium">Kementerian</p>
        </div>
        <div>
          <h3 className="text-[#FF4900] text-[140px] font-bold leading-none">10rb+</h3>
          <p className="text-black text-4xl font-medium">Mahasiswa Terlibat</p>
        </div>
      </div>

      <div className="flex gap-4 flex-wrap justify-center">
        {programList.map((program, i) => (
          <ProgramKerjaCard key={i} {...program} />
        ))}
      </div>
    </section>
  );
}
