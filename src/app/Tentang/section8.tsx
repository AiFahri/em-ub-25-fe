import Image from "next/image";
import Tickets from "../Components/TentangComponents/Tickets";
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
        title: "Presiden EM UB Kabinet Simpul Memori",
        cabinetName: "KABINET ",
        kabinet: "SIMPUL MEMORI"
    }
];
export default function Section8() {
    return (
        <div className="flex flex-row w-11/12 justify-between items-center mx-auto aspect-[1920/1000]">
            <div className="flex flex-col items-end text-[5.5vw] text-[#FF4900] leading-[6vw] font_bold">
                <div className="flex flex-row drop-shadow-sm text-[7vw] text-outline-biru">
                    <p className="text-[#0049FF]">G</p>
                    <p className="text-[#FF4900]">O</p>
                    <p className="text-[#0049FF]">TCHA</p>
                    <p className="text-[#FF4900] text-outline-orange">!</p>
                    <Image
                        src={o}
                        alt="Section 8"
                        className="w-[13%] absolute left-[18.5%] bottom-[25%]"
                    />
                </div>
                <p className="text-[#FDA480]">Kamu</p>
                <p className="text-[#FDA480]">Memegang</p>
                <p>Golden Ticket</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-8 lg:gap-12 order-1 lg:order-2">
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
    );
}