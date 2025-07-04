type BeritaCardSideProps = {
  title: string;
  category?: string;
  ministryName?: string;
  color: 'orange' | 'blue';
};

const BeritaCardSide = ({ title, category, ministryName, color }: BeritaCardSideProps) => {
  const bgColor = color === 'blue' ? 'bg-[#003EA7]' : 'bg-[#FF4500]';
  
  return (
    <div className={`relative ${bgColor} rounded-3xl p-6 text-white overflow-hidden shadow-md`}>
      {/* Ornamen background */}
      <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full" />
      <div className="absolute right-4 -bottom-8 w-20 h-20 bg-white/5 rounded-full" />

      <div className="relative z-10">
        <div className="flex justify-end mb-2">
          {category && (
            <span className="text-xs font-semibold bg-white/20 px-3 py-1 rounded-full">
              {category}
            </span>
          )}
        </div>
        <h4 className="font-bold text-lg leading-tight mb-3 h-14 overflow-hidden">
          {title}
        </h4>
        {ministryName && (
          <span className="text-sm font-medium bg-white/90 text-blue-900 px-4 py-1 rounded-lg">
            {ministryName}
          </span>
        )}
      </div>
    </div>
  );
};

export default BeritaCardSide;