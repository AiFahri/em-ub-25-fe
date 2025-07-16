'use client';

import { NewsItem } from '@/types/berita';
import Image from 'next/image';
import ArrowUpRight from '@/assets/landingpage/icons/arrow-up-right.svg';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

type BeritaCardProps = NewsItem & { index: number };

export default function BeritaCard({ title, date, description, imageUrl, index }: BeritaCardProps) {
  const isOrange = index % 2 === 0;
  const showPlaceholder = !imageUrl?.trim();
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current || !imageRef.current || !arrowRef.current) return;

    const ctx = gsap.context(() => {
      // Hover animations
      const card = cardRef.current;
      const image = imageRef.current;
      const arrow = arrowRef.current;
      
      if (card && image && arrow) {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            scale: 1.04,
            duration: 0.3,
            ease: "power2.out",
          });
          
          gsap.to(image, {
            scale: 1.04,
            duration: 0.4,
            ease: "power2.out",
          });
          
          gsap.to(arrow, {
            x: 6,
            scale: 1.1,
            rotation: 20,
            duration: 0.3,
            ease: "power2.out",
          });
        });
        
        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
          
          gsap.to(image, {
            scale: 1,
            duration: 0.4,
            ease: "power2.out",
          });
          
          gsap.to(arrow, {
            x: 0,
            scale: 1,
            rotation: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      }
    }, cardRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={cardRef}
      className="berita-card rounded-2xl p-4 w-full sm:w-[250px] lg:w-[300px] xl:w-[440px] mx-auto h-full space-y-3 relative cursor-pointer"
      style={{ transformOrigin: 'center center' }}
    >
      <div className="relative">
        <div ref={imageRef} className="w-full h-[200px] lg:h-[320px] rounded-4xl relative overflow-hidden inverted-radius">
          {showPlaceholder ? (
            <div className="flex  items-center justify-center  w-full h-full bg-gray-100">
              <Image src="/Assets/icon/landingpage/placeholder.svg" alt={title} width={48} height={48} />
            </div>
          ) : (
            <Image src={`https://is3.cloudhost.id/emub/${imageUrl.replace(/^\/+/, '')}`} alt={title} fill className="object-cover transition-all" />
          )}
        </div>

        <div ref={arrowRef} className={`absolute bottom-0 right-2 p-4 lg:p-6 rounded-full z-20 ${isOrange ? 'bg-[#FF4900]' : 'bg-[#0049FF]'}`}>
          <Image src={ArrowUpRight} alt="arrow" className="w-[22px] md:w-[20px]" />
        </div>
      </div>

      <div className="font-[NeueHaasDisplay]">
        <h3 className="text-[#002787] font-medium text-[clamp(2.8vw,3.8vw,40px)] truncate">{title}</h3>
        <p className="text-[clamp(1.5vw,2.8vw,20px)] font-medium text-[#001B5E]">{date}</p>
        <p className="text-[clamp(1.3vw,2.8vw,15px)] mt-2 font-medium text-[#001B5E] truncate">{description}</p>
      </div>
    </div>
  );
}
