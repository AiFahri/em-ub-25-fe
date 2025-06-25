import React from "react";
import Image from "next/image";
import bg_section1 from "../../../public/Assets/background/tentang/bg_section1.svg";
import bg2_section1 from "../../../public/Assets/background/tentang/bg2_section1.svg";
import left_image from "../../../public/Assets/image/tentang/sec1/left_img.svg";
import mid_image from "../../../public/Assets/image/tentang/sec1/mid_img.svg";
import mori1 from "../../../public/Assets/image/tentang/mori1.svg";
import in_img from "../../../public/Assets/image/tentang/sec2/in_img.svg";
import out_img from "../../../public/Assets/image/tentang/sec2/out_img.svg";
import ChatButton from "../Components/TentangComponents/ChatButton";
import Letters from "../Components/TentangComponents/Letters";
import bg_grid from "../../../public/Assets/background/tentang/bg_grid.svg";
import SimpulMemori from "../Components/TentangComponents/SimpulMemori";

export default function Section1() {
  return (
    <div className="w-full flex flex-col items-center justify-center bg-gradient-to-b from-[#a1c0e3] to-[#FFFFFF]">
      <Image
        src={bg_grid}
        alt="Background Section 1"
        className="absolute top-0 "
      />
      <div className="relative w-full aspect-[1700/755] overflow-hidden">
        <Image
          src={bg_section1}
          alt="Background Section 1"
          className="z-20 absolute top-[5%] left-[8.9%] w-[48%]"
        />
        <Image
          src={bg2_section1}
          alt="Background Section 1"
          className="absolute top-[6.5%] left-[31.5%] w-[61.23%]"
        />
        <Image
          src={mori1}
          alt="Mori Section 1"
          className="z-40 absolute top-[16.5%] left-[16%] w-[27%] animate-float"
        />
        <div className="z-30 absolute bottom-[17%] left-[13.3%] w-[18%]">
          <ChatButton>Mari berkenalan!</ChatButton>
        </div>
        <h1 className="z-20 absolute bg-[#BACEFF] w-[6%] h-[13%] rounded-full bottom-[16%] left-[33%]"></h1>

        <Image
          src={left_image}
          alt="Section 1"
          className="z-30 absolute top-0 left-0 w-[28%]"
        />

        <Image
          src={in_img}
          alt="Section 1"
          className="z-10 absolute bottom-0 right-2 w-[18%] animate-spin [animation-duration:20s]"
        />

        <Image
          src={mid_image}
          alt="Section 1"
          className="z-10 absolute top-[14%] left-[40%] w-[17%] animate-spin [animation-duration:20s]"
        />

        <div className="flex z-20 flex-col text-start text-wrap absolute right-[7%] top-[20%] leading-[10vw] w-[35%]">
          <Letters
            text="Tentang"
            className="font_bold text-[#FF4900] text-[8.5vw] tracking-[-0.04em] text-outline-kustom"
            delayStart={0}
          />
          <Letters
            text="Kami"
            className="font_bold text-[#FF4900] text-[8.5vw] tracking-[-0.05em] text-outline-kustom ml-[1.5vw]"
            delayStart={1}
          />
        </div>
      </div>

      {/* section 2 */}
      <div className="relative w-full aspect-[1242/463] flex flex-row items-center justify-center">
        <div className="flex flex-col items-center justify-center text-center leading-[8vw] text-outline-kustom z-10 ml-[5vw]">
          <h1 className="font_bold text-[#FF4900] text-[4.5vw] tracking-[-0.04em]">
            Kabinet EM UB 2025
          </h1>
          <SimpulMemori/>
        </div>

        <Image
          src={in_img}
          alt="Section 1"
          className="absolute left-[16.1%] w-[20%] top-[18.5%]"
        />
        <Image
          src={out_img}
          alt="Section 1"
          className="absolute left-[10.5%] w-[31%] top-[5%]"
        />
      </div>
    </div>
  );
}
