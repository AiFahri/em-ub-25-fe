'use client';

import React from "react";
import Image from "next/image";
import bg from "../../../public/assets/background/tentang/sec2/bg.svg";
import vector from "../../../public/Assets/image/tentang/vector_sec2.svg";
import vector2 from "../../../public/Assets/image/tentang/vector2.svg";
import bg_left from "../../../public/Assets/background/tentang/sec2/bg_left.svg";
import bg_right from "../../../public/Assets/background/tentang/sec2/bg_right.svg";
import smile from "../../../public/Assets/icon/tentang/section2/smile.svg";
import ghost from "../../../public/Assets/icon/tentang/section2/ghost.svg";
import mad from "../../../public/Assets/icon/tentang/section2/mad.svg";
import Letters from "../Components/TentangComponents/Letters";

export default function Section2() {

  
  return (
    <div className="relative w-full aspect-[1900/1000]  ">
      {/* main content */}
      <div className="relative w-[95%] mx-auto h-full ">
        <Image src={bg} alt="Background Section 2" fill className="z-10  " />


        <div className="relative z-20 flex flex-col justify-center h-full w-full">
          <Image src={bg_left} alt="Background Section 2" className="absolute left-[3.4%] w-[42%]" />
          <Image src={smile} alt="Background Section 2" className="shake-on-hover absolute left-[40.7%] top-[39%] w-[6.5%]" />
          <Image src={bg_right} alt="Background Section 2" className="absolute right-[6%] w-[42%]" />
          <Image src={ghost} alt="Background Section 2" className=" shake-on-hover absolute right-[42.6%] bottom-[17%] w-[7.5%]" />
          <Image src={mad} alt="Background Section 2" className=" shake-on-hover absolute right-[2.5%] top-[32%] w-[7%]" />
          <h1 className="absolute right-[5.1%] bottom-[36%] border-[0.7vw] border-[#0049FF] rounded-full w-[4%] h-[7%] " />
          <Letters
            text="Sambutan"
            className="font_bold text-[#FF4900] text-[clamp(7vw,7vw,8rem)] tracking-[-0.04em] absolute top-[10%] left-[14.5%] text-outline-kustom"
            delayStart={0}
          />
        </div>
      </div>
      {/* content variation */}
      <div className="absolute top-1 left-0 w-[12%] h-[50%] border-[1vw] border-[#FF4900] rounded-r-full " />

      <Image
        src={vector}
        alt="vector"
        className="absolute top-0 right-[1%]  w-[15%]  "
      />

      <Image
        src={vector2}
        alt="vector"
        className="absolute bottom-0 left-0  w-[20%]   "
      />

      <div className="absolute  bottom-[3%] right-[2%] w-[25%] h-[20%] bg-[#FF7C48] rounded-t-full " />

    </div>
  );
}
