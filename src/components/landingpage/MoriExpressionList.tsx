import Image from 'next/image';

interface MoriExpressionListProps {
  current: 'gembira' | 'semangat' | 'bangga' | 'cemberut';
  onSelect: (expression: 'gembira' | 'semangat' | 'bangga' | 'cemberut') => void;
}

const expressions = ['gembira', 'semangat', 'bangga', 'cemberut'] as const;

const expressionImageMap = {
  gembira: '/Assets/icon/landingpage/mori-gembira.svg',
  semangat: '/Assets/icon/landingpage/mori-semangat.svg',
  bangga: '/Assets/icon/landingpage/mori-bangga.svg',
  cemberut: '/Assets/icon/landingpage/mori-cemberut.svg',
};

export default function MoriExpressionList({ current, onSelect }: MoriExpressionListProps) {
  return (
    <div className="flex flex-wrap gap-x-12 justify-center items-end">
      {expressions
        .filter((exp) => exp !== current)
        .map((exp) => (
          <div key={exp} onClick={() => onSelect(exp)} className="cursor-pointer flex flex-col items-center w-[120px] md:w-[140px]">
            <div className="w-[150px] h-[150px] md:w-[150px] md:h-[150px] relative mb-2">
              <Image src={expressionImageMap[exp]} alt={`Ekspresi Mori ${exp}`} fill className="object-contain" />
            </div>
            <div className="bg-white border-2 border-[#FF4900] text-[#FF4900] text-2xl md:text-xl font-bold px-6 py-1 md:px-8 md:py-2 -translate-y-12 md:-translate-y-14 rounded-full shadow-sm text-center">{exp.charAt(0).toUpperCase() + exp.slice(1)}</div>
          </div>
        ))}
    </div>
  );
}
