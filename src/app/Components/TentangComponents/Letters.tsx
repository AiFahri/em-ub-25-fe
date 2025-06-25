"use client";

import { motion } from "framer-motion";

export default function AnimatedLetters({
  text,
  className,
  delayStart = 0,
}: {
  text: string;
  className?: string;
  delayStart?: number;
}) {
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: delayStart,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, scale: 0.5 },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 20,
      },
    },
  };

  return (
    <motion.span
      className={className}
      variants={container}
      initial="hidden"
      animate="show"
      style={{ display: "inline-flex" }}
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          variants={item}
          style={{ display: "inline-block" }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}
