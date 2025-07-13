import Image from "next/image";
import React from "react";
import type { StaticImageData } from "next/image";

interface FolderProps {
  nama: string;
  imageUrl: string | StaticImageData;
  isHovered: boolean;
  isDimmed: boolean;
  isActive: boolean;
  shadowColor: string;
}

const Folder: React.FC<FolderProps> = ({
  nama,
  imageUrl,
  isHovered,
  isDimmed,
  isActive,
  shadowColor,
}) => {
  let transform = "scale(1) translateY(0)";
  const opacity = isDimmed ? "0.6" : "1";
  let filter = "none";

  if (isHovered) {
    transform = "scale(1.15) translateY(-1.5vw)";
    filter = `drop-shadow(0 12px 20px ${shadowColor})`;
  } else if (isActive) {
    transform = "scale(1.05)";
    filter = `drop-shadow(0 12px 20px ${shadowColor})`;
  } else if (isDimmed) {
    transform = "scale(0.9)";
  }

  const dynamicContainerStyle: React.CSSProperties = {
    transform,
    opacity,
    filter,
    transition:
      "transform 0.3s ease-in-out, opacity 0.3s ease-in-out, filter 0.3s ease-in-out",
    cursor: "pointer",
  };

  return (
    <div
      className="relative w-[23vw] sm:w-[16vw] aspect-[10/9]"
      style={dynamicContainerStyle}
    >
      <Image src={imageUrl} alt={nama} layout="fill" objectFit="contain" />
      <div className="font-semibold text-[clamp(2.5vw,2.5vw,5rem)] sm:text-[clamp(1vw,1.7vw,1.5rem)] w-full h-full absolute top-0 left-0 flex text-start items-end text-white p-[1.5vw] leading-tight justify-start">
        {nama}
      </div>
    </div>
  );
};

export default Folder;
