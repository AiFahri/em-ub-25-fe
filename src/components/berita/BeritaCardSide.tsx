type BeritaCardSideProps = {
  title: string;
  category?: string;
  ministryName?: string;
  color: 'orange' | 'blue';
};

const BeritaCardSide = ({ title, category, ministryName, color }: BeritaCardSideProps) => {
  const bgColor = color === 'blue' ? 'bg-[#003EA7]' : 'bg-[#FF4500]';
  
  return (
    <div className={`relative ${bgColor} rounded-3xl p-6 text-white w-full overflow-hidden shadow-md`}>
      
      <div className="absolute -right-8 -bottom-8 w-[15vw] h-[20vw] border-white/10 border-32 rotate-[15deg] rounded-full" />
      <div className="absolute right-0 -bottom-10 w-[13vw] h-[13vw] border-5 border-white/5 rounded-full" />

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
          <span className="text-sm font-medium bg-white text-blue-900 text-wrap inline-block px-1 py-1  w-fit rounded-lg">
            {ministryName}
          </span>
        )}
      </div>
    </div>
  );
};

export default BeritaCardSide;