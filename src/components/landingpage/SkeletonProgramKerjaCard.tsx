'use client';

export default function SkeletonProgramKerjaCard() {
  return (
    <div
      className={`
    relative overflow-hidden rounded-4xl p-6 flex flex-col justify-between animate-pulse bg-gray-200
    min-w-[250px] sm:min-w-[260px] md:min-w-[280px] lg:min-w-[300px]
    h-[300px] md:h-[500px]
  `}
    >
      {/* Placeholder untuk badge kementerian */}
      <div className="h-6 w-20 md:w-24 bg-gray-300 rounded-full mb-2" />

      <div className="mt-auto z-10 space-y-3">
        {/* Title */}
        <div className="h-6 w-3/4 bg-gray-300 rounded" />
        {/* Description */}
        <div className="h-4 w-4/5 bg-gray-300 rounded" />

        {/* Tombol "Selengkapnya" placeholder */}
        <div className="mt-4 w-full">
          <div className="w-full flex justify-between items-center bg-gray-300 rounded-full px-6 py-2 md:py-3">
            <div className="h-4 w-16 md:w-20 bg-gray-200 rounded" />
            <div className="w-5 h-5 md:w-8 md:h-8 bg-gray-200 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
