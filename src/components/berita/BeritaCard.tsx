import Image from "next/image";

type BeritaCardProps = {
  title: string;
  date: string;
  description: string;
  color: "orange" | "blue";
  imageUrl?: string;
  ministryName?: string;
  onClick?: () => void;
};

function getFullImageUrl(imageUrl?: string) {
  if (!imageUrl) return undefined;
  if (imageUrl.startsWith("http")) return imageUrl;
  return `https://is3.cloudhost.id/emub/${imageUrl.replace(/^\/+/, "")}`;
}

function truncateWords(text: string, maxWords: number = 30): string {
  const words = text.split(" ");
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(" ") + "...";
}

export default function BeritaCard({
  title,
  date,
  description,
  color,
  imageUrl,
  ministryName,
  onClick,
}: BeritaCardProps) {
  return (
    <div
      onClick={onClick}
      onKeyDown={(e) => {
        if (onClick && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick();
        }
      }}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      className={`
        relative w-full rounded-[40px] /* ✅ Sudut lebih standar */
        ${color === "orange" ? "bg-[#FF4500]" : "bg-[#0062FF]"}
        flex flex-col shadow-lg cursor-pointer
        transition-all duration-300
        hover:shadow-xl hover:scale-105
        outline-none w-full
        h-[520px] md:h-[560px] lg:h-[600px] max-w-[550px] mx-auto
      `}
    >
      {/* Gambar berita */}
      <div className="mx-3 mt-6  md:mt-8 overflow-visible relative">
        {" "}
        {/* ✅ Padding responsif */}
        <div className="rounded-[30px] bg-white/20 items-center flex flex-col justify-center  inverted-radius-big ">
          {imageUrl ? (
            <Image
              src={getFullImageUrl(imageUrl) || "/placeholder-image.jpg"}
              alt={title}
              width={500}
              height={300}
              className="object-cover w-full h-full "
              loading="lazy"
              draggable={false}
            />
          ) : (
            <span className="text-white/50 flex items-center justify-center h-full">
              <svg width="60" height="60" fill="none" viewBox="0 0 48 48">
                <rect
                  x="6"
                  y="10"
                  width="36"
                  height="28"
                  rx="3"
                  fill="currentColor"
                  opacity="0.2"
                />
                <path
                  d="M19 24L24 29L31 21"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.5"
                />
                <circle
                  cx="17"
                  cy="18"
                  r="2"
                  fill="currentColor"
                  opacity="0.5"
                />
              </svg>
            </span>
          )}
        </div>
        <div className="absolute bottom-5 right-0  translate-y-1/2">
          <div
            className={`
           w-[10vw] h-[10vw] sm:w-[7vw] sm:h-[7vw] md:w-[6vw] md:h-[6vw] lg:w-[4vw] lg:h-[4vw] flex items-center justify-center rounded-full border-4 shadow-lg bg-white 
            ${color === "orange" ? "border-[#FF4500]" : "border-[#0062FF]"}
          `}
          >
            <svg
              width="28"
              height="28"
              fill="none"
              viewBox="0 0 24 24"
              className={
                color === "orange" ? "text-[#FF4500]" : "text-[#0062FF]"
              }
            >
              <path
                d="M8.5 15.5L15.5 8.5M15.5 8.5H9.5M15.5 8.5V14.5"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="px-6 pt-8 pb-6 md:px-8 md:pt-8 md:pb-8 flex flex-col flex-grow min-h-0">
        <h3 className="text-xl md:text-2xl font-bold text-white mb-1 flex-shrink-0">
          {title}
        </h3>
        <p className="text-sm md:text-base text-white opacity-80 mb-4 flex-shrink-0">
          {date}
        </p>
        <p className="text-sm md:text-base text-white opacity-80 mb-4 flex-shrink-0">
          {ministryName}
        </p>
        <p className="text-sm md:text-base text-white flex-grow overflow-hidden">
          {" "}
          {/* ✅ Removed scroll, added overflow-hidden */}
          {truncateWords(description, 70)} {/* ✅ Limit to 25 words */}
        </p>
      </div>
    </div>
  );
}
