'use client';

import { motion } from 'framer-motion';

export default function SkeletonBeritaCard({ index }: { index: number }) {
  return (
    <motion.div
      className="min-w-[240px] sm:min-w-[250px] md:min-w-[280px] lg:min-w-[300px] xl:min-w-[440px] 
      p-4 rounded-2xl mx-auto h-full space-y-3 relative animate-pulse"
      style={{ transformOrigin: 'center center' }}
    >
      <div className="relative">
        <div className="w-full h-[200px] lg:h-[320px] bg-gray-200 rounded-4xl relative overflow-hidden" />

        <div className="absolute bottom-0 right-2 p-4 lg:p-6 rounded-full z-20 bg-gray-300">
          <div className="w-[22px] md:w-[20px] h-[22px] md:h-[20px] bg-gray-200 rounded-sm" />
        </div>
      </div>

      <div className="font-[NeueHaasDisplay] space-y-2">
        <div className="h-6 w-3/4 bg-gray-300 rounded" />
        <div className="h-5 w-1/2 bg-gray-300 rounded" />
        <div className="h-5 w-4/5 bg-gray-300 rounded" />
      </div>
    </motion.div>
  );
}
