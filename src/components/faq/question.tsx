'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import arrowDown from '@/assets/faq/icon/arrow-down-white.svg';

interface QuestionPageProps {
  question: string;
  answer: string;
}

const QuestionPage: React.FC<QuestionPageProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen && contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  return (
    <div className="w-full">
      <button
        onClick={handleToggle}
        className="w-full flex items-center justify-between text-left bg-[#0538B9] cursor-pointer text-white px-[2vw] py-[2vw] transition-all duration-300 relative z-10 rounded-full"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-x-4">
          <div className="w-2 h-2 bg-white rounded-full" />
          <span className="font-bold text-lg">{question}</span>
        </div>
        <Image
          src={arrowDown}
          alt="toggle"
          className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <div
        style={{ maxHeight: `${height}px` }}
        className={`transition-all duration-500 ease-in-out -mt-[3vw] rounded-t-[1vw]`}
      >
        <div
          ref={contentRef}
          className="bg-white pt-[6vw] pb-[2vw] px-[2vw] rounded-b-[2vw] text-gray-700 opacity-0 translate-y-2 transition-all duration-500 ease-in-out"
          style={{
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? 'translateY(0)' : 'translateY(8px)',
          }}
        >
          <p>{answer}</p>
        </div>
      </div>
    </div>
  );
};

export default QuestionPage;
