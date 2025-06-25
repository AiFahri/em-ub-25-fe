"use client";

import Image from "next/image";
import Tickets from "../Components/TentangComponents/Tickets";
import TicketShapes from "../Components/TentangComponents/TicketShapes";
import o from "../../../public/Assets/image/tentang/sec8/O.svg";
import presiden from "../../../public/Assets/image/tentang/sec8/presiden.svg";
import wapres from "../../../public/Assets/image/tentang/sec8/wapres.svg";

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
            <TicketShapes />

            <div className="flex flex-row w-11/12 justify-between items-center mx-auto aspect-[1920/1000]">
                <div className="flex flex-col items-end text-[5.5vw] text-[#FF4900] leading-[6vw] font_bold">
                    
                    <div className="relative flex flex-row items-center text-[7vw] text-outline-biru">
                        <p className="text-[#0049FF]">G</p>
                        <div className="relative">
                        <p className="text-[#FF4900] ">o</p>
                          <Image
                            src={o}
                            alt="Gotcha Face"
                            className="w-[60%]  absolute left-1/2 -translate-x-1/2 translate-y-2 top-[40%]"
                        />
                        </div>
                        <p className="text-[#0049FF]">tcha</p>
                        <p className="text-[#FF4900] [-webkit-text-stroke:2px_#0049FF]">!</p>
                      
                    </div>
                    
                    <p className="text-[#FDA480]">Kamu</p>
                    <p className="text-[#FDA480]">Memegang</p>
                    <p>Golden Ticket</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-8 lg:gap-12">
                    {ticketData.map((ticket, index) => (
                        <Tickets
                            key={index}
                            photo={ticket.photo}
                            name={ticket.name}
                            faculty={ticket.faculty}
                            title={ticket.title}
                            cabinetName={ticket.cabinetName}
                            kabinet={ticket.kabinet}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}