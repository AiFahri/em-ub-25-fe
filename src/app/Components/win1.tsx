import Image from 'next/image';
import light from '../../../public/Assets/image/light.svg';
import bg from '../../../public/Assets/image/bg_text.svg';
import mori from '../../../public/Assets/logo/mori.svg';
import whitelogo from '../../../public/Assets/logo/whitelogo.svg';
import o from '../../../public/Assets/icon/o2.svg';
import { motion } from 'framer-motion';

export default function Win1() {
  return (
    <div className="absolute inset-0 flex justify-center items-center flex-colz-50">
      <motion.div className="absolute w-full h-full sm:h-11/12" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}>
        <Image src={light} alt="spinning light" className="h-full w-full brightness-150 blur-sm saturate-150 opacity-90 animate-pulse" />
      </motion.div>

      <div className="flex flex-col  items-center justify-center space-y-0 z-20  ">
        <div className="flex flex-row font_bold py-0  text-[4rem] sm:text-[5rem] md:text-[6rem] lg:text-[8rem] xl:text-[10rem] tracking-normal relative z-20">
          <Image src={o} alt="comingsoon" className="absolute translate-y-[290%] md:translate-x-[450%] md:translate-y-[270%]  translate-x-[485%]  xl:w-[67px] lg:w-[55px] md:w-[40px] sm:w-[35px] w-[25px] z-30 " />
          <span className="text-[#0049FF]">Vict</span>
          <span className="text-[#FF4900]">o</span>
          <span className="text-[#0049FF]">ry!</span>
        </div>

        <div className="relative flex flex-row items-center justify-center ">
          <Image src={bg} alt="coming soon" className="xl:w-[862px] lg:w-[700px] md:w-[500px] sm:w-[400px] w-[200px] " />
          <div className="absolute inset-0 z-10 flex items-center justify-center ">
            <p className="font_medium text-white tracking-tight xl:text-[42px] lg:text-[36px] md:text-[24px] text-[10px] relative z-20 text-nowrap">You've earned a peek into our 2024 archives.</p>
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
