"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Lose from "@/app/Comingsoon/lose";
import Win1 from "./win1";
import Win2 from "./win2";
import Win3 from "./win3";

interface ResultFlowProps {
  isWinner: boolean;
  onPlayAgain: () => void;
}

export default function ResultFlow({ isWinner, onPlayAgain }: ResultFlowProps) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!isWinner) return;
    if (step < 2) {
      const timeout = setTimeout(() => setStep((prev) => prev + 1), 3000);
      return () => clearTimeout(timeout);
    }
  }, [step, isWinner]);

  const animations = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.8 },
    },
    scrollUp: {
      initial: { y: 100, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      transition: { duration: 0.3 },
    },
  };

  const renderComponent = () => {
    if (!isWinner) return <Lose onPlayAgain={onPlayAgain} />;
    switch (step) {
      case 0:
        return <Win1 />;
      case 1:
        return <Win2 />;
      case 2:
        return <Win3 onPlayAgain={onPlayAgain} />;
      default:
        return null;
    }
  };

  const animationType = step === 2 ? "scrollUp" : "fade";

  return (
    <div className="absolute inset-0 bg-black/60 z-50 flex items-center justify-center">
      <motion.div
        key={step}
        {...animations[animationType]}
        className="w-full h-full flex items-center justify-center"
      >
        {renderComponent()}
      </motion.div>
    </div>
  );
}
