import Image from 'next/image';
import { motion } from 'framer-motion';
import bgframe from '@/assets/landingpage/background/bg-moriframe.svg';
import moriGembira from '@/assets/landingpage/icons/mori-gembira.svg';
import moriSemangat from '@/assets/landingpage/icons/mori-semangat.svg';
import moriBangga from '@/assets/landingpage/icons/mori-bangga.svg';

interface MoriFrameProps {
  expression: 'gembira' | 'semangat' | 'bangga';
}

const expressionImageMap = {
  gembira: moriGembira,
  semangat: moriSemangat,
  bangga: moriBangga,
};

export default function MoriFrame({ expression }: MoriFrameProps) {
  return (
    <div className="w-[40vw] h-[40vw] bg-cover rounded-[40px] overflow-hidden relative flex items-center justify-center" style={{ backgroundImage: `url(${bgframe.src})` }}>
      <motion.div
        className="absolute translate-y-[8vw] w-[40vw] h-[40vw]"
        initial={{ y: 0, scale: 1 }}
        animate={{
          y: ['0vw', '-3vw', '0vw'],
          scale: 1,
        }}
        transition={{
          y: {
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        }}
        whileHover={{
          scale: 1.2,
          transition: { type: 'spring', stiffness: 300, damping: 20 },
        }}
        whileTap={{
          scale: 1.1,
          transition: { type: 'spring', stiffness: 300, damping: 20 },
        }}
      >
        <Image src={expressionImageMap[expression]} alt={`Ekspresi Mori ${expression}`} fill className="object-contain" />
      </motion.div>
    </div>
  );
}
