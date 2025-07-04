"use client";

import React, { useRef, useLayoutEffect } from "react";
import Image from "next/image";

import ChatButton from "../../../components/tentang/ChatButton";
import Letters from "../../../components/tentang/Letters";
import SimpulMemori from "../../../components/tentang/SimpulMemori";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Section1() {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".anim-from-left", {
        x: -100,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".anim-from-left",
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "restart reverse restart reverse",
        },
      });
      gsap.from(".anim-from-right", {
        x: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".anim-from-right",
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "restart reverse restart reverse",
        },
      });
      gsap.from(".anim-from-bottom", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "bottom 15%",
          toggleActions: "restart reverse restart reverse",
        },
      });
      gsap.from(".anim-decor-left", {
        x: -100,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".section-2-container",
          start: "top 80%",
          end: "bottom 15%",
          toggleActions: "restart reverse restart reverse",
        },
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".section-2-container",
          start: "top 75%",
          end: "bottom 15%",
          toggleActions: "restart reverse restart reverse",
          onEnter: () =>
            gsap.delayedCall(1, () =>
              document
                .querySelectorAll(".pupil")
                .forEach((el) => el.classList.add("is-animating"))
            ),
          onLeaveBack: () =>
            document
              .querySelectorAll(".pupil")
              .forEach((el) => el.classList.remove("is-animating")),
          onEnterBack: () =>
            gsap.delayedCall(1, () =>
              document
                .querySelectorAll(".pupil")
                .forEach((el) => el.classList.add("is-animating"))
            ),
          onLeave: () =>
            document
              .querySelectorAll(".pupil")
              .forEach((el) => el.classList.remove("is-animating")),
        },
      });

      tl.from(".anim-title-kabinet", {
        yPercent: 110,
        duration: 1.5,
        ease: "elastic.out(1, 0.6)",
      }).from(
        ".anim-simpul-memori",
        {
          yPercent: 110,
          duration: 1.5,
          ease: "elastic.out(1, 0.6)",
        },
        "<0.3"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full flex flex-col items-center justify-center bg-gradient-to-b from-[#a1c0e3] to-[#FFFFFF] overflow-x-hidden"
    >
      <Image
        src="/Assets/background/tentang/bg_grid.svg"
        alt="Background Grid"
        className="absolute top-0 opacity-50"
        fill={false}
        width={0}
        height={0}
      />
      <div className="relative w-full aspect-[1700/755] overflow-hidden">
        <Image
          src="/Assets/background/tentang/bg_section1.svg"
          alt="Background Section 1"
          className="z-20 absolute top-[5%] left-[8.9%] w-[48%] anim-from-bottom"
          fill={false}
          width={0}
          height={0}
        />
        <Image
          src="/Assets/background/tentang/bg2_section1.svg"
          alt="Background Section 2"
          className="absolute top-[6.5%] left-[31.5%] w-[61.23%] anim-from-bottom"
          fill={false}
          width={0}
          height={0}
        />
        <Image
          src="/Assets/image/tentang/mori1.svg"
          alt="Mori Section 1"
          className="z-40 absolute top-[16.5%] left-[16%] w-[27%] animate-float anim-from-bottom"
          fill={false}
          width={0}
          height={0}
        />
        <div className="z-30 absolute bottom-[17%] left-[13.3%] anim-from-bottom">
          <ChatButton size="clamp(1.5vw, 1.5vw, 1.5rem)">
            Mari berkenalan!
          </ChatButton>
        </div>
        <h1 className="z-20 absolute bg-[#BACEFF] w-[6%] h-[13%] rounded-full bottom-[16%] left-[33%]"></h1>
        <Image
          src="/Assets/image/tentang/sec1/left_image.svg"
          alt="Section 1"
          className="z-30 absolute top-0 left-0 w-[28%] anim-from-left"
          fill={false}
          width={0}
          height={0}
        />
        <Image
          src="/Assets/image/tentang/sec2/in_img.svg"
          alt="Section 1"
          className="z-10 absolute bottom-0 right-2 w-[18%] animate-spin [animation-duration:20s]"
          fill={false}
          width={0}
          height={0}
        />
        <Image
          src="/Assets/image/tentang/sec1/mid_img.svg"
          alt="Section 1"
          className="z-10 absolute top-[14%] left-[40%] w-[17%] animate-spin [animation-duration:20s]"
          fill={false}
          width={0}
          height={0}
        />
        <div className="flex z-20 flex-col text-start text-wrap absolute right-[7%] top-[20%] leading-[10vw] w-[35%] anim-from-right">
          <Letters
            text="Tentang"
            className="font_bold text-[#FF4900] text-[clamp(8.5vw,8.5vw,8rem)] tracking-[-0.04em] text-outline-kustom"
            delayStart={0}
          />
          <Letters
            text="Kami"
            className="font_bold text-[#FF4900] text-[clamp(8.5vw,8.5vw,8rem)] tracking-[-0.05em] text-outline-kustom ml-[1.5vw]"
            delayStart={1}
          />
        </div>
      </div>

      <div className="relative w-full aspect-[1242/463] flex flex-row items-center justify-center section-2-container">
        <div className="flex flex-col items-center justify-center text-center leading-[8vw] text-outline-kustom z-10 ml-[5vw]">
          <div className="overflow-hidden">
            <h1 className="font_bold text-[#FF4900] text-[clamp(5vw,5vw,4rem)] tracking-[-0.04em] anim-title-kabinet">
              Kabinet EM UB 2025
            </h1>
          </div>
          <div className="overflow-hidden">
            <div className="anim-simpul-memori">
              <SimpulMemori />
            </div>
          </div>
        </div>
        <Image
          src="/Assets/image/tentang/sec2/in_img.svg"
          alt="Section 1"
          className="absolute left-[16.1%] w-[20%] top-[18.5%] anim-decor-left"
          fill={false}
          width={0}
          height={0}
        />
        <Image
          src="/Assets/image/tentang/sec2/out_img.svg"
          alt="Section 1"
          className="absolute left-[10.5%] w-[31%] top-[5%] anim-decor-left"
          fill={false}
          width={0}
          height={0}
        />
      </div>
    </div>
  );
}

