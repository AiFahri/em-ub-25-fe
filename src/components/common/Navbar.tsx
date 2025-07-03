'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import logo from '@/assets/logo/logo-em-ub-2025.svg';
import dropdown from '@/assets/landingpage/icons/dropdown.svg';
import berandaIcon from '@/assets/landingpage/icons/berandaIcon.svg';
import beritaIcon from '@/assets/landingpage/icons/beritaIcon.svg';
import tentangIcon from '@/assets/landingpage/icons/tentangIcon.svg';
import prokerIcon from '@/assets/landingpage/icons/prokerIcon.svg';
import hamburger from '@/assets/landingpage/icons/hamburger.svg';
// import closeIcon from '../../assets/icons/close.svg'; // optional

export default function Navbar() {
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    const current = pathname?.toLowerCase().replace(/\/$/, '');
    const target = path.toLowerCase().replace(/\/$/, '');
    return current === target;
  };

  return (
    <nav className="w-full rounded-b-[50px] px-6 md:px-10 lg:px-16 py-6 fixed top-0 z-50 bg-white flex items-center justify-between">
      <Link href="/" className="flex-shrink-0">
        <div className="relative w-[90px] md:w-[110px] lg:w-[130px] aspect-[120/65]">
          <Image src={logo} alt="Logo Simpul Memori" fill className="object-contain" sizes="(max-width: 768px) 90px, (max-width: 1024px) 110px, 130px" />
        </div>
      </Link>

      <div className="hidden md:flex items-center flex-grow lg:ml-32 md:ml-24 text-base md:text-lg lg:text-[22px] space-x-10 lg:space-x-16">
        <Link href="/" className={`font-medium ${isActive('/') ? 'bg-[#002787] text-white px-4 py-2 rounded-full' : 'text-[#002787] hover:underline'}`}>
          Beranda
        </Link>
        <Link href="/berita" className={`font-medium ${isActive('/berita') ? 'bg-[#002787] text-white px-4 py-2 rounded-full' : 'text-[#002787] hover:underline'}`}>
          Berita
        </Link>
        <Link href="/tentang" className={`font-medium ${isActive('/tentang') ? 'bg-[#002787] text-white px-4 py-2 rounded-full' : 'text-[#002787] hover:underline'}`}>
          Tentang
        </Link>
        <Link href="/proker" className={`font-medium ${isActive('/proker') ? 'bg-[#002787] text-white px-4 py-2 rounded-full' : 'text-[#002787] hover:underline'}`}>
          Program Kerja
        </Link>

        <div className="relative">
          <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center text-[#002787] font-medium hover:underline">
            Layanan <Image src={dropdown} alt="dropdown" width={20} height={11} className="ml-2" />
          </button>
          {isDropdownOpen && (
            <div className="absolute mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-md z-10">
              <Link href="/layanan/jdih" className={`block px-4 py-2 hover:bg-gray-100 ${isActive('/layanan/jdih') ? 'bg-[#002787] text-white' : 'text-[#002787]'}`}>
                JDIH
              </Link>
              <Link href="/layanan/aspirasi" className={`block px-4 py-2 hover:bg-gray-100 ${isActive('/layanan/aspirasi') ? 'bg-[#002787] text-white' : 'text-[#002787]'}`}>
                Aspirasi
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="md:hidden">
        <button className="pr-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <Image src={hamburger} alt="menu" width={36} height={36} />
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="absolute top-full right-6 mt-4 w-[270px] bg-white border-4 border-[#002787] rounded-[40px] p-6 z-50 shadow-lg flex flex-col gap-6 text-[#002787] text-lg">
          <Link href="/" className="flex items-center gap-4" onClick={() => setIsMobileMenuOpen(false)}>
            <Image src={berandaIcon} alt="Beranda" width={24} /> Beranda
          </Link>
          <Link href="/berita" className="flex items-center gap-4" onClick={() => setIsMobileMenuOpen(false)}>
            <Image src={beritaIcon} alt="Berita" width={24} /> Berita
          </Link>
          <Link href="/tentang" className="flex items-center gap-4" onClick={() => setIsMobileMenuOpen(false)}>
            <Image src={tentangIcon} alt="Tentang" width={24} /> Tentang
          </Link>
          <Link href="/programkerja" className="flex items-center gap-4" onClick={() => setIsMobileMenuOpen(false)}>
            <Image src={prokerIcon} alt="Proker" width={24} /> Proker
          </Link>
        </div>
      )}
    </nav>
  );
}
