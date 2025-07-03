import Image from 'next/image';
import Link from 'next/link';
import arrowRight from '@/assets/landingpage/icons/arrow-right.svg';

import circle from '@/assets/landingpage/icons/programkerjacard/circle.svg';
import halfcircle from '@/assets/landingpage/icons/programkerjacard/halfcircle.svg';
import donut from '@/assets/landingpage/icons/programkerjacard/donut.svg';
import star from '@/assets/landingpage/icons/programkerjacard/star.svg';
import zigzag from '@/assets/landingpage/icons/programkerjacard/zigzag.svg';
import threeshape from '@/assets/landingpage/icons/programkerjacard/3shape.svg';
import twhoshape from '@/assets/landingpage/icons/programkerjacard/2shape.svg';

interface Props {
  index: number;
  title: string;
  description: string;
  kementerian: string;
  bgColor: string;
}

function extractHexColor(twColor: string): string {
  const match = twColor.match(/\[#([0-9A-Fa-f]{6})\]/);
  return match ? `#${match[1]}` : '#0047AB';
}

export default function ProgramKerjaCard({ index, title, description, kementerian, bgColor }: Props) {
  const hexColor = extractHexColor(bgColor);

  const decorations = (() => {
    switch (index % 5) {
      case 0:
        return (
          <>
            <Image src={donut} alt="donut" className="absolute top-20 md:top-32 -right-20 w-38 md:w-44 lg:w-50" />
            <Image src={star} alt="star" className="absolute top-28 md:top-40 right-16 md:right-24 w-6 md:w-8 lg:w-10" />
          </>
        );
      case 1:
        return (
          <>
            <Image src={threeshape} alt="threeshape" className="absolute top-20 md:top-14 left-0 w-32 md:w-40 lg:w-48" />
          </>
        );
      case 2:
        return (
          <>
            <Image src={circle} alt="circle" className="absolute top-20 md:top-28 right-14 w-24 md:w-28 lg:w-32" />
            <Image src={halfcircle} alt="halfcircle" className="absolute top-40 md:top-52 -right-3 md:-right-5 w-24 md:w-28 lg:w-32" />
          </>
        );
      case 3:
        return (
          <>
            <Image src={zigzag} alt="zigzag" className="absolute top-20 md:top-28 -right-24 md:-right-28 w-56 md:w-64" />
          </>
        );
      case 4:
        return (
          <>
            <Image src={twhoshape} alt="twoshape" className="absolute top-16 md:top-20 right-0 w-24 md:w-28 lg:w-32" />
          </>
        );
      default:
        return null;
    }
  })();

  return (
    <div
      className={`group relative overflow-hidden rounded-4xl p-6 text-white flex flex-col justify-between transition-all duration-500 ease-in-out ${bgColor} w-[200px] hover:w-[260px] md:w-[250px] xl:w-[300px] md:hover:w-[400px] h-[300px] md:h-[500px]`}
    >
      <div className="absolute inset-0 z-0 pointer-events-none">{decorations}</div>

      <span className="text-xs md:text-md lg:text-lg bg-white text-[#0538B9] px-4 py-1 rounded-full w-fit font-bold mb-2" style={{ color: hexColor }}>
        {kementerian}
      </span>

      <div className="mt-auto z-10">
        <h4 className="text-xl md:text-2xl line-clamp-3 lg:text-3xl font-bold">{title}</h4>
        <p className="text-sm md:text-md lg:text-xl truncate text-white mt-1">{description}</p>

        <Link href="#" className="mt-4 block w-full">
          <div className="w-full flex justify-between items-center bg-white rounded-full px-6 py-2 group/button transition hover:brightness-110" style={{ color: hexColor }}>
            <span className="text-xs sm:text-sm md:text-lg font-semibold">Selengkapnya</span>
            <div className="w-5 h-5 md:w-8 md:h-8 rounded-full flex items-center justify-center transition-transform duration-300 group-hover/button:translate-x-1" style={{ backgroundColor: hexColor }}>
              <Image src={arrowRight} alt="arrow right" className="w-3 h-3" />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
