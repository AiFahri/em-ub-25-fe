import Image from 'next/image';
import bgframe from '@/assets/landingpage/background/bg-moriframe-mobile.svg';

interface MoriFrameProps {
  expression: 'gembira' | 'semangat' | 'bangga' | 'cemberut';
}

const expressionImageMap = {
  gembira: '/Assets/icon/landingpage/mori-gembira.svg',
  semangat: '/Assets/icon/landingpage/mori-semangat.svg',
  bangga: '/Assets/icon/landingpage/mori-bangga.svg',
  cemberut: '/Assets/icon/landingpage/mori-cemberut.svg',
};

export default function MoriFrameMobile({ expression }: MoriFrameProps) {
  return (
    <div className="relative w-full mx-auto rounded-[40px] overflow-hidden">
      <Image src={bgframe} alt="Mori Frame Background" width={512} height={470} className="w-full h-auto object-contain" priority />

      <div className="absolute -bottom-[10%] left-1/2 -translate-x-1/2 w-[65%] aspect-square">
        <Image src={expressionImageMap[expression]} alt={`Ekspresi Mori ${expression}`} fill className="object-contain" />
      </div>
    </div>
  );
}
