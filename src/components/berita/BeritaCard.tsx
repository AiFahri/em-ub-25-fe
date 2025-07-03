type BeritaCardProps = {
  title: string;
  date: string;
  description: string;
  color: 'orange' | 'blue';
  imageUrl?: string;
  maxWords?: number;
  onClick?: () => void;
};

function limitWords(str: string, maxWords: number) {
  if (!str) return '';
  const words = str.split(/\s+/);
  if (words.length <= maxWords) return str;
  return words.slice(0, maxWords).join(' ') + '...';
}

function getFullImageUrl(imageUrl?: string) {
  if (!imageUrl) return undefined;
  if (imageUrl.startsWith('http')) return imageUrl;
  return `https://is3.cloudhost.id/em-ub-2025/${imageUrl.replace(/^\/+/, '')}`;
}

export default function BeritaCard({
  title,
  date,
  description,
  color,
  imageUrl,
  maxWords = 25,
  onClick,
}: BeritaCardProps) {
  return (
    <div
      onClick={onClick}
      onKeyDown={e => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      className={`
        relative w-[390px] min-h-[520px] rounded-[52px] border-4
        ${color === 'orange'
          ? 'bg-[#FF4500] border-[#FF4500] hover:border-orange-300'
          : 'bg-[#0062FF] border-[#0062FF] hover:border-blue-300'
        }
        flex flex-col overflow-hidden shadow-lg cursor-pointer
        transition-all duration-200
        hover:shadow-2xl hover:-translate-y-1
        focus:outline-none focus:ring-2 focus:ring-blue-300
        group
      `}
      style={{ margin: '0 10px' }}
    >
      {/* Gambar berita dengan frame inverted radius */}
      <div className="mx-8 mt-8 overflow-visible relative">
        <div className="inverted-radius-big">
          {imageUrl ? (
            <img
              src={getFullImageUrl(imageUrl)}
              alt={title}
              className="object-cover w-full h-full"
              loading="lazy"
              draggable={false}
            />
          ) : (
            <span className="text-gray-400 text-6xl">
              <svg width={82} height={82} fill="none" viewBox="0 0 48 48">
                <rect x="6" y="10" width="36" height="28" rx="3" fill="#EEE"/>
                <path d="M19 24L24 29L31 21" stroke="#bbb" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="17" cy="18" r="2" fill="#bbb"/>
              </svg>
            </span>
          )}
        </div>
        {/* Tombol panah kanan bawah frame (besar, tebal, posisi persis pojok frame) */}
        <div className="absolute" style={{ right: '2px', bottom: '-10px' }}>
          <div className={`
            w-16 h-16 flex items-center justify-center rounded-full border-4 shadow-2xl bg-white
            ${color === 'orange'
              ? 'border-[#FF4500] group-hover:border-orange-300'
              : 'border-[#0062FF] group-hover:border-blue-300'
            }
            transition
          `}>
            <svg width={35} height={35} fill="none" viewBox="0 0 24 24" className={color === 'orange' ? 'text-[#FF4500]' : 'text-[#0062FF]'}>
              <path d="M8.5 15.5L15.5 8.5M15.5 8.5H9.5M15.5 8.5V14.5" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
      {/* Konten */}
      <div className="px-10 pt-20 pb-8 flex flex-col">
        <h3 className="text-2xl font-bold text-white mb-1">{title}</h3>
        <p className="text-base text-white opacity-80 mb-2">{date}</p>
        <p className="text-base text-white">{limitWords(description, maxWords)}</p>
      </div>
    </div>
  );
}
