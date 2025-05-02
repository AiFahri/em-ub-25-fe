"use client";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gemay from "../../public/Assets/icon/comingsoon/gemay.svg";
import o from "../../public/Assets/icon/comingsoon/o.svg";
import whitelogo from "../../public/Assets/logo/whitelogo.svg";
import BgGrid from "./Components/ComingsoonComponents/background/BgGrid";

export default function NotFound() {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  });
  return (
    <div className="relative flex justify-center overflow-hidden items-center flex-col min-h-screen bg-[#001B5E]">
      <BgGrid
        classNameVertical="opacity-40 object-cover translate-x-[-20%] translate-y-[0.5%]"
        classNameHorizontal="opacity-40 object-cover translate-y-[34%] z-50"
        speedVertical={1}
        speedHorizontal={1}
      />

      <div className="flex md:hidden flex-col items-center z-50 justify-center font_bold whitespace-nowrap space-y-4 text-[4rem] sm:text-[5rem]">
        <div className="flex flex-row items-center text-[#FF4900] relative">
          <span className="relative">
            <Image
              src={gemay}
              alt="coming soon"
              className="absolute left-1 top-1/2 -translate-y-1/2 w-7 sm:w-10"
            />
            4
          </span>
          <span>04</span>
        </div>
        <div className="flex flex-col items-center space-y-4">
          <div className="text-[#0049FF]">
            <span>not</span>
          </div>
          <div className="flex flex-row items-center text-[#0049FF]">
            <span>fou</span>
            <Image
              src={o}
              alt="coming soon"
              className="h-10 sm:h-14 mt-3 w-auto animate-bounce"
            />
            <span className="ml-[-2px]">d</span>
          </div>
        </div>
      </div>

      <div className="hidden md:flex flex-row absolute items-center z-50 justify-center font_bold whitespace-nowrap space-x-6 text-[6rem] lg:text-[8rem] xl:text-[173.32px]">
        <div className="flex flex-row items-center text-[#FF4900] relative">
          <Image
            src={gemay}
            alt="coming soon"
            className="absolute left-1 top-1/2 -translate-y-1/2 lg:w-16 md:w-12 xl:w-auto"
          />
          <span>404</span>
        </div>
        <div className="flex flex-row items-center text-[#0049FF]">
          <span>not</span>
        </div>
        <div className="flex flex-row items-center text-[#0049FF]">
          <span>fou</span>
          <Image
            src={o}
            alt="coming soon"
            className="h-16 lg:h-[5rem] xl:h-[8rem] xl:mt-6 mt-4 w-auto animate-bounce"
          />
          <span className="ml-[-2px]">d</span>
        </div>
      </div>

      <div className="flex flex-row items-center justify-center absolute top-5">
        <Image src={whitelogo} alt="white logo" className="w-auto" />
      </div>
      <div className="flex md:hidden flex-col items-center space-y-6 z-50 mt-8">
        <h2 className="text-white font_regular text-center text-lg sm:text-xl max-w-3xs">
          Nothing to see here… but we can help you find the way!
        </h2>
      </div>

      <div className="hidden md:flex flex-col items-center space-y-6 z-50 absolute top-[55%] xl:top-[65%]">
        <h2 className="text-white font_regular text-center md:text-2xl lg:text-3xl xl:text-3xl max-w-md md:max-w-3xl">
          Nothing to see here… but we can help you find the way!
        </h2>
      </div>

      <Link
        href="/"
        className="absolute bottom-20 z-50 bg-[#FF4900] hover:bg-[#ff6626] text-white
        rounded-full py-3 px-8 transition-colors duration-300
        text-base md:text-lg font-medium
        flex items-center justify-center
        w-[200px] md:w-[250px]"
      >
        Back to Home
      </Link>
    </div>
  );
}
