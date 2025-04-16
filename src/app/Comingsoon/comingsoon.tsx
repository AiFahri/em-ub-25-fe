import Image from "next/image";
import c from "../../../public/Assets/icon/c.svg";
import o from "../../../public/Assets/icon/o.svg";
import whitelogo from "../../../public/Assets/logo/whitelogo.svg";

export default function Comingsoon() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-[#001B5E]">
      <div className="flex flex-col items-center space-y-6 mb-14">
        <div className="  flex flex-row  items-center justify-center font_bold whitespace-nowrap space-x-6 text-[4rem] sm:text-[5rem] md:text-[6rem] lg:text-[7rem] xl:text-[10rem]">
        <div className="flex flex-row items-center  text-[#0049FF]">
            <Image
              src={c}
              alt="coming soon"
              className="h-10 sm:h-14 md:h-16 lg:h-[5rem] xl:h-[8rem] w-auto"
            />
            <span>alling</span>
          </div>

          <span className="text-[#0049FF]">out</span>
          <div className="flex flex-row items-center text-[#FF4900]">
            <span>s</span>
            <Image
              src={o}
              alt="coming soon"
              className="h-10 sm:h-14 md:h-16 lg:h-[5rem] xl:h-[8rem] mt-2 w-auto"
            />
            <span className="ml-[-2px] sm:ml-[-2px] md:ml-[-3px] lg:ml-[-4px]  xl:ml-[-7px]">on.</span>
          </div>
        </div>
        <h2 className="text-lg  text-white font_regular text-center  sm:text-lg md:text-xl lg:text-2xl xl:text-[42.52px]">
          the Countdown begins, it's almost here!
        </h2>
      </div>

      <Image src={whitelogo} alt="logo" className="w-auto absolute bottom-5" />
    </div>
  );
}
