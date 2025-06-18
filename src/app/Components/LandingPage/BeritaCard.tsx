import { NewsItem } from '../../types/berita';
import Image from 'next/image';
import ArrowUpRight from '../../assets/icons/arrow-up-right.svg';
import beritaimg from '../../assets/background/landingpage/contohberita.png';

type BeritaCardProps = NewsItem & { index: number };

export default function BeritaCard({ title, date, description, image, index }: BeritaCardProps) {
  const isOrange = index % 2 === 0;

  const showPlaceholder = !image?.trim();

  return (
    <div className="rounded-2xl p-4 w-full h-full space-y-3 relative">
      <div className="relative">
        <div className="w-full h-[330px] rounded-4xl relative overflow-hidden clip-concave-bottom-right">
          {showPlaceholder ? (
            <div className="flex items-center justify-center w-full h-full bg-gray-100">
              <Image src="/Assets/icon/landingpage/placeholder.svg" alt={title} width={48} height={48} />
            </div>
          ) : (
            <Image src={beritaimg} alt={title} fill className="object-cover" />
          )}
        </div>

        <div className={`absolute bottom-2 right-0 p-6 rounded-full z-20 ${isOrange ? 'bg-[#FF4900]' : 'bg-[#0049FF]'}`}>
          <Image src={ArrowUpRight} alt="arrow" width={20} height={20} />
        </div>
      </div>

      <div className="font-[NeueHaasDisplay]">
        <h3 className="text-blue-900 font-medium text-3xl">{title}</h3>
        <p className="text-xl font-medium text-[#001B5E]">{date}</p>
        <p className="text-lg mt-2 font-medium text-[#001B5E]">{description}</p>
      </div>
    </div>
  );
}
