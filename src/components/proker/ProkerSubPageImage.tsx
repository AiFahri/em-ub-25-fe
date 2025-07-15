import React from "react";
import Image from "next/image";
import Frame from "@/assets/proker/prokerdetail-mask-shape.svg";
import FallbackImage from "@/assets/proker/mori-card-proker.svg"; 

interface ProkerSubPageImageProps {
  imageUrl: string | null | undefined;
}

const ProkerSubPageImage: React.FC<ProkerSubPageImageProps> = ({ imageUrl }) => {
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
    
          src={imageToDisplay}
          fill
          alt="Gambar Program Kerja"
          className="object-cover"
        unoptimized={!!imageUrl} 
        />
      </div>
    </div>
  );
};

export default ProkerSubPageImage;