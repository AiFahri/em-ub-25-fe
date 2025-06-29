// src/app/(pages)/faq/page.tsx

import Image from "next/image";
import bg from "@/assets/faq/background/bg.svg";
import find from "@/assets/faq/icon/find.svg";
import arrowDown from "@/assets/faq/icon/arrow-down.svg"; 
import QuestionPage from "@/components/faq/question";

const faqData = [
    { id: 1, question: "Pertanyaan 01", answer: "Jawaban untuk pertanyaan pertama ada di sini." },
    { id: 2, question: "Pertanyaan 02", answer: "Jawaban untuk pertanyaan kedua ada di sini." },
    { id: 3, question: "Pertanyaan 03", answer: "Jawaban untuk pertanyaan ketiga ada di sini." },
];

export default function FAQPage() {
  const pageStyle = {
    background: 'linear-gradient(243.8deg, #FFFFFF 0%, #BACEFF 49.35%, #FFFFFF 100.63%)'
  };

  return (
    <div className="w-full relative aspect-[1920/1791]">
      <div className="inset-0 fixed -z-10" style={pageStyle} id="faq">
        <Image src={bg} alt="Background Simpul Memori" objectFit="cover" layout="fill" className="w-full" />
      </div>

      <div className="mt-[2vw] lg:w-9/12 w-10/12 mx-auto  items-center min-h-screen flex gap-y-[3vw] flex-col relative pb-20">
        <h1 className="text-[#0538B9] font-bold text-[clamp(5vw,5vw,5rem)]">Pertanyaan & Jawaban</h1>

        <div className="flex flex-row items-center justify-center gap-x-[2vw]">
           <div className="relative flex items-center w-[55vw]">
            <input 
              placeholder="Cari apa yang ingin kamu tanyakan" 
              className="w-full bg-white rounded-full text-[#0538B9] placeholder:text-[#0538B9] font-medium tracking-tight py-[1vw] pl-[2vw] pr-[4.5vw] text-[clamp(2vw,2vw,1.2rem)] focus:outline-none focus:ring-2 focus:ring-[#BACEFF] transition-all duration-300"
            />
            <Image 
              src={find} 
              alt="Cari"
              className="absolute right-[1.5vw] w-[1.8vw]"
            />
          </div>
          <div className="relative flex items-center w-[15vw]">
            <div className="w-full flex justify-between items-center bg-white rounded-full text-[#0538B9] font-medium py-[0.8vw] px-[2vw] text-[clamp(2vw,2vw,1.2rem)] border-2 border-[#BACEFF]">
              <span>Semua</span>
              <Image 
                src={arrowDown}
                alt="Pilih Kategori"
                className="w-[1.2vw] "
              />
            </div>
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
        
        <div className="w-full flex flex-col items-center lg:gap-y-[5vw] gap-y-[8vw]">
          {faqData.map((faq) => (
            <QuestionPage
              key={faq.id}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </div>
      </div>
    </div>
  );
}