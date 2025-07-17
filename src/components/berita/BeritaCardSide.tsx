import BgBlue from '@/assets/proker/prokercard-bg-blue.svg';
import BgOrange from '@/assets/proker/prokercard-bg.svg';
import Image from 'next/image';

type BeritaCardSideProps = {
  title: string;
  category?: string;
  ministryName?: string;
  color: 'orange' | 'blue';
};

const BeritaCardSide = ({ title, category, ministryName, color }: BeritaCardSideProps) => {
  const bgColor = color === 'blue' ? 'bg-[#003EA7]' : 'bg-[#FF4500]';
  const backgroundImage = color === 'blue' ? BgBlue : BgOrange;
  
  return (
    <div className={`relative ${bgColor} rounded-3xl p-6 text-white w-full overflow-hidden shadow-md`}>
      
      {/* Background Image */}
      <div className="absolute inset-0 rounded-3xl overflow-hidden">
        <Image 
          src={backgroundImage}
          alt={`${color} background`}
          fill
          className="object-cover"
          priority
        />
      </div>
      
      
      <div className="relative z-10">
        <div className="flex justify-end mb-2">
          {category && (
            <span className="sm:text-[1vw] text-[4vw] font-semibold bg-white/20 px-3 py-1 rounded-full">
              {category}
            </span>
          )}
        </div>
        <h4 className="font-bold sm:text-[2vw] text-[5vw] leading-tight mb-3  overflow-hidden">
          {title}
        </h4>
        {ministryName && (
          <span className="sm:text-[1vw] text-[5vw] w-[40vw] font-medium bg-white text-blue-900 text-wrap inline-block px-2  w-fit rounded-lg">
            {ministryName}
          </span>
        )}
      </div>
    </div>
  );
};

export default BeritaCardSide;