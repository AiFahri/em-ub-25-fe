// File: /components/TentangComponents/SimpulMemori.js

"use client";

import Image from "next/image";
import smile from "/Assets/image/tentang/sec1/smile.svg";

export default function SimpulMemori() {
  return (
    <>
      <div className="flex flex-row items-center relative">
        <h1 className="font_bold text-[#0049FF] text-[clamp(9vw,9vw,8rem)] tracking-[-0.04em]">
          Simpul Mem
        </h1>
        <span className="bg-[#0049FF] w-[5.5vw] h-[5vw] rounded-full ml-[0.5vw] mt-[1vw]"></span>
        <div className="absolute right-[10.7%] gap-y-[0.5vw] top-[33%] w-[8%] z-10 flex items-center flex-col">
          <div className="flex flex-row gap-x-[0.5vw]">
            <div className="bg-white w-[2vw] h-[2vw] rounded-full relative overflow-hidden">
              <div className="pupil bg-black w-[1.5vw] h-[1.5vw] rounded-full absolute left-[12.5%] bottom-[15%]"></div>
            </div>
            <div className="bg-white w-[2vw] h-[2vw] rounded-full relative overflow-hidden">
              <div className="pupil bg-black w-[1.5vw] h-[1.5vw] rounded-full absolute right-[12.5%] bottom-[15%]"></div>
            </div>
          </div>

          <Image src={smile} alt="Logo Filosofi" className="w-[1vw]" />
        </div>
        <span className="text-[#0049FF] text-[clamp(9vw,9vw,8rem)] font_bold">
          ri
        </span>
      </div>

      <style jsx>{`
        .pupil.is-animating {
          animation: sweepAndBounce 2.5s ease-in-out forwards;
        }

        @keyframes sweepAndBounce {
          0% {
            transform: translate(0, 0);
          }
          40% {
            transform: translate(35%, 20%);
          }
          70% {
            transform: translate(70%, 0);
          }
          90% {
            transform: translate(5%, 10%);
          }
          100% {
            transform: translate(10%, 20%);
          }
        }
      `}</style>
    </>
  );
}
