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
export default function Section3() {
  return (
    <div className="relative w-full aspect-[1900/950] mt-[5vw] ">
      {/* filosofi logo */}
      <div className="flex flex-row justify-between items-center w-11/12 mx-auto aspect-[1900/1000] z-20">
        <div className="flex flex-col items-center w-7/12 justify-center aspect-[856/176] z-20 ">
          <div className="flex flex-row items-center relative  ">
            <h1 className="text-[#0049FF] text-[clamp(3rem,7vw,8rem)] font_bold">Filosofi L</h1>
            <span className="bg-[#0049FF] w-[4.3vw] h-[40%] rounded-full mt-[1vw] "></span>

            <Image
              src={smile}
              alt="Logo Filosofi"
              className="absolute right-[20.4%] top-[40%] w-[9%] "
            />
            <span className="text-[#0049FF] text-[clamp(3rem,7vw,8rem)] font_bold">go</span>
          </div>

          <h1 className="text-[#0049FF] text-[clamp(1rem,2vw,3rem)] font_bold border-[#0049FF] border-[0.5vw] py-[0.3vw] px-[3vw] rounded-[10vw] ">
            Bentuk Simpul Infinity
          </h1>

          <p className="text-[#0049FF] text-[clamp(1rem,1.5vw,2rem)] font_medium bg-[#BACEFF] rounded-[2vw] p-[2.3vw] mt-[2.5vw]">
            Melambangkan kesinambungan, keterhubungan, dan kekekalan memori. Hal
            ini digambarkan sebagaimana Kabinet Simpul Memori dapat berhubung
            dengan ingatan atau sejarah melalui kerja sama dan kolaborasi yang
            erat, serta wadah untuk bertukar pikiran.
          </p>

          <div className="flex flex-row items-center  gap-x-[3vw] bg-[#BACEFF] rounded-[2vw] p-[2.3vw] mt-[3vw] ">
            <div className="flex flex-col items-center ">
              <h1 className="bg-[#0049FF] w-[4vw] h-[4vw] rounded-full  " />
              <p className="text-[#0049FF] text-[clamp(1rem,2vw,3rem)] font_bold w-[6vw] text-center leading-[2.5vw]">
                Warna Biru
              </p>
            </div>

            <div className="flex flex-col items-center">
              <h1 className="bg-gradient-to-b from-[#3488CF] to-[#002C99] w-[4vw] h-[4vw] rounded-full " />
              <p className="text-[#0049FF] text-[clamp(1rem,2vw,3rem)] font_bold w-[8vw] text-center leading-[2.5vw]">
                Warna Gradiasi
              </p>
            </div>

            <p className="text-[#0049FF] text-[clamp(1rem,1vw,2rem)]  font_medium bg-[#BACEFF] rounded-[2vw]  ">
              Melambangkan stabilitas, kepercayaan, dan profesionalisme bahwa
              kabinet ini memiliki arah dan visi yang jelas. Gradasi warna biru
              memberikan kesan dinamis dan modern yang digambarkan melalui
              Kabinet Simpul Memori sebagai transformasi organisasi modern.
            </p>
          </div>
        </div>

      <div className="flex flex-col w-5/12 z-20">
        <div className="flex flex-row justify-end ml-[4vw]">
          <div className="flex flex-col items-center">
          <h1 className="text-white text-[clamp(1rem,1.2vw,2rem)] font_medium mt-[5vw] bg-[#0049FF] px-[2vw] py-[0.5vw] text-center rounded-[2vw]">Sentuh logo kami!</h1>
          <Image
          src={text}
          alt="Mori Section 3"
          className="place-items-end w-[95%] mt-[1vw]"/>
          </div>
          <Image
            src={mori}
            alt="Mori Section 3"
            className="place-items-end w-[60%]"
            
            />
        </div>

        <Image
          src={logo}
          alt="Logo Filosofi"
          className="w-[80%] mx-auto"
        />
        </div>
      </div>

      <Image
        src={right}
        alt="Logo Filosofi"
        className="absolute bottom-[10%] right-[5%] w-[10%] "
      />

      <Image
        src={half_right}
        alt="Logo Filosofi"
        className="absolute bottom-[40%] right-[30%] w-[20%] "
      />

      <Image
        src={bottom}
        alt="Logo Filosofi"
        className="absolute bottom-[0%] right-[50%] w-[15%] "
      />
      
      <Image
        src={left}
        alt="Logo Filosofi"
        className="absolute bottom-[20%] left-[10%] w-[15%] "
      />
    </div>
  );
}
