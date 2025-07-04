'use client';

import { useState, useEffect } from 'react';

// Definisikan tipe untuk kunci breakpoint agar lebih aman
type BreakpointKey = 'sm' | 'md' | 'lg' | 'xl';

// Definisikan objek breakpoints dengan tipe yang jelas
const breakpoints: Record<BreakpointKey, number> = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
};

// Tambahkan tipe pada parameter (breakpointKey) dan nilai kembalian (boolean)
export const useBreakpoint = (breakpointKey: BreakpointKey): boolean => {
  const [isBelowBreakpoint, setIsBelowBreakpoint] = useState<boolean>(false);

  useEffect(() => {
    // Fungsi ini tidak perlu diubah, TypeScript sudah bisa memahaminya
    const handleResize = () => {
      if (window.innerWidth < breakpoints[breakpointKey]) {
        setIsBelowBreakpoint(true);
      } else {
        setIsBelowBreakpoint(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [breakpointKey]);

  return isBelowBreakpoint;
};