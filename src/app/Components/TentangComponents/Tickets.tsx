// File: components/Tickets.tsx (Struktur Baru Sesuai Target)

import Image, { StaticImageData } from 'next/image';
import styles from './GoldenTicket.module.css'; // Ganti nama file CSS jika perlu
import bg from "../../../../public/Assets/image/tentang/sec8/bg.svg"; // Impor background pattern

interface GoldenTicketProps {
    photo: StaticImageData;
    name: string;
    faculty: string;
    title: string;
    cabinetName: string;
    kabinet: string;
}

const Tickets: React.FC<GoldenTicketProps> = ({ photo, name, faculty, title, cabinetName, kabinet }) => {
    return (
        // Container Utama dengan Shadow
        <div className="w-[20vw]  drop-shadow-lg">
            
            {/* BAGIAN ATAS (ORANYE) - WADAH UTAMA */}
            <div className="bg-[#FF4900] rounded-2xl p-5 relative overflow-hidden">
                
                {/* 1. LAYER PALING BAWAH: PATTERN BACKGROUND */}
                <Image 
                    src={bg} 
                    alt="background pattern" 
                    layout="fill" 
                    objectFit="cover" 
                    className="absolute top-0 left-0 opacity-20"
                />

                {/* WADAH FOTO & GRADIEN */}
                <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden">
                    {/* 2. LAYER TENGAH: FOTO UTAMA */}
                    <Image 
                        src={photo} 
                        alt={name} 
                        layout="fill" 
                        objectFit="cover" 
                    />
                    
                    {/* 3. LAYER PALING ATAS: GRADIEN FADE */}
                    <div className="absolute bottom-0 h-1/2 w-full bg-gradient-to-t from-[#FF4900] to-transparent"></div>
                </div>

                {/* WADAH TEKS (DI BAWAH FOTO, DI ATAS GRADIEN) */}
                <div className="relative z-10 text-white mt-[-6vw] sm:mt-[-5vw] lg:mt-[-4vw] pt-4 text-center">
                    <p className="font-bold text-[1.2rem] leading-tight mt-1">{name} | {faculty}</p>
                    <p className="text-[0.6rem] font-light mt-1">{title}</p>
                </div>
            </div>

            {/* BAGIAN SOBEKAN */}
            <div className={styles.rip}></div>

            {/* BAGIAN BAWAH (PUTIH) */}
            <div className="bg-white rounded-2xl py-5 text-center flex flex-col">
                <p className="text-black font-bold text-xl tracking-wider">{cabinetName}</p>
                <p className="text-[#FF4900] font-bold text-xl tracking-wider">{kabinet}</p>
            </div>

        </div>
    );
};

export default Tickets;