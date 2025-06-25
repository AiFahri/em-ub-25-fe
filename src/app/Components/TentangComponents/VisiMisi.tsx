"use client";

import {
    motion,
    useInView,
    useMotionValueEvent,
    useScroll,
    useTransform,
    MotionValue
} from "framer-motion";
import React, { useRef, useState, FC, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import smile from "../../../../public/Assets/image/tentang/sec1/smile.svg";
import Image from "next/image";

const VisiMisi: FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const visiTitleRef = useRef<HTMLHeadingElement>(null);
    const misiTitleRef = useRef<HTMLHeadingElement>(null);

    const [circularProgress, setCircularProgress] = useState<number>(0);
    const [activeSection, setActiveSection] = useState<'visi' | 'misi'>('visi');
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const isVisiInView = useInView(visiTitleRef, { margin: "-50% 0px -50% 0px" });
    const isMisiInView = useInView(misiTitleRef, { margin: "-50% 0px -50% 0px" });

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            setMousePosition({ x: event.clientX, y: event.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    useEffect(() => {
        if (isMisiInView) {
            setActiveSection('misi');
        } else if (isVisiInView) {
            setActiveSection('visi');
        }
    }, [isVisiInView, isMisiInView]);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });

    const progressValue: MotionValue<number> = useTransform(scrollYProgress, [0, 1], [0, 100]);

    useMotionValueEvent(progressValue, "change", (value) => {
        setCircularProgress(Math.round(value));
    });
    
    const movementRange = 15; 
    const maxPupilMovement = 5; 
    const rawPupilX = (mousePosition.x / (typeof window !== 'undefined' ? window.innerWidth : 1) - 0.5) * movementRange;
    const rawPupilY = (mousePosition.y / (typeof window !== 'undefined' ? window.innerHeight : 1) - 0.5) * movementRange;
    const pupilX = Math.max(-maxPupilMovement, Math.min(maxPupilMovement, rawPupilX));
    const pupilY = Math.max(-maxPupilMovement, Math.min(maxPupilMovement, rawPupilY));

    return (
        <section ref={sectionRef} className="relative w-11/12 mx-auto py-24 bg-white">
            <div className="flex flex-row justify-between gap-x-[5vw]">
                {/* Kolom Kiri - Progress Bar & Smiley */}
                <div className="w-[20%] lg:w-[20%]">
                    <div className="w-24 h-24 lg:w-52 lg:h-52 sticky top-[15vh] z-20">
                        <div className="w-[65%] h-[65%] bg-[#0049FF] rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center p-2">
                            <div className="flex flex-row w-full justify-evenly items-center">
                                <div className="w-[40%] aspect-square bg-white rounded-full flex justify-center items-center relative overflow-hidden">
                                    <motion.div 
                                        className="w-[60%] h-[60%] bg-black rounded-full"
                                        animate={{ x: pupilX, y: pupilY }}
                                        transition={{ type: "spring", stiffness: 150, damping: 20 }}
                                    />
                                </div>
                                <div className="w-[40%] aspect-square bg-white rounded-full flex justify-center items-center relative overflow-hidden">
                                    <motion.div 
                                        className="w-[60%] h-[60%] bg-black rounded-full"
                                        animate={{ x: pupilX, y: pupilY }}
                                        transition={{ type: "spring", stiffness: 150, damping: 20 }}
                                    />
                                </div>
                            </div>
                            <div className="w-[40%] mt-1 lg:mt-2">
                                <Image src={smile} alt="Logo Filosofi" layout="responsive" width={10} height={4} />
                            </div>
                        </div>
                        <CircularProgressbar
                            value={circularProgress}
                            strokeWidth={10}
                            styles={buildStyles({
                                pathColor: `#FF4900`,
                                trailColor: 'rgba(255, 255, 255, 0)',
                                strokeLinecap: 'round',
                            })}
                        />
                    </div>
                </div>

                {/* Kolom Tengah - Judul VISI MISI */}
                <div className="w-[30%]">
                    {/* --- PERBAIKAN GAP --- */}
                    {/* Menggunakan h-screen untuk membuat jarak scroll yang alami */}
                    <motion.h2
                        ref={visiTitleRef}
                        className={`h-[50vh] flex items-center text-5xl lg:text-7xl font-bold transition-colors duration-500 ease-in-out text-transparent bg-clip-text 
                        ${isVisiInView ? "bg-gradient-to-r from-[#FF4900] to-[#FF4900]" : "bg-gradient-to-r from-gray-200 to-gray-200"}`}
                    >
                        VISI.
                    </motion.h2>
                    <motion.h2
                        ref={misiTitleRef}
                        className={` h-[50vh] flex items-center text-5xl lg:text-7xl font-bold transition-colors duration-500 ease-in-out text-transparent bg-clip-text 
                        ${isMisiInView ? "bg-gradient-to-r from-orange-500 to-orange-500" : "bg-gradient-to-r from-gray-200 to-gray-200"}`}
                    >
                        MISI.
                    </motion.h2>
                </div>

                {/* Kolom Kanan - Konten Visi Misi */}
                <div className="w-[45%]">
                    <div className="h-screen sticky top-0 flex items-center">
                        <div className="relative w-full h-48">
                            <motion.div
                                className="absolute inset-0 text-gray-800 text-xl lg:text-2xl leading-relaxed flex items-center"
                                animate={{ opacity: activeSection === 'visi' ? 1 : 0 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                            >
                                <div>
                                    Terwujudnya Eksekutif Mahasiswa Brawijaya sebagai <span className="font-bold">Motor Pembaharuan</span> dan <span className="font-bold">Konektor</span> bagi seluruh <span>Simpul Brawijaya</span>...
                                </div>
                            </motion.div>
                            
                            <motion.div
                                className="absolute inset-0 text-gray-800 text-base lg:text-xl leading-relaxed flex items-center"
                                animate={{ opacity: activeSection === 'misi' ? 1 : 0 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                            >
                                <div>
                                    Advocacy Student Well-Being Oriented, Maximaze Collaborative Governance...
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VisiMisi;