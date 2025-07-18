'use client';

export default function SkeletonFormPendaftaran() {
  return (
    <div className="min-h-screen bg-[#0049FF] px-4 sm:px-6 md:px-10 py-10 flex justify-center animate-pulse">
      <div className="w-full md:max-w-4xl lg:max-w-7xl flex flex-col gap-y-10">
        <div className="bg-[#E6EDFF] mt-24 mb-5 rounded-[30px] shadow-lg w-full flex flex-col md:flex-row gap-y-5 overflow-hidden">
          <div className="w-full md:w-4/7 py-10 flex items-center justify-center px-6 md:px-10 lg:px-20">
            <div className="w-full h-64 bg-gray-300 rounded-xl" />
          </div>

          <div className="w-full md:w-3/7 py-10 px-6 sm:px-10 md:px-10 lg:px-20 bg-white z-20 rounded-t-[30px] md:rounded-tr-[0] md:rounded-bl-[30px] flex flex-col gap-4">
            <div className="h-8 w-3/4 bg-gray-300 rounded" />
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-4 w-5/6 bg-gray-200 rounded" />
            <div className="h-4 w-2/3 bg-gray-200 rounded" />
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-4 w-1/2 bg-gray-200 rounded" />
          </div>
        </div>

        <div className="bg-white rounded-[30px] shadow-lg w-full px-6 md:px-10 lg:px-20 py-10 space-y-6">
          <div className="h-8 w-1/2 mx-auto bg-gray-300 rounded" />

          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-16 w-full bg-gray-200 rounded-xl" />
          ))}

          <div className="pt-6 flex justify-center">
            <div className="px-10 py-3 rounded-2xl bg-gray-300 text-transparent">Daftar</div>
          </div>
        </div>
      </div>
    </div>
  );
}
