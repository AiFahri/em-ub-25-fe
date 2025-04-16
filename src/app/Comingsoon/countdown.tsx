import React from "react";
import Timer from "../Components/timer";
import Image from "next/image";
// import whitelogo from "../../../public/Assets/logo/whitelogo.svg";

export default function Count() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-[#001B5E] gap-8 px-4 sm:px-8">
      <Timer />
      <button className="bg-white rounded-full text-[#001B5E] text-lg md:text-[26.68px] flex items-center justify-center w-72 md:w-[300px] h-14 md:h-[62px] font-medium">
        Take me back?
      </button>
      <div className="flex flex-row items-center justify-center absolute top-5">
      <p className="flex-wrap w-[37px] text-white text-[12.27px] text-end items-center mt-1 font_grotesk_semibold tracking-tighter">EM UB 2025</p>
      <Image
        src="/Assets/logo/whitelogo.svg"
        alt="white logo"
        className="w-auto"
      />
      <p className="flex-wrap w-[84px] text-white text-[12.27px] text-start  items-center mt-1 font_grotesk_regular">Kabinet <span className="font_grotesk_semibold flex flex-row tracking-tighter">Simpul Memori</span></p>
      </div>
    </div>
  );
}
