'use client'

import Image from "next/image";
import bg from "@/assets/faq/background/bg.svg";
import find from "@/assets/faq/icon/find.svg";
import arrowDown from "@/assets/faq/icon/arrow-down.svg";
import QuestionPage from "@/components/faq/question";
import { useState, useRef, useEffect, useMemo } from "react";

const faqData = [
  { id: 1, question: "Pertanyaan 01", answer: "Jawaban untuk pertanyaan pertama ada di sini.", categories: "Lainnya" },
  { id: 2, question: "Pertanyaan 02", answer: "Jawaban untuk pertanyaan kedua ada di sini.", categories: "Tentang Acara" },
  { id: 3, question: "Pertanyaan 03", answer: "Jawaban untuk pertanyaan ketiga ada di sini.", categories: "Tentang Pendaftaran" },
];

const categories = ["Semua", "Tentang Pendaftaran", "Tentang Acara", "Lainnya"];

export default function FAQPage() {
  const pageStyle = {
    background: 'linear-gradient(243.8deg, #FFFFFF 0%, #BACEFF 49.35%, #FFFFFF 100.63%)'
  };

  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [searchQuestion, setSearchQuestion] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);


  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const filteredFaqs = useMemo(() => {
    let results = faqData;
    if (selectedCategory !== "Semua") {
      results = results.filter(faq => faq.categories === selectedCategory);
    }

    if (searchQuestion) {
      results = results.filter(faq =>
        faq.question.toLowerCase().includes(searchQuestion.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuestion.toLowerCase())
      );
    }
    return results;
  }, [selectedCategory, searchQuestion]);


  return (
    <div className="w-full relative aspect-[1920/1791]">
      <div className="inset-0 fixed -z-10" style={pageStyle} id="faq">
        <Image src={bg} alt="Background Simpul Memori" objectFit="cover" layout="fill" className="w-full" />
      </div>

      <div className="mt-[2vw] lg:w-9/12 w-10/12 mx-auto items-center min-h-screen flex gap-y-[3vw] flex-col relative pb-20">
        <h1 className="text-[#0538B9] font-bold text-[clamp(5vw,5vw,5rem)]">Pertanyaan & Jawaban</h1>

        <div className="flex flex-row items-center justify-center gap-x-[2vw]">
          <div className="relative flex items-center w-[50vw]">
            <input
              placeholder="Cari apa yang ingin kamu tanyakan"
              className="w-full bg-white rounded-full text-[#0538B9] placeholder:text-[#0538B9] font-medium tracking-tight py-[1vw] pl-[2vw] pr-[4.5vw] text-[clamp(2vw,2vw,1.2rem)] focus:outline-none focus:ring-2 focus:ring-[#BACEFF] transition-all duration-300"
              value={searchQuestion}
              onChange={(e) => setSearchQuestion(e.target.value)}
            />
            <Image
              src={find}
              alt="Cari"
              className="absolute right-[1.5vw] w-[1.8vw] cursor-pointer"
            />
          </div>

          <div ref={dropdownRef} className="relative flex items-center w-[20vw]">
            <button
              onClick={handleToggle}
              className="w-full flex justify-between items-center bg-white rounded-full text-[#0538B9] font-medium py-[0.8vw] px-[2vw]  border-2 border-[#BACEFF] cursor-pointer"
            >
              <span
                className={`truncate ${selectedCategory === 'Tentang Pendaftaran'
                  ? 'text-[clamp(1.5vw,1.5vw,0.9rem)]'
                  : 'text-[clamp(2vw,2vw,1.2rem)]'
                  }`}
              >
                {selectedCategory}
              </span>
              <Image
                src={arrowDown}
                alt="Pilih Kategori"
                className={`w-[1.2vw] transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isOpen && (
              <div className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-lg border border-[#BACEFF] z-10 py-2 z-20">
                <ul className="list-none">
                  {categories.map((category, index) => (
                    <li
                      key={index}
                      onClick={() => handleCategorySelect(category)}
                      className="text-[#0538B9] font-medium px-4 py-2 hover:bg-[#E0E9FF] cursor-pointer"
                    >
                      {category}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="w-full flex flex-col items-center lg:gap-y-[5vw] gap-y-[8vw]">
          {filteredFaqs.map((faq) => (
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