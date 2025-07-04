import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CountUpProps {
  target: number;
  duration?: number;
  padStart?: number;
}

export default function CountUp({ target, duration = 4000, padStart = 0 }: CountUpProps) {
  const [current, setCurrent] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    let currentValue = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
      currentValue += increment;
      if (currentValue >= target) {
        setCurrent(target);
        clearInterval(timer);
      } else {
        setCurrent(Math.ceil(currentValue));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [hasAnimated, target, duration]);

  const paddedStr = String(current).padStart(padStart, '0');

  return (
    <span ref={ref} className="inline-flex overflow-hidden h-[1em] align-bottom">
      {paddedStr.split('').map((char, index) => (
        <div key={index} className="relative w-[0.65em] h-[1em]">
          <AnimatePresence mode="wait">\
            <motion.span key={char} initial={{ y: '100%' }} animate={{ y: '0%' }} exit={{ y: '-100%' }} transition={{ duration: 0.25 }} className="absolute left-0 w-full text-center">
              {char}
            </motion.span>
          </AnimatePresence>
        </div>
      ))}
    </span>
  );
}
