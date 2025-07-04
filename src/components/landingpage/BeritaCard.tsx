'use client';

import { useEffect, useRef } from 'react';
import { NewsItem } from '@/types/berita';
import Image from 'next/image';
import ArrowUpRight from '@/assets/landingpage/icons/arrow-up-right.svg';
import gsap from 'gsap';
import beritaimg from '@/assets/landingpage/background/contohberita.png';

type BeritaCardProps = NewsItem & { index: number };

export default function BeritaCard({ title, date, description, imageUrl, index }: BeritaCardProps) {
  const isOrange = index % 2 === 0;
  const showPlaceholder = !imageUrl?.trim();

  // Refs for animation
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const arrow = arrowRef.current;

    if (!card || !arrow) return;

    const tlEnter = gsap.timeline({ defaults: { duration: 0.6, ease: 'back.out(1.7)' } });
    const tlLeave = gsap.timeline({ defaults: { duration: 0.6, ease: 'back.in(1.7)' } });

    const onEnter = () => {
      tlEnter.restart();
      tlEnter.to(card, { scale: 1.1, duration: 1, }, 0);
      tlEnter.to(arrow, { rotate: 360, scale: 1.2 }, 0);
    };

    const onLeave = () => {
      tlLeave.restart();
      tlLeave.to(card, { scale: 1 }, 0);
      tlLeave.to(arrow, { rotate: 0, scale: 1 }, 0);
    };

    card.addEventListener('mouseenter', onEnter);
    card.addEventListener('mouseleave', onLeave);

    return () => {
      card.removeEventListener('mouseenter', onEnter);
      card.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div ref={cardRef} className="rounded-2xl p-4 w-full h-full space-y-3 relative cursor-pointer" style={{ transformOrigin: 'center center' }}>
      <div className="relative" ref={imageRef}>
        <div className="w-full h-[200px] lg:h-[320px] rounded-4xl relative overflow-hidden inverted-radius">
          {showPlaceholder ? (
            <div className="flex items-center justify-center w-full h-full bg-gray-100">
              <Image src="/Assets/icon/landingpage/placeholder.svg" alt={title} width={48} height={48} />
            </div>
          ) : (
            <Image src={`https://is3.cloudhost.id/em-ub-2025/${imageUrl.replace(/^\/+/, '')}`} alt={title} fill className="object-cover transition-all" />
          )}
        </div>

        <div ref={arrowRef} className={`absolute bottom-0 right-2 p-4 lg:p-6 rounded-full z-20 ${isOrange ? 'bg-[#FF4900]' : 'bg-[#0049FF]'}`}>
          <Image src={ArrowUpRight} alt="arrow" className="w-[22px] md:w-[20px]" />
        </div>
      </div>

      <div className="font-[NeueHaasDisplay]">
        <h3 ref={titleRef} className="text-[#002787] font-medium text-[clamp(2.8vw,3.8vw,40px)] truncate">
          {title}
        </h3>
        <p className="text-[clamp(1.5vw,2.8vw,20px)] font-medium text-[#001B5E]">{date}</p>
        <p ref={descRef} className="text-[clamp(1.3vw,2.8vw,15px)] mt-2 font-medium text-[#001B5E] truncate">
          {description}
        </p>
      </div>
    </div>
  );
}
