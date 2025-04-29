import Image from "next/image";
import confetti from "../../../../public/Assets/image/comingsoon/confetti.svg";
import bg from "../../../../public/Assets/image/comingsoon/bg_text.svg";
import mori from "../../../../public/Assets/logo/mori.svg";
import whitelogo from "../../../../public/Assets/logo/whitelogo.svg";
import o from "../../../../public/Assets/icon/comingsoon/o2.svg";
import { motion } from "framer-motion";

export default function Win2() {
  return (
    <div className="absolute inset-0 flex justify-center items-center flex-col z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{
          scale: [0.8, 1.4, 1, 0.3, 0],
          rotate: [0, -5, 5, 0],
          x: [0, 10, -10, 0, 120],
          y: [0, -10, 10, 0, 30],
          opacity: [0, 1, 1, 0.8, 0],
        }}
        transition={{
          duration: 3,
          ease: "easeInOut",
        }}
        className="absolute"
      >
        <Image
          src={confetti}
          alt="confetti animation"
          className="w-full h-full"
        />
      </motion.div>

      <div className="flex flex-col  items-center justify-center space-y-0">
        <div className="flex flex-row font_bold py-0  text-[4rem] sm:text-[5rem] md:text-[6rem] lg:text-[8rem] xl:text-[10rem] tracking-normal relative z-20">
          <Image
            src={o}
            alt="comingsoon"
            className="absolute translate-y-[290%] md:translate-x-[450%]  translate-x-[485%] md:translate-y-[270%]  xl:w-[67px] lg:w-[55px] md:w-[40px] sm:w-[35px] w-[25px] z-30 "
          />
          <span className="text-[#0049FF]">Vict</span>
          <span className="text-[#FF4900]">o</span>
          <span className="text-[#0049FF]">ry!</span>
        </div>

        <div className="relative flex flex-row items-center justify-center ">
          <Image
            src={bg}
            alt="coming soon"
            className="xl:w-[862px] lg:w-[700px] md:w-[500px] sm:w-[400px] w-[200px] "
          />
          <div className="absolute inset-0 z-10 flex items-center justify-center ">
            <p className="font_medium text-white tracking-tight xl:text-[42px] lg:text-[36px] md:text-[24px] text-[10px] relative z-20 text-nowrap">
              You've earned a peek into our 2024 archives.
            </p>
          </div>
        </div>
        <Image
          src={mori}
          alt="coming soon"
          className="absolute z-10 xl:translate-y-[100px] md:translate-y-[70px] sm:translate-y-[60px] translate-x-[140px] translate-y-[60%] xl:translate-x-[550px] lg:translate-x-[460px] md:translate-x-[310px] sm:translate-x-[260px]  xl:w-[260px] lg:w-[220px] md:w-[130px] sm:w-[140px] w-[80px]"
        />
      </div>
      <div className="flex flex-row items-center justify-center absolute top-5">
        <Image src={whitelogo} alt="white logo" className="w-auto" />
      </div>
    </div>
  );
}
