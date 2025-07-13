'use client';

import { NewsItem } from '@/types/berita';
import Image from 'next/image';
import ArrowUpRight from '@/assets/landingpage/icons/arrow-up-right.svg';
import { motion } from 'framer-motion';

type BeritaCardProps = NewsItem & { index: number };

const cardVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.04 },
};

const imageVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.04 },
};

const arrowVariants = {
  initial: { x: 0, scale: 1, rotate: 0 },
  hover: { x: 6, scale: 1.1, rotate: 20 },
};

export default function BeritaCard({ title, date, description, imageUrl, index }: BeritaCardProps) {
  const isOrange = index % 2 === 0;
  const showPlaceholder = !imageUrl?.trim();

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      whileHover="hover"
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="rounded-2xl p-4 w-full sm:w-[250px] lg:w-[300px] xl:w-[440px] mx-auto h-full space-y-3 relative cursor-pointer"
      style={{ transformOrigin: 'center center' }}
    >
      <div className="relative">
        <motion.div variants={imageVariants} transition={{ duration: 0.4, ease: 'easeOut' }} className="w-full h-[200px] lg:h-[320px] rounded-4xl relative overflow-hidden inverted-radius">
          {showPlaceholder ? (
            <div className="flex items-center justify-center w-full h-full bg-gray-100">
              <Image src="/Assets/icon/landingpage/placeholder.svg" alt={title} width={48} height={48} />
            </div>
          ) : (
            <Image src={`https://is3.cloudhost.id/em-ub-2025/${imageUrl.replace(/^\/+/, '')}`} alt={title} fill className="object-cover transition-all" />
          )}
        </motion.div>

        <motion.div variants={arrowVariants} transition={{ type: 'spring', stiffness: 200, damping: 10 }} className={`absolute bottom-0 right-2 p-4 lg:p-6 rounded-full z-20 ${isOrange ? 'bg-[#FF4900]' : 'bg-[#0049FF]'}`}>
          <Image src={ArrowUpRight} alt="arrow" className="w-[22px] md:w-[20px]" />
        </motion.div>
      </div>

      <div className="font-[NeueHaasDisplay]">
        <h3 className="text-[#002787] font-medium text-[clamp(2.8vw,3.8vw,40px)] truncate">{title}</h3>
        <p className="text-[clamp(1.5vw,2.8vw,20px)] font-medium text-[#001B5E]">{date}</p>
        <p className="text-[clamp(1.3vw,2.8vw,15px)] mt-2 font-medium text-[#001B5E] truncate">{description}</p>
      </div>
    </motion.div>
  );
}
