"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
// import o from "@/public/Assets/icon/comingsoon/o.svg";
// import whitelogo from "@/public/Assets/logo/whitelogo.svg";
import BgGrid from "@/components/comingsoon/background/BgGrid";

export default function UnderDev() {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="relative flex justify-center overflow-hidden items-center flex-col min-h-screen bg-[#001B5E]">
      <BgGrid
        classNameVertical="opacity-40 object-cover translate-x-[-20%] translate-y-[0.5%]"
        classNameHorizontal="opacity-40 object-cover translate-y-[34%] z-50"
        speedVertical={1}
        speedHorizontal={1}
      />

      <div className="flex md:hidden flex-col items-center z-50 justify-center font_bold whitespace-nowrap space-y-4 text-[3.5rem] sm:text-[4rem]">
        <div className="text-[#FF4900]">Coming</div>
        <div className="flex flex-row items-center text-[#0049FF]">
          <span>So</span>
          <Image
            src="/Assets/icon/comingsoon/o.svg"
            alt="coming soon"
            width={40}
            height={40}
            className="h-10 sm:h-14 mt-3 w-auto animate-bounce"
          />
          <span className="ml-[-2px]">n</span>
        </div>
      </div>

      <div className="hidden md:flex flex-row absolute items-center z-50 justify-center font_bold whitespace-nowrap space-x-6 text-[5rem] lg:text-[7rem] xl:text-[9rem]">
        <div className="text-[#FF4900]">Coming</div>
        <div className="flex flex-row items-center text-[#0049FF]">
          <span>So</span>
          <Image
            src="/Assets/icon/comingsoon/o.svg"
            alt="coming soon"
            width={40}
            height={40}
            className="h-16 lg:h-[5rem] xl:h-[8rem] xl:mt-6 mt-4 w-auto animate-bounce"
          />
          <span className="ml-[-2px]">n</span>
        </div>
      </div>

      <div className="flex flex-row items-center justify-center absolute top-5">
        <Image
          src="/Assets/logo/whitelogo.svg"
          alt="white logo"
          width={40}
          height={40}
          className="w-auto"
        />
      </div>

      <div className="flex md:hidden flex-col items-center space-y-6 z-50 mt-8">
        <h2 className="text-white font_regular text-center text-base sm:text-lg max-w-3xs">
          This page is still under development. We&rsquo;re just putting on the
          final touches. This page will be available shortly!
        </h2>
      </div>

      <div className="hidden md:flex flex-col items-center space-y-6 z-50 absolute top-[60%]">
        <h2 className="text-white font_regular text-center md:text-xl lg:text-2xl xl:text-2xl max-w-md md:max-w-3xl">
          This page is still under development. We&rsquo;re just putting on the
          final touches. This page will be available shortly!
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
