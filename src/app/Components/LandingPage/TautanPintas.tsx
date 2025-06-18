'use client';

import { shortcutLinks } from '../../data/tautanPintasData';
import { motion } from 'framer-motion';
import Image from 'next/image';
import arrowUpRight from '../../assets/icons/arrow-up-right.svg';

const bgColors = ['#FF4900', '#0049FF', '#0538B9'];

export default function TautanPintas() {
  return (
    <section className="py-12 pl-10 overflow-hidden">
      <h2 className="text-8xl font-bold text-center text-[#0538B9] mb-16">Tautan Pintas</h2>
      <div className="w-full max-w-full overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] no-scrollbar">
        <div className="flex gap-7 px-2 flex-nowrap">
          {shortcutLinks.map((link, i) => (
            <motion.a
              key={link.title}
              href={link.href}
              className="relative flex-shrink-0 w-[400px] h-[300px] rounded-[40px] overflow-hidden p-8 pr-10 text-4xl text-white flex items-end font-semibold"
              style={{ backgroundColor: bgColors[i % bgColors.length] }}
              whileHover="hover"
              initial="rest"
              animate="rest"
            >
              <motion.div
                variants={{
                  rest: { opacity: 0, y: 0 },
                  hover: { opacity: 0.2, y: 0 },
                }}
                transition={{ duration: 0.3 }}
                className="absolute top-0 right-0 w-full h-full"
              >
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white rounded-full translate-x-1/2 -translate-y-1/2"></div>
              </motion.div>

              <div className="absolute top-7 right-7">
                <Image src={arrowUpRight} alt="Arrow up right" width={30} height={30} className="text-white" />
              </div>

              <span className="z-10">{link.title}</span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
