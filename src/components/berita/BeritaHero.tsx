'use client';

import BgGrid from "../comingsoon/background/BgGrid";


const HeroSection = () => {
  return (
    <section className="relative w-full h-[300px] md:h-[400px] flex items-center justify-center  overflow-hidden"  style={{
            background: 'radial-gradient(ellipse at 40% 30%, #D6E2FF 0%, #f5fafe 50%, #ffffff 90%)'
          }}>
      {/* Grid pattern background */}
      <div className="absolute  inset-0 z-0 pointer-events-none w-full">
      <BgGrid classNameVertical="object-cover translate-x-[-25%] " classNameHorizontal="object-cover -translate-y-[40%] " speedVertical={1} speedHorizontal={1} />
            
      </div>

      {/* Text content */}
      <div className="relative z-10 text-center">
        <h1 className="text-4xl md:text-7xl font_bold text-[#0538B9] mb-2">
          Portal Berita
        </h1>
        <p className="text-2xl md:text-4xl font-semibold text-black">
          Eksekutif Mahasiswa Universitas Brawijaya
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
