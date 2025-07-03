'use client';
import Image from 'next/image';

interface BgGridProps {
  classNameVertical?: string;
  classNameHorizontal?: string;
  speedVertical?: number;
  speedHorizontal?: number;
}

export default function BgGrid({ classNameVertical = '', classNameHorizontal = '', speedVertical = 10, speedHorizontal = 20 }: BgGridProps) {
  return (
    <>
      <div
        className="absolute inset-0 z-20 overflow-hidden pointer-events-none"
        style={{
          animation: `scrollVertical ${speedVertical}s linear infinite`,
        }}
      >
        <div>
          <Image src="/Assets/background/grid/bg_grid_vertical.svg" alt="vertical grid" fill className={classNameVertical} />
        </div>
      </div>

      <div
        className="absolute inset-0 z-20 overflow-hidden pointer-events-none"
        style={{
          animation: `scrollHorizontal ${speedHorizontal}s linear infinite`,
        }}
      >
        <div>
          <Image src="/Assets/background/grid/bg_grid_horizontal.svg" alt="horizontal grid" fill className={classNameHorizontal} />
        </div>
      </div>

      <style jsx global>{`
        @keyframes scrollVertical {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(2.3%);
          }
        }

        @keyframes scrollHorizontal {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(0.7%);
          }
        }
      `}</style>
    </>
  );
}
