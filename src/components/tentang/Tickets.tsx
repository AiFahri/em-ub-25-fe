

import Image, { StaticImageData } from "next/image";

interface GoldenTicketProps {
  photo: StaticImageData | string;
  texture: StaticImageData | string;
  name: string;
  faculty: string;
  position: string;
  cabinetTitle: string;
  cabinetName: string;
}

const GoldenTicket: React.FC<GoldenTicketProps> = ({
  photo,
  texture,
  name,
  faculty,
  position,
  cabinetTitle,
  cabinetName,
}) => {
  const cutoutRadius = "2.5vw";

  const createCutout = (position: string) =>
    `radial-gradient(circle ${cutoutRadius} at ${position}, white 100%, transparent 101%)`;

  const topPartStyle: React.CSSProperties = {
    backgroundColor: "white",
    maskImage: `
            linear-gradient(black, black),
            ${createCutout("0% 0%")},
            ${createCutout("100% 0%")},
            ${createCutout("0% 100%")},
            ${createCutout("100% 100%")}
        `,
    WebkitMaskComposite: "xor",
    maskComposite: "exclude",
  };

  const bottomPartStyle: React.CSSProperties = {
    backgroundColor: "white",
    maskImage: `
            linear-gradient(black, black),
            ${createCutout("0% 0%")},
            ${createCutout("100% 0%")},
            ${createCutout("50% 100%")}
        `,
    WebkitMaskComposite: "xor",
    maskComposite: "exclude",
  };

  return (
    <div className="w-[23vw] mx-auto drop-shadow-lg font-sans">
      <div className="relative pt-[6vw]" style={topPartStyle}>
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(0deg, rgba(255,73,0,0) 60%, #FF4900 100%)",
          }}
        ></div>
        <Image
          src={texture}
          alt="Background Texture"
          layout="fill"
          objectFit="cover"
          className="absolute top-0 left-0 opacity-90 z-0"
        />

        <div className="relative w-full aspect-square mt-[-3vw]">
          <Image
            src={photo}
            alt={name}
            layout="fill"
            objectFit="contain"
            objectPosition="center bottom"
            className="z-10"
          />

          <div
            className="absolute inset-0 z-20"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,73,0,0) 50%, #FF4900 95%)",
            }}
          ></div>
        </div>

        <div className="relative z-30 text-white text-center pb-4 -mt-[8vw]">
          <p className="font-bold text-[1.5vw] leading-tight text-nowrap">
            {name} | {faculty}
          </p>
          <p className="text-[1vw] font-light mt-1 px-4">{position}</p>
        </div>
      </div>

      <div
        className="text-center flex flex-col items-center justify-center py-[4vw] rounded-[2vw] -mt-px"
        style={bottomPartStyle}
      >
        <p className="text-black font-bold text-[2.5vw] tracking-wider">
          {cabinetTitle}
        </p>
        <p className="text-[#FF4900] font-bold text-[2.5vw] text-nowrap tracking-wider">
          {cabinetName}
        </p>
      </div>
    </div>
  );
};

export default GoldenTicket;