'use client';
import Image from 'next/image';
import bgberita1 from '../../assets/background/landingpage/bg-berita-1.svg';
import bgberita2 from '../../assets/background/landingpage/bg-berita-2.svg';
import bgberita3 from '../../assets/background/landingpage/bg-berita-3.svg';
import bgberitagroup from '../../assets/background/landingpage/bg-berita-group.svg';

import BeritaCard from '../../Components/LandingPage/BeritaCard';
import { beritaData } from '../../data/beritaData';

export default function Berita() {
  return (
    <section className="bg-white py-16 font-sans">
      <h2 className="text-4xl md:text-[110px] font-bold text-blue-800 mb-2 text-center">What's up right now?</h2>

      <div className="relative w-full overflow-hidden ">
        <div className="overflow-x-auto hide-scrollbar py-16">
          <div className="flex gap-6 w-full px-20">
            {beritaData.map((news, index) => (
              <div key={news.id} className="min-w-[320px] md:min-w-[400px] lg:min-w-[470px]">
                <BeritaCard {...news} index={index} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
