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
    <div className="w-full ">

      <button
        onClick={handleToggle}
        className={`w-full flex items-center justify-between text-left bg-[#0538B9] cursor-pointer text-white px-[2vw] py-[2vw] transition-all duration-300 relative z-10 ${isOpen ? 'rounded-full' : 'rounded-full'
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
          className={`transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""
            }`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 rounded-t-[1vw] ease-in-out -mt-[3vw] ${isOpen ? "max-h-full" : "max-h-0"
          }`}
      >
        <div className="bg-white pt-[6vw] pb-[2vw] px-[2vw] rounded-b-[1vw] text-gray-700 ">
          <p>{answer}</p>
        </div>
      </div>
    </div>
  );
}

export default QuestionPage;