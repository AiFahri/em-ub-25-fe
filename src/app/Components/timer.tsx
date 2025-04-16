'use client';
import React, { useState, useEffect } from "react";
import Image from "next/image";
import daysIcon from "../../../public/Assets/icon/days.svg";
import hoursIcon from "../../../public/Assets/icon/hours.svg";
import minutesIcon from "../../../public/Assets/icon/minutes.svg";
import secondsIcon from "../../../public/Assets/icon/seconds.svg";

export default function Timer() {
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const targetDate = new Date("2025-06-01T23:59:59");
    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft({
          days: days < 10 ? `0${days}` : `${days}`,
          hours: hours < 10 ? `0${hours}` : `${hours}`,
          minutes: minutes < 10 ? `0${minutes}` : `${minutes}`,
          seconds: seconds < 10 ? `0${seconds}` : `${seconds}`,
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-row xl:gap-20 lg:gap-12 md:gap-7 sm:gap-7 gap-2 mt-20">
      <div id="days" className="flex flex-col items-center text-[#0049FF] w-[100px] sm:w-[140px] md:w-[190px] lg:w-[220px] ">
        <Image src={daysIcon} alt="days" className="lg:w-[120px] lg:h-[129px] md:w-[90px] md:h-[99px] w-[60px] h-[70px]" />
        <h1 className="font_bold lg:text-[164.55px] md:text-[120px] sm:text-[90px] ">{timeLeft.days}</h1>
        <p className="text-white font_regular md:text-[35.62px]">days</p>
      </div>
      <div id="hours" className="flex flex-col items-center text-[#0049FF] w-[100px] sm:w-[120px] md:w-[190px] lg:w-[220px] ">
        <Image src={hoursIcon} alt="hours" className="lg:w-[120px] lg:h-[129px] md:w-[90px] md:h-[99px] w-[60px] h-[70px]" />
        <h1 className="font_bold lg:text-[164.55px] md:text-[120px] sm:text-[90px] ">{timeLeft.hours}</h1>
        <p className="text-white font_regular md:text-[35.62px]">hours</p>
      </div>
      <div id="minutes" className="flex flex-col items-center text-[#0049FF] w-[100px] sm:w-[120px] md:w-[190px] lg:w-[220px] ">
        <Image src={minutesIcon} alt="minutes" className="lg:w-[120px] lg:h-[129px] md:w-[90px] md:h-[99px] w-[60px] h-[70px]" />
        <h1 className="font_bold lg:text-[164.55px] md:text-[120px] sm:text-[90px]  ">{timeLeft.minutes}</h1>
        <p className="text-white font_regular md:text-[35.62px]">minutes</p>
      </div>
      <div id="seconds" className="flex flex-col items-center text-[#FF4900]  w-[100px] sm:w-[120px] md:w-[190px] lg:w-[220px] ">
        <Image src={secondsIcon} alt="seconds" className="lg:w-[120px] lg:h-[129px] md:w-[90px] md:h-[99px] w-[60px] h-[70px]" />
        <h1 className="font_bold lg:text-[164.55px] md:text-[120px] sm:text-[90px] ">{timeLeft.seconds}</h1>
        <p className="text-white font_regular md:text-[35.62px]">seconds</p>
      </div>
    </div>
  );
}
