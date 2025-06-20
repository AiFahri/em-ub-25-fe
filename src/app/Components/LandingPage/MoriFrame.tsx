import Image from 'next/image';
import bgframe from '../../assets/background/landingpage/bg-moriframe.svg';

interface MoriFrameProps {
  expression: 'gembira' | 'semangat' | 'bangga' | 'cemberut';
}

const expressionImageMap = {
  gembira: '/Assets/icon/landingpage/mori-gembira.svg',
  semangat: '/Assets/icon/landingpage/mori-semangat.svg',
  bangga: '/Assets/icon/landingpage/mori-bangga.svg',
  cemberut: '/Assets/icon/landingpage/mori-cemberut.svg',
};

export default function MoriFrame({ expression }: MoriFrameProps) {
  return (
    <div className="w-[590px] h-[590px] bg-center rounded-[40px] overflow-hidden relative flex items-center justify-center" style={{ backgroundImage: `url(${bgframe.src})` }}>
      <Image src={expressionImageMap[expression]} alt={`Ekspresi Mori ${expression}`} fill className="absolute translate-y-[135px] w-[405px] h-[405px]" />
    </div>
  );
}
