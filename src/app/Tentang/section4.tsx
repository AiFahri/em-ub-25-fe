import Image from "next/image";
import star from "../../../public/Assets/image/tentang/sec2/in_img.svg";
import styles from "../Components/TentangComponents/puzzle.module.css";
import akomodatif from "../../../public/Assets/background/tentang/sec4/akomodatif.svg";
import harmonisasi from "../../../public/Assets/background/tentang/sec4/harmonisasi.svg";
import rasional from "../../../public/Assets/background/tentang/sec4/rasional.svg";
import adaptif from "../../../public/Assets/background/tentang/sec4/adaptif.svg";
import bg_grid from "../../../public/Assets/background/tentang/bg_grid.svg";

import adaptif_image from "../../../public/Assets/image/tentang/sec4/adaptif._image.svg";
import harmonisasi_image from "../../../public/Assets/image/tentang/sec4/harmonisasi_image.svg";
import rasional_image from "../../../public/Assets/image/tentang/sec4/rasional_image.svg";
import akomodatif_image from "../../../public/Assets/image/tentang/sec4/akomodatif_image.svg";
export default function section4() {
  return (
    <div className="relative w-full flex flex-col items-center justify-center bg-[linear-gradient(182.56deg,_#FFFFFF_2.22%,_#FFCBB5_50.08%,_#FFFFFF_97.93%)]">
      <Image
        src={bg_grid}
        alt="Background Section 1"
        className="absolute top-0 "
      />
      <div className="relative w-[65%] mx-auto text-center flex flex-col  aspect-[734/260] leading-[8vw]">
        <h1 className="font_bold text-[clamp(8vw,8vw,7rem)] text-[#0538B9] tracking-[-0.03em] text-outline-kustom2 z-10">
          Nilai Dasar
        </h1>
        <h1 className="font_bold text-[clamp(10vw,10vw,9rem)] text-[#7CA1FF] tracking-[-0.03em] text-outline-kustom2 z-10">
          Organisasi
        </h1>
        <Image
          src={star}
          alt="star"
          className="absolute animate-spin [animation-duration:20s] left-[7%] w-[23%] top-[8%] rotate-[15deg]"
        />
        <Image
          src={star}
          alt="star"
          className="absolute animate-spin  [animation-duration:20s] right-[1%] w-[20%] bottom-[8%] rotate-[15deg]"
        />
      </div>

      {/* puzzle disini */}
      <div className="relative sm:w-10/12 w-11/12 items-center justify-center aspect-[1005/580]">
        <div className="  absolute top-0 left-0 w-[37%] z-10 flex flex-col items-center justify-center">
          <Image
            src={adaptif}
            alt="puzzle"
            className=""
          />
          <Image
            src={adaptif_image}
            alt="puzzle"
            className="absolute top-[10%]  w-[45%] z-10" />

          <h1 className="font_bold text-white absolute bottom-[0%] text-[clamp(4.5vw,4vw,1.5rem)]">Adaptif</h1>
        </div>


        <div className="w-[37%] z-10 absolute top-0 right-[25%] z-10 flex flex-col items-center justify-center">
          <Image
            src={rasional}
            alt="puzzle"
            className="" />

          <Image
            src={rasional_image}
            alt="puzzle"
            className="absolute top-[10%]  w-[45%] z-10" />

          <h1 className="font_bold text-white absolute bottom-[0%] text-[clamp(4.5vw,4vw,1.5rem)]">Rasional</h1>
        </div>


        <div className="absolute bottom-[2%] left-[19%] w-[37%] z-10 flex flex-col items-center justify-center">
          <Image
            src={akomodatif}
            alt="puzzle"
            className="" />

          <Image
            src={akomodatif_image}
            alt="puzzle"
            className="absolute top-[25%]  w-[45%] z-10" />

          <h1 className="font_bold text-white absolute bottom-[0%] text-[clamp(4.5vw,4vw,1.5rem)]">Akomodatif</h1>
        </div>

        <div className="absolute bottom-[2%] right-[5.3%] w-[42%] z-10 flex flex-col items-center justify-center">
          <Image
            src={harmonisasi}
            alt="puzzle"
            className="" />
          <Image
            src={harmonisasi_image}
            alt="puzzle"
            className="absolute  top-[7%] right-[20%] w-[45%] z-10" />

          <h1 className="font_bold text-white absolute bottom-[0%] right-[10%] text-[clamp(4.5vw,4vw,1.5rem)]">Harmonisasi</h1>
        </div>
      </div>
    </div>
  );
}
