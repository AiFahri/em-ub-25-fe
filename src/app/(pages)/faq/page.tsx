import Image from "next/image";
import bg from "@/assets/faq/background/bg.svg";
import find from "@/assets/faq/icon/find.svg";
// Kita butuh ikon panah ke bawah untuk dropdown, asumsikan Anda punya asetnya
import arrowDown from "@/assets/faq/icon/arrow-down.svg"; 

export default function FAQPage() {
  const pageStyle = {
    background: 'linear-gradient(243.8deg, #FFFFFF 0%, #BACEFF 49.35%, #FFFFFF 100.63%)'
  };

  return (
    <div className="w-full">
      <div className="inset-0 fixed -z-10" style={pageStyle} id="faq">
        <Image src={bg} alt="Background Simpul Memori" className="w-full" />
      </div>

      {/* container utama */}
      <div className="mt-[2vw] items-center min-h-screen flex gap-y-[3vw] flex-col relative">
        <h1 className="text-[#0538B9] font-bold text-[clamp(5vw,5vw,5rem)]">Pertanyaan & Jawaban</h1>

        {/* Kontainer untuk Input dan Dropdown */}
        <div className="flex flex-row items-center justify-center gap-x-4">

          {/* 1. GRUP INPUT PENCARIAN */}
          <div className="relative flex items-center w-[45vw]">
            <input 
              placeholder="Cari apa yang ingin kamu tanyakan" 
              className="w-full bg-white rounded-full text-[#0538B9] placeholder:text-[#0538B9]/60 font-medium tracking-tight py-[0.8vw] pl-[2vw] pr-[4.5vw] text-[clamp(1vw,1.2vw,1.2rem)] focus:outline-none focus:ring-2 focus:ring-[#BACEFF] transition-all duration-300"
            />
            {/* Ikon di dalam input */}
            <Image 
              src={find} 
              alt="Cari"
              className="absolute right-[1.5vw] w-[1.8vw] h-auto"
            />
          </div>

          {/* 2. GRUP DROPDOWN KUSTOM */}
          <div className="relative flex items-center w-[15vw]">
            {/* Lapisan Visual (yang dilihat pengguna) */}
            <div className="w-full flex justify-between items-center bg-white rounded-full text-[#0538B9] font-medium py-[0.8vw] px-[2vw] text-[clamp(1vw,1.2vw,1.2rem)] border-2 border-[#BACEFF]">
              <span>Semua</span>
              <Image 
                src={arrowDown} // Gunakan ikon panah ke bawah Anda
                alt="Pilih Kategori"
                className="w-[1.2vw] h-auto"
              />
            </div>
            {/* Elemen <select> asli yang disembunyikan untuk fungsionalitas */}
            <select 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              aria-label="Pilih Kategori"
            >
              <option>Semua</option>
              <option>Tentang Pendaftaran</option>
              <option>Tentang Acara</option>
              <option>Lainnya</option>
            </select>
          </div>

        </div>
      </div>
    </div>
  );
}