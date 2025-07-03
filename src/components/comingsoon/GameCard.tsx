// components/GameCard.tsx
'use client';
import { motion } from 'framer-motion';
import Image, { StaticImageData } from 'next/image';

type GameCardProps = {
  src: StaticImageData;
  alt: string;
  onClick: () => void;
  className?: string;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
};

export default function GameCard({ src, alt, onClick, className = '', onHoverStart, onHoverEnd }: GameCardProps) {
  return (
    <motion.div
      whileHover={{
        y: -20,
        scale: 1.1,
        // boxShadow: '0 0 40px rgba(255, 255, 255, 0.4)',
        transition: { type: 'spring', stiffness: 300, damping: 12 },
      }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      className={`${className} cursor-pointer rounded-[80px]`}
    >
      <Image src={src} alt={alt} className=" md:w-[100%] " />
    </motion.div>
  );
}
