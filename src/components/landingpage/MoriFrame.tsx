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

const frameVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7 }
  }
};

const moriVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, delay: 0.3 }
  }
};

export default function MoriFrame({ expression }: MoriFrameProps) {
  return (
    <motion.div
      className="w-[40vw] h-[40vw] bg-cover rounded-[40px] overflow-hidden relative flex items-center justify-center"
      style={{ backgroundImage: `url(${bgframe.src})` }}
      variants={frameVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="absolute translate-y-[8vw] w-[40vw] h-[40vw]"
        variants={moriVariants}
        initial="hidden"
        animate="visible"
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
    </motion.div>
  );
}
