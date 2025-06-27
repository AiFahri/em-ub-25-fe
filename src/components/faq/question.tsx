// src/components/faq/QuestionPage.tsx

'use client';

import { useState } from 'react';
import Image from 'next/image';
import arrowDown from '@/assets/faq/icon/arrow-down-white.svg';

interface QuestionPageProps {
  question: string;
  answer: string;
}

const QuestionPage: React.FC<QuestionPageProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full max-w-4xl">
      {/* Tombol pertanyaan dengan border-radius dinamis */}
      <button
        onClick={handleToggle}
        className={`w-full flex items-center justify-between text-left bg-[#0538B9] text-white px-6 py-4 transition-all duration-300 relative z-10 ${
          // Logika untuk mengubah radius sudut dikembalikan
          isOpen ? 'rounded-full' : 'rounded-full' 
        }`}
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-x-4">
          <div className="w-2 h-2 bg-white rounded-full"></div>
          <span className="font-bold text-lg">{question}</span>
        </div>
        <Image
          src={arrowDown}
          alt="toggle"
          className={`transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Kontainer jawaban ditarik ke atas dengan margin negatif */}
      <div
        // KELAS TRANSISI PENTING DIKEMBALIKAN DI SINI
        className={`overflow-hidden transition-all duration-300 ease-in-out -mt-[4vw] ${
          isOpen ? "max-h-[1000px]" : "max-h-0"
        }`}
      >
        {/* Panel jawaban dengan padding atas tambahan */}
        <div className="bg-white pt-[6vw] pb-[2vw] px-6 rounded-b-2xl text-gray-700 ">
          <p>{answer}</p>
        </div>
      </div>
    </div>
  );
}

export default QuestionPage;