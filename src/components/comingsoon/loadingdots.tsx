'use client';

import React, { useState, useEffect } from 'react';

export default function LoadingDots() {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + '.' : ''));
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return <>{dots}</>;
}
