import Image from 'next/image';
import gemay from '../../public/Assets/icon/comingsoon/gemay.svg';
import o from '../../public/Assets/icon/comingsoon/o.svg';
import whitelogo from '../../public/Assets/logo/whitelogo.svg';
import BgGrid from './Components/ComingsoonComponents/background/BgGrid';

export default function NotFound() {
  return (
    <div className=" relative flex justify-center overflow-hidden items-center flex-col min-h-screen bg-[#001B5E]  ">
      <BgGrid classNameVertical="opacity-40 object-cover translate-x-[-20%] translate-y-[0.5%]  " classNameHorizontal=" opacity-40 object-cover translate-y-[34%] z-50 " speedVertical={1} speedHorizontal={1} />

      <div className="flex flex-row absolute items-center z-50 justify-center font_bold whitespace-nowrap space-x-6 text-[4rem] sm:text-[5rem] md:text-[6rem] lg:text-[8rem] xl:text-[173.32px]">
        <Image src={gemay} alt="coming soon" className="absolute left-0 mb-1  lg:w-16 md:w-12 sm:w-10 w-8 xl:w-auto" />
        <div className="flex flex-row items-center  text-[#FF4900]">
          <span>404</span>
        </div>
        <div className="flex flex-row items-center text-[#0049FF]">
          <span>not</span>
        </div>
        <div className="flex flex-row items-center text-[#0049FF]">
          <span>fou</span>
          <Image src={o} alt="coming soon" className="h-10 sm:h-14 md:h-16 lg:h-[5rem] xl:h-[8rem] xl:mt-6 mt-3 md:mt-4 lg:mt-5 w-auto animate-bounce" />
          <span className="ml-[-2px]">d</span>
        </div>
      </div>

      <div className="flex flex-row items-center justify-center absolute top-5">
        <Image src={whitelogo} alt="white logo" className="w-auto" />
      </div>
    </div>
  );
}
