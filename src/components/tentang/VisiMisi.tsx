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
import smile from "/Assets/image/tentang/sec1/smile.svg";
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
                <div className="w-[30%] lg:w-[20%]">
                    <div className="w-24 h-24 lg:w-32 lg:h-32 sticky top-[30vh] sm:top-[15vh] z-20">
                        <div className="w-[60%] h-[60%] bg-[#0049FF] rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center p-2">
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

                <div className="w-[30%]">
                    <motion.h2
                        ref={visiTitleRef}
                        className={`h-[50vh] flex items-center text-[clamp(8vw,8vw,7rem)] font-bold transition-colors duration-500 ease-in-out text-transparent bg-clip-text 
                        ${isVisiInView ? "bg-gradient-to-r from-[#FF4900] to-[#FF4900]" : "bg-gradient-to-r from-gray-200 to-gray-200"}`}
                    >
                        VISI.
                    </motion.h2>
                    <motion.h2
                        ref={misiTitleRef}
                        className={` h-[50vh] flex items-center text-[clamp(8vw,8vw,7rem)] font-bold transition-colors duration-500 ease-in-out text-transparent bg-clip-text 
                        ${isMisiInView ? "bg-gradient-to-r from-orange-500 to-orange-500" : "bg-gradient-to-r from-gray-200 to-gray-200"}`}
                    >
                        MISI.
                    </motion.h2>
                </div>

                <div className="w-[45%]">
                    <div className="h-screen sticky top-0 flex items-center">
                        <div className="relative w-full h-48">
                            <motion.div
                                className="absolute inset-0 text-gray-800 sm:text-[clamp(2vw,2vw,1.5rem)] text-[clamp(3vw,3vw,1.5rem)] leading-relaxed flex items-center"
                                animate={{ opacity: activeSection === 'visi' ? 1 : 0 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                            >
                                <div className="text-[#0049FF]">
                                    Mewujudkan Eksekutif Mahasiswa Universitas Brawijaya 2025 sebagai Simpul Memori yang <span className="font-bold">Inklusif</span> dan <span className="font-bold">Progresif</span> dalam Harmonisasi Cita Karakter Brawijaya
                                </div>
                            </motion.div>

                            <motion.div
                                className="absolute inset-0 text-gray-800 sm:text-[clamp(2vw,2vw,1.5rem)] text-[clamp(3vw,3vw,1.5rem)]  leading-relaxed flex items-center"
                                animate={{ opacity: activeSection === 'misi' ? 1 : 0 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                            >
                                <div className="text-[#0049FF]">
                                    Manifesti Simpul Gerakan <br />
                                    Efektivitas Simpul Gerakan <br />
                                    Mutu Simpul Pengembangan <br />
                                    Optimasi Simpul Pengembangan <br />
                                    Resiliensi Simpul Organisasi  <br />
                                    Inklusi Simpul Pengabdian
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