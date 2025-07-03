// src/components/proker/ProkerSubPageImage.tsx

import React from "react";
import Image from "next/image";
import Frame from "@/assets/proker/prokerdetail-mask-shape.svg";
// Gambar pengganti jika tidak ada gambar dari data
import FallbackImage from "@/assets/proker/mori-card-proker.svg"; 

// 1. Definisikan interface untuk props komponen
interface ProkerSubPageImageProps {
  imageUrl: string | null | undefined;
}

const ProkerSubPageImage: React.FC<ProkerSubPageImageProps> = ({ imageUrl }) => {
  // 2. Tentukan gambar mana yang akan ditampilkan.
  // Jika imageUrl ada, gunakan itu. Jika tidak, gunakan gambar pengganti.
  const imageToDisplay = imageUrl || FallbackImage;

  return (
    <div className="relative  w-full h-[400px] md:h-[500px] lg:h-[600px]">
      <div
        className="w-full  h-full"
        style={{
          maskImage: `url(${Frame.src})`,
          WebkitMaskImage: `url(${Frame.src})`,
          maskSize: "contain",
          WebkitMaskSize: "contain",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskPosition: "center",
          WebkitMaskPosition: "center",
        }}
      >
        <Image
          // 3. Gunakan variabel imageToDisplay sebagai src
          src={imageToDisplay}
          fill
          alt="Gambar Program Kerja"
          className="object-cover"
          // 4. (PENTING) Jika Anda menggunakan domain eksternal, tambahkan prop `unoptimized` 
          //    atau konfigurasikan domain di next.config.js (lihat catatan di bawah).
          //    Kita tambahkan kondisi: unoptimized hanya aktif jika imageUrl (dari eksternal) ada.
          unoptimized={!!imageUrl} 
        />
      </div>
    </div>
  );
};

export default ProkerSubPageImage;