// components/GoldenTicket.tsx

import Image, { StaticImageData } from 'next/image';

/**
 * Mendefinisikan properti (props) untuk komponen GoldenTicket.
 * Anda dapat memberikan path gambar lokal (StaticImageData) atau URL string.
 */
interface GoldenTicketProps {
    photo: StaticImageData | string;
    texture: StaticImageData | string;
    name: string;
    faculty: string;
    position: string;
    cabinetTitle: string;
    cabinetName: string;
}

const GoldenTicket: React.FC<GoldenTicketProps> = ({
    photo,
    texture,
    name,
    faculty,
    position,
    cabinetTitle,
    cabinetName,
}) => {
    return (
        // Wrapper utama untuk mengontrol ukuran dan bayangan tiket
        <div className="w-full max-w-[320px] drop-shadow-lg font-sans">

            {/* Bagian Atas (Oranye) */}
            <div className="bg-white rounded-t-2xl p-4 relative overflow-hidden">

                {/* Gambar Tekstur Latar Belakang */}
                {/* Diposisikan secara absolut di belakang konten dengan opasitas rendah */}
                <Image
                    src={texture}
                    alt="Background Texture"
                    layout="fill"
                    objectFit="cover"
                    className="absolute top-0 left-0 opacity-90"
                />

                {/* Kontainer untuk Foto Orang */}
                <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden">
                    {/* Foto Orang */}
                    <Image
                        src={photo}
                        alt={name}
                        objectPosition="center"
                        className='absolute bottom-0 '
                    />

                    {/* Gradient Overlay di atas foto */}
                    {/* Ini menciptakan efek foto yang memudar ke latar belakang oranye di bagian bawah. */}
                    {/* Sesuai permintaan Anda: background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FF4900 71.63%); */}

                </div>
                <div
                    className="absolute inset-0 "
                    style={{ background: 'linear-gradient(180deg, transparent 40%, #FF4900 95%)' }}
                ></div>
                <div
                    className="absolute inset-0 "
                    style={{ background: 'linear-gradient(0deg, transparent 60%, #FF4900 100%)' }}
                ></div>
                {/* Konten Teks di bagian oranye */}
                {/* Teks ditarik ke atas menimpa bagian bawah gambar untuk efek visual yang lebih baik */}
                <div className="relative z-10 text-white text-center mt-[-4rem] ">
                    <p className="font-bold text-xl leading-tight">{name} | {faculty}</p>
                    <p className="text-xs font-light mt-1 px-4">{position}</p>
                </div>
            </div>



            {/* Bagian Bawah (Putih) dengan Lubang */}
            <div
                className="text-center flex flex-col items-center justify-center rounded-b-2xl pt-5 pb-9"
                style={{
                    // Trik CSS untuk membuat lubang setengah lingkaran di bawah
                    // Menggunakan radial-gradient untuk "memotong" area transparan dari latar belakang putih
                    background: `
            radial-gradient(circle at 50% 100%, transparent 24px, white 25px)
          `
                }}
            >
                <p className="text-black font-bold text-xl tracking-wider">{cabinetTitle}</p>
                <p className="text-[#FF4900] font-bold text-xl tracking-wider">{cabinetName}</p>
            </div>
        </div>
    );
};

export default GoldenTicket;