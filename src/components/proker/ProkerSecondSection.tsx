import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Assets from '@/assets/proker/asset-group.svg';
import Orange from '@/assets/proker/oren.svg';
import { motion, useInView } from 'framer-motion';

const ProkerSecondSection: React.FC = () => {
    // --- TIDAK ADA PERUBAHAN PADA LOGIKA ANIMASI ---
    const [animationPhase, setAnimationPhase] = useState(0);
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, {
        once: true,
        margin: '-100px 0px -100px 0px',
    });

    useEffect(() => {
        if (!isInView) return;

        const timer1 = setTimeout(() => setAnimationPhase(1), 500);
        const timer2 = setTimeout(() => setAnimationPhase(2), 1500);
        const timer3 = setTimeout(() => setAnimationPhase(3), 3000);
        const timer4 = setTimeout(() => setAnimationPhase(4), 4000);
        const timer5 = setTimeout(() => setAnimationPhase(5), 5500);
        const timer6 = setTimeout(() => setAnimationPhase(6), 6000);
        const timer7 = setTimeout(() => setAnimationPhase(7), 6500);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
            clearTimeout(timer4);
            clearTimeout(timer5);
            clearTimeout(timer6);
            clearTimeout(timer7);
        };
        
    }, [isInView]);

    const getOrangeTransform = () => {
        switch (animationPhase) {
            case 0:
                return 'translate-x-[2000px] -translate-y-[40%]';
            case 1:
            case 2:
                return 'translate-x-[500px] -translate-y-[40%]';
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            default:
                return 'translate-x-[30%] -translate-y-[40%]';
        }
    };

    const getOrangeAnimation = () => {
        return animationPhase === 2 || animationPhase === 4 ? 'animate-shake' : '';
    };
    // --- AKHIR DARI LOGIKA ANIMASI ---

    return (
        <section
            ref={sectionRef}
            // Menggunakan min-h-screen untuk keterbacaan yang lebih baik
            className="relative w-full flex items-center justify-center min-h-screen py-8 md:py-16 overflow-hidden"
        >
            <style jsx>{`
                @keyframes shake {
                    0%, 100% { transform: rotate(0deg); }
                    25% { transform: rotate(-10deg); }
                    75% { transform: rotate(10deg); }
                }
                .animate-shake {
                    animation: shake 0.5s ease-in-out infinite;
                }
            `}</style>

            {/* Jarak (gap) ditingkatkan untuk layar besar */}
            <div className="flex items-center justify-center gap-6 md:gap-10 lg:gap-16">

                {/* Kiri: Gambar (Ukuran diperbesar secara signifikan) */}
                <div className="relative w-40 h-40 md:w-56 md:h-56 lg:w-80 lg:h-80">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
                        <Image
                            src={Assets}
                            alt="Background Asset Group"
                            layout="responsive"
                            width={200}
                            height={200}
                        />
                    </div>
                    <div
                        className={`absolute top-1/2 left-1/2 w-[45%] transition-transform duration-1000 ease-in-out ${getOrangeTransform()} ${getOrangeAnimation()}`}
                    >
                        <Image
                            src={Orange}
                            alt="Orange Asset"
                            layout="responsive"
                            width={90}
                            height={90}
                        />
                    </div>
                </div>

                {/* Kanan: Teks (Ukuran font diperbesar secara signifikan) */}
                <div className="relative z-10 flex flex-col items-start">
                    <motion.span
                        initial={{ scaleX: 0 }}
                        animate={animationPhase >= 5 ? { scaleX: 1 } : {}}
                        transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="origin-left text-[#0057FF] text-3xl md:text-5xl lg:text-7xl font-bold leading-tight"
                    >
                        Berbagai program
                    </motion.span>

                    <motion.span
                        initial={{ scaleX: 0 }}
                        animate={animationPhase >= 6 ? { scaleX: 1 } : {}}
                        transition={{ delay: 1.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="origin-left text-[#0057FF] text-3xl md:text-5xl lg:text-7xl font-bold leading-tight"
                    >
                        kerja menarik <span className="text-[#8CB6FF]">sudah</span>
                    </motion.span>

                    <motion.span
                        initial={{ scaleX: 0 }}
                        animate={animationPhase >= 7 ? { scaleX: 1 } : {}}
                        transition={{ delay: 2.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="origin-left text-[#8CB6FF] text-3xl md:text-5xl lg:text-7xl font-bold leading-tight"
                    >
                        tersedia, Braw!
                    </motion.span>
                </div>
            </div>
        </section>
    );
};

export default ProkerSecondSection;