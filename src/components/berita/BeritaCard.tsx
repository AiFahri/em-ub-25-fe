
import Image from "next/image";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";

function getFullImageUrl(url?: string) {
  if (!url) return undefined;
  if (url.startsWith("http")) return url;
  return `https://is3.cloudhost.id/emub/${url}`;
}

type BeritaCardProps = {
  title: string;
  date: string;
  description: string;
  color: 'orange' | 'blue';
  imageUrl?: string;
  ministryName?: string;
  onClick?: () => void;
}


export default function BeritaCard(props: BeritaCardProps) {
  const { title, date, description, color, imageUrl, ministryName, onClick } = props;
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  function truncateWords(text: string, maxWords: number = 30): string {
    const words = text.split(' ');
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(' ') + '...';
  }

  useEffect(() => {
    if (!cardRef.current || !imageRef.current || !arrowRef.current) return;
    const card = cardRef.current;
    const image = imageRef.current;
    const arrow = arrowRef.current;
    const handleEnter = () => {
      gsap.to(card, { scale: 1.01, duration: 0.3, ease: 'power2.out' });
      gsap.to(image, { scale: 1.01, duration: 0.4, ease: 'power2.out' });
      gsap.to(arrow, { x: 6, scale: 1.1, rotation: 20, duration: 0.3, ease: 'power2.out' });
    };
    const handleLeave = () => {
      gsap.to(card, { scale: 1, duration: 0.3, ease: 'power2.out' });
      gsap.to(image, { scale: 1, duration: 0.4, ease: 'power2.out' });
      gsap.to(arrow, { x: 0, scale: 1, rotation: 0, duration: 0.3, ease: 'power2.out' });
    };
    card.addEventListener('mouseenter', handleEnter);
    card.addEventListener('mouseleave', handleLeave);
    return () => {
      card.removeEventListener('mouseenter', handleEnter);
      card.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`relative w-full rounded-[40px] ${color === 'orange' ? 'bg-[#FF4500]' : 'bg-[#0062FF]'} flex flex-col shadow-lg cursor-pointer outline-none h-[520px] md:h-[560px] lg:h-[600px] max-w-[550px] mx-auto`}
      tabIndex={0}
      onClick={onClick}
      style={{ transformOrigin: 'center center' }}
    >
      {/* Gambar berita */}
      <div className="mx-3 mt-6 md:mt-8 overflow-visible relative">
        <div ref={imageRef} className="rounded-2xl bg-white/20 items-center flex flex-col justify-center inverted-radius-big">
          {imageUrl ? (
            <Image
              src={getFullImageUrl(imageUrl) || '/placeholder-image.jpg'}
              alt={title}
              width={500}
              height={300}
              className="object-cover w-full h-full rounded-2xl "
              loading="lazy"
              draggable={false}
            />
          ) : (
            <span className="text-white/50 flex items-center justify-center h-full">
              <svg width="60" height="60" fill="none" viewBox="0 0 48 48">
                <rect x="6" y="10" width="36" height="28" rx="3" fill="currentColor" opacity="0.2"/>
                <path d="M19 24L24 29L31 21" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
                <circle cx="17" cy="18" r="2" fill="currentColor" opacity="0.5"/>
              </svg>
            </span>
          )}
        </div>
        <div className="absolute bottom-5 right-0 translate-y-1/2">
          <div
            ref={arrowRef}
            className={`w-[10vw] h-[10vw] sm:w-[7vw] sm:h-[7vw] md:w-[6vw] md:h-[6vw] lg:w-[4vw] lg:h-[4vw] flex items-center justify-center rounded-full border-4 shadow-lg bg-white ${color === 'orange' ? 'border-[#FF4500]' : 'border-[#0062FF]'}`}
          >
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24" className={color === 'orange' ? 'text-[#FF4500]' : 'text-[#0062FF]'}>
              <path d="M8.5 15.5L15.5 8.5M15.5 8.5H9.5M15.5 8.5V14.5" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

      <div className="px-6 pt-8 pb-6 md:px-8 md:pt-8 md:pb-8 flex flex-col flex-grow min-h-0"> 
        <h3 className="text-xl md:text-2xl font-bold text-white mb-1 flex-shrink-0">{title}</h3> 
        <p className="text-sm md:text-base text-white opacity-80 mb-4 flex-shrink-0">{date}</p> 
         <p className="text-sm md:text-base text-white opacity-80 mb-4 flex-shrink-0">{ministryName}</p> 
        <p className="text-sm md:text-base text-white flex-grow overflow-hidden"> {/* ✅ Removed scroll, added overflow-hidden */}
          {truncateWords(description, 70)} {/* ✅ Limit to 25 words */}
        </p>
      </div>
    </div>
  );
}