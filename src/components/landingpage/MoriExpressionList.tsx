import Image from 'next/image';
import moriGembira from '@/assets/landingpage/icons/mori-gembira.svg';
import moriSemangat from '@/assets/landingpage/icons/mori-semangat.svg';
import moriBangga from '@/assets/landingpage/icons/mori-bangga.svg';
import { motion } from 'framer-motion';

interface MoriExpressionListProps {
  current: 'gembira' | 'semangat' | 'bangga' | 'cemberut';
  onSelect: (expression: 'gembira' | 'semangat' | 'bangga') => void;
}

const expressions = ['gembira', 'semangat', 'bangga'] as const;

const expressionImageMap = {
  gembira: moriGembira,
  semangat: moriSemangat,
  bangga: moriBangga,
};

export default function MoriExpressionList({ onSelect }: MoriExpressionListProps) {
  return (
    <div className="flex flex-wrap md:flex-nowrap gap-x-[10vw] md:gap-x-[5vw] xl:gap-x-[6vw] justify-center items-end">
      {expressions.map((exp) => (
        <div key={exp} onClick={() => onSelect(exp)} className="cursor-pointer flex flex-col items-center w-[clamp(90px,10vw,120px)]">
          <motion.div
            className="w-[clamp(28vw,33vw,35vw)] h-[clamp(28vw,33vw,35vw)] md:w-[clamp(10vw,13vw,14vw)] md:h-[clamp(10vw,13vw,14vw)] relative mb-2"
            whileHover={{ scale: 1.12 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <Image src={expressionImageMap[exp]} alt={`Ekspresi Mori ${exp}`} fill className="object-contain" />
          </motion.div>

          <div className="bg-white border-2 border-[#FF4900] text-[#FF4900] text-[clamp(2.5vw,4vw,5vw)] sm:text-[clamp(2.5vw,3vw,5vw)] md:text-[clamp(1.8vw,2vw,3vw)] font-bold px-3 sm:px-5 py-1 rounded-full shadow-sm text-center sm:-translate-y-[12vw] -translate-y-[10vw] md:-translate-y-[3.5vw] transition-all duration-200 hover:bg-[#FF4900] hover:text-white">
            {exp.charAt(0).toUpperCase() + exp.slice(1)}
          </div>
        </div>
      ))}
    </div>
  );
}
