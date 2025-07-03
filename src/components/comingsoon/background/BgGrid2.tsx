// src/components/comingsoon/background/BgGrid2.tsx

'use client';
import Image from "next/image";

interface BgGridProps {
  classNameVertical?: string;
  classNameHorizontal?: string;
  speedVertical?: number;
  speedHorizontal?: number;
}

export default function BgGrid2({
  classNameVertical = "",
  classNameHorizontal = "",
  speedVertical = 40,
  speedHorizontal = 50
}: BgGridProps) {
  return (
    <>
      {/* --- GRID VERTIKAL --- */}
      {/* FIX: Menghapus kelas 'relative' yang berkonflik.
        Sebuah elemen tidak bisa memiliki posisi 'absolute' dan 'relative' secara bersamaan.
        Karena elemen ini harus mengisi kontainer induknya (yang ada di BeritaHero), 
        posisi yang benar adalah 'absolute'.
      */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{
          animation: `scrollVertical ${speedVertical}s linear infinite`,
        }}
      >
        <Image
          src="/Assets/background/grid/bg_grid_vertical.svg"
          alt="vertical grid"
          fill
          className={`object-cover ${classNameVertical}`}
        />
      </div>

      {/* --- GRID HORIZONTAL --- */}
      {/* FIX: Menghapus kelas 'relative' yang berkonflik. */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{
          animation: `scrollHorizontal ${speedHorizontal}s linear infinite`,
        }}
      >
        <Image
          src="/Assets/background/grid/bg_grid_horizontal.svg"
          alt="horizontal grid"
          fill
          className={`object-cover ${classNameHorizontal}`}
        />
      </div>

      {/* Keyframes untuk animasi tidak perlu diubah */}
      <style jsx global>{`
        @keyframes scrollVertical {
          0% { transform: translateY(0); }
          100% { transform: translateY(2.3%); }
        }
        
        @keyframes scrollHorizontal {
          0% { transform: translateX(0); }
          100% { transform: translateX(0.7%); }
        }
      `}</style>
    </>
  );
}
