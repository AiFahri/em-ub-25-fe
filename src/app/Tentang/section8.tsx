"use client";

import Image from "next/image";
// Pastikan path ini benar sesuai struktur folder Anda
import GoldenTicket from "../Components/TentangComponents/Tickets";
import o from "../../../public/Assets/image/tentang/sec8/O.svg";
import presiden from "../../../public/Assets/image/tentang/sec8/presiden.svg";
import wapres from "../../../public/Assets/image/tentang/sec8/wapres.svg";
import orange_texture from "../../../public/Assets/image/tentang/sec8/orange_texture.svg";
import blue_texture from "../../../public/Assets/image/tentang/sec8/blue_texture.svg";

// Data untuk setiap tiket
const ticketData = [
    {
        photo: presiden,
        name: "Satria Naufal",
        faculty: "FH 21",
        title: "Presiden EM UB Kabinet Simpul Memori",
        cabinetName: "KABINET ",
        kabinet: "SIMPUL MEMORI"
    },
    {
        photo: wapres,
        name: "Alya Nabila",
        faculty: "FISIP 22",
        title: "Wakil Presiden EM UB Kabinet Simpul Memori",
        cabinetName: "KABINET ",
        kabinet: "SIMPUL MEMORI"
    }
];

export default function Section8() {
    return (
        <div className="w-full">
            <div className="flex flex-row w-11/12 justify-between items-center gap-x-[2vw] mx-auto aspect-[1920/1000]">
                <div className="flex flex-col items-end text-[5.5vw] text-[#FF4900] leading-[6vw] font_bold">
                    
                    <div className="relative flex flex-row items-center text-[7vw] text-outline-biru">
                        <p className="text-[#0049FF]">G</p>
                        <div className="relative">
                        <p className="text-[#FF4900] ">o</p>
                          <Image
                            src={o}
                            alt="Gotcha Face"
                            className="w-[60%]  absolute right-[20%] top-[50%]"
                        />
                        </div>
                        <p className="text-[#0049FF]">tcha</p>
                        <p className="text-[#FF4900] text-outline-orange">!</p>
                      
                    </div>
                    
                    <p className="text-[#FDA480]">Kamu</p>
                    <p className="text-[#FDA480]">Memegang</p>
                    <p className="text-nowrap">Golden Ticket</p>
                </div>

                <div className="flex flex-row gap-8 lg:gap-12">
                    {ticketData.map((ticket, index) => (
                        <GoldenTicket
                            key={index}
                            
                            // Mengirimkan props yang sesuai dengan kebutuhan GoldenTicket
                            texture={orange_texture}
                            photo={ticket.photo}
                            name={ticket.name}
                            faculty={ticket.faculty}
                            position={ticket.title}
                            cabinetTitle={ticket.cabinetName}
                            cabinetName={ticket.kabinet}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}