'use client';
import React from 'react';

import ProkerHero from "@/components/proker/ProkerHero";
import ProkerSecondSection from '@/components/proker/ProkerSecondSection';
import ProkerList from '@/components/proker/ProkerList';

const page = () => {
  return (
    <div className='relative overflow-hidden  min-h-screen'>
      <ProkerHero />
        <ProkerSecondSection />
        <ProkerList />
    </div>
  );
};

export default page;
