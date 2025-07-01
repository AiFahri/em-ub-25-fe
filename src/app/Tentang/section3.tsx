
"use client";

import React, { useRef, useLayoutEffect } from "react";
import Image from "next/image";
import logo from "../../../public/Assets/logo/tentang/logo.svg";
import smile from "../../../public/Assets/image/tentang/sec3/smile.svg";
import bg from "../../../public/Assets/background/tentang/sec3/bg.svg";
import mori from "../../../public/Assets/image/tentang/sec3/mori.svg";
import text from "../../../public/Assets/image/tentang/sec3/text.svg";
import bottom from "../../../public/Assets/image/tentang/sec3/bottom.svg";
import right from "../../../public/Assets/image/tentang/sec3/right.svg";
import half_right from "../../../public/Assets/image/tentang/sec3/half_right.svg";
import left from "../../../public/Assets/image/tentang/sec3/left.svg";


import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

export default function Section3() {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
          end: "bottom 20%",
          toggleActions: "restart reverse restart reverse",
        },
      });

      tl.from(".anim-decor-left", { x: -200, y: 50, rotation: -60, opacity: 0, scale: 1.5, ease: "back.out(1.7)", duration: 1.2 })
        .from(".anim-decor-bottom", { y: 200, skewX: 30, opacity: 0, scale: 0.5, ease: "elastic.out(1, 0.5)", duration: 1.5 }, "<0.2")
        .from(".anim-decor-half-right", { x: 300, opacity: 0, rotation: 180, ease: "power3.inOut", duration: 1 }, "<0.3")
        .from(".anim-decor-right", { x: 150, y: -100, rotation: 45, opacity: 0, ease: "back.out(1)", duration: 1 }, "<");

      tl.from(".anim-main-logo", { scale: 0, rotation: -360, opacity: 0, duration: 1.5, ease: "power4.inOut" }, "-=1.2");


      tl.from(".anim-mori-3", { xPercent: 100, opacity: 0, ease: "bounce.out", duration: 1.2 }, "-=1");


      tl.from(".anim-touch-group", { y: -50, opacity: 0, scale: 0.8, stagger: 0.2 }, "-=0.8");


      const leftContent = gsap.utils.toArray('.anim-left-stagger');
      tl.from(leftContent, {
        x: -50,
        opacity: 0,
        stagger: 0.25,
        ease: "back.out(1.4)"
      }, "-=1.2");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full sm:aspect-[1900/950] aspect-[1900/1800] mt-[5vw] overflow-hidden">
      <div className="flex sm:flex-row flex-col justify-between items-center w-11/12 mx-auto aspect-[1900/1000] z-20">


        <div className="flex flex-col items-center sm:w-7/12 w-full justify-center aspect-[856/176] z-20 ">
   
          <div className="flex flex-row items-center relative anim-left-stagger">
            <h1 className="text-[#0049FF] sm:text-[clamp(7vw,7vw,6rem)] text-[clamp(10vw,10vw,8rem)] font_bold">Filosofi L</h1>
            <span className="bg-[#0049FF] sm:w-[4.3vw] w-[6vw] h-[40%] rounded-full mt-[1vw] "></span>
            <Image src={smile} alt="Logo Filosofi" className="absolute right-[20.4%] top-[40%] w-[9%]" />
            <span className="text-[#0049FF] sm:text-[clamp(7vw,7vw,6rem)] text-[clamp(10vw,10vw,8rem)] font_bold">go</span>
          </div>

           <Image src={logo} alt="Logo Filosofi" className="w-[50%] mx-auto anim-main-logo sm:hidden block" />
          <div className="anim-left-stagger">
            <h1 className="text-[#0049FF] sm:text-[clamp(2vw,2vw,1.5rem)] text-[clamp(5vw,5vw,1.5rem)] font_bold border-[#0049FF] border-[0.5vw] py-[0.3vw] px-[3vw] rounded-[10vw]">
              Bentuk Simpul Infinity
            </h1>
          </div>

          <p className="text-[#0049FF] sm:text-[clamp(1.5vw,1.5vw,1rem)] text-[clamp(2vw,2vw,1rem)]  font_medium bg-[#BACEFF] rounded-[2vw] p-[2.3vw] mt-[2.5vw] anim-left-stagger">
            Melambangkan kesinambungan, keterhubungan, dan kekekalan memori. Hal
            ini digambarkan sebagaimana Kabinet Simpul Memori dapat berhubung
            dengan ingatan atau sejarah melalui kerja sama dan kolaborasi yang
            erat, serta wadah untuk bertukar pikiran.
          </p>

          <div className="flex flex-row items-center gap-x-[3vw] bg-[#BACEFF] rounded-[2vw] p-[2.3vw] mt-[3vw] anim-left-stagger">
            <div className="flex flex-col items-center">
              <h1 className="bg-[#0049FF] w-[4vw] h-[4vw] rounded-full" />
              <p className="text-[#0049FF] text-[clamp(2vw,2vw,1.5rem)] font_bold w-[6vw] text-center leading-[2.5vw]">
                Warna Biru
              </p>
            </div>
            <div className="flex flex-col items-center">
              <h1 className="bg-gradient-to-b from-[#3488CF] to-[#002C99] w-[4vw] h-[4vw] rounded-full" />
              <p className="text-[#0049FF] text-[clamp(2vw,2vw,1.5rem)] font_bold w-[8vw] text-center leading-[2.5vw]">
                Warna Gradiasi
              </p>
            </div>
            <p className="text-[#0049FF] sm:text-[clamp(1vw,1vw,1rem)] text-[clamp(2vw,2vw,1rem)] font_medium bg-[#BACEFF] rounded-[2vw]">
              Melambangkan stabilitas, kepercayaan, dan profesionalisme bahwa
              kabinet ini memiliki arah dan visi yang jelas. Gradasi warna biru
              memberikan kesan dinamis dan modern yang digambarkan melalui
              Kabinet Simpul Memori sebagai transformasi organisasi modern.
            </p>
          </div>
        </div>


        <div className="flex flex-col w-5/12 z-20 sm:block hidden">
          <div className="flex flex-row justify-end ml-[4vw] ">
            <div className="flex flex-col items-center anim-touch-group">
              <h1 className="text-white text-[clamp(1.2vw,1.2vw,1rem)] font_medium mt-[5vw] bg-[#0049FF] px-[2vw] py-[0.5vw] text-center rounded-[2vw]">Sentuh logo kami!</h1>
              <Image src={text} alt="Mori Section 3" className="place-items-end w-[95%] mt-[1vw]" />
            </div>
            <Image src={mori} alt="Mori Section 3" className="place-items-end w-[60%] anim-mori-3" />
          </div>
          <Image src={logo} alt="Logo Filosofi" className="w-[80%] mx-auto anim-main-logo" />
        </div>
      </div>

      <Image src={right} alt="Logo Filosofi" className="absolute bottom-[10%] right-[5%] w-[10%] anim-decor-right" />
      <Image src={half_right} alt="Logo Filosofi" className="absolute bottom-[40%] right-[30%] w-[20%] anim-decor-half-right" />
      <Image src={bottom} alt="Logo Filosofi" className="absolute bottom-[0%] right-[50%] w-[15%] anim-decor-bottom" />
      <Image src={left} alt="Logo Filosofi" className="absolute bottom-[20%] left-[10%] w-[15%] anim-decor-left" />

      <Image src={right} alt="Logo Filosofi" className="absolute top-[10%] left-[5%] w-[10%] anim-decor-right sm:hidden block" />
      <Image src={half_right} alt="Logo Filosofi" className="absolute top-[20%] right-[5%] w-[10%] anim-decor-half-right sm:hidden block" />
      <Image src={bottom} alt="Logo Filosofi" className="absolute top-[0%] left-[50%] w-[15%] anim-decor-bottom sm:hidden block" />
   
    </div>
  );
}