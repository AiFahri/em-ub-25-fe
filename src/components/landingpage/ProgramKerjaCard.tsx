import Image from 'next/image';
import Link from 'next/link';
import { ProgramKerja } from '@/types/programKerja';

export default function ProgramKerjaCard({ title, description, kementerian, bgColor, imageSrc }: ProgramKerja) {
  return (
    <div className={`group relative overflow-hidden rounded-3xl p-6 text-white flex flex-col justify-between transition-all duration-500 ease-in-out ${bgColor} w-[250px] hover:w-[400px] h-[600px]`}>
      <span className="text-xs bg-white text-[#0538B9] px-4 py-1 rounded-full w-fit font-bold mb-2">{kementerian}</span>

      <Image src={imageSrc} alt="program visual" width={200} height={200} className="absolute top-4 right-4 opacity-30 transition-all duration-300" />

      <div className="mt-auto z-10">
        <h4 className="text-xl font-bold">{title}</h4>
        <p className="text-sm text-white/90 mt-1">{description}</p>

        <Link href="#" className="mt-4 w-full inline-flex items-center justify-between text-sm text-[#0538B9] bg-white hover:bg-white/20 px-4 py-2 rounded-full transition duration-300">
          Selengkapnya
          <span className="text-white group-hover:translate-x-1 transition-transform duration-300">→</span>
        </Link>
      </div>
    </div>
  );
}
