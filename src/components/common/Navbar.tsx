'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import logo from '@/assets/logo/logo-em-ub-2025.svg';
import dropdown from '@/assets/landingpage/icons/dropdown.svg';
import hamburger from '@/assets/landingpage/icons/hamburger.svg';
import { motion, AnimatePresence } from 'framer-motion';
import ConfirmLoginModal from './ConfirmLoginModal';

export default function Navbar() {
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const isActive = (path: string) => {
    const current = pathname?.toLowerCase().replace(/\/$/, '');
    const target = path.toLowerCase().replace(/\/$/, '');
    return current === target;
  };

  useEffect(() => {
    const handleCheckMobileView = () => {
      const width = window.innerWidth;
      const isSmallScreen = width < 800;
      setIsMobileView(isSmallScreen);
    };

    handleCheckMobileView();
    window.addEventListener('resize', handleCheckMobileView);
    return () => window.removeEventListener('resize', handleCheckMobileView);
  }, []);

  return (
    <nav className="w-full flex items-center justify-between flex-wrap px-6 lg:px-16 py-6 fixed top-0 z-50 bg-white rounded-b-[50px] gap-y-4">
      <div className="flex-shrink-0">
        <Link href="/">
          <div className="relative w-[12vw] md:w-[7vw] aspect-[120/65]">
            <Image src={logo} alt="Logo Simpul Memori" fill className="object-contain" sizes="(max-width: 768px) 90px, (max-width: 1024px) 110px, 130px" />
          </div>
        </Link>
      </div>

      {!isMobileView && (
        <>
          <div className="flex flex-1 justify-center min-w-0">
            <div className="flex items-center whitespace-nowrap max-w-full gap-x-[5vw] text-[clamp(1.5vw,1.7vw,2rem)]">
              {[
                { href: '/', label: 'Beranda' },
                { href: '/berita', label: 'Berita' },
                { href: '/tentang', label: 'Tentang' },
                { href: '/proker', label: 'Program Kerja' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative font-medium after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-[#002787] after:transition-all after:duration-300 ${
                    isActive(item.href) ? 'bg-[#002787] text-white px-4 py-2 rounded-full after:hidden' : 'text-[#002787] after:w-0 hover:after:w-full'
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              <div className="relative inline-block">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="relative flex items-center font-medium text-[#002787] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-[#002787] after:transition-all after:duration-300 after:w-0 hover:after:w-full"
                >
                  Layanan
                  <Image src={dropdown} alt="dropdown" className={`ml-2 w-3 h-3 md:w-3 md:h-3 lg:w-5 lg:h-5 transition-transform duration-500 ease-in-out ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}`} />
                </button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      key="dropdown"
                      initial={{ opacity: 0, y: -10, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: 'auto' }}
                      exit={{ opacity: 0, y: -10, height: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md z-50 overflow-hidden text-[clamp(1.2vw,1.7vw,1rem)]"
                    >
                      <Link href="/faq" className={`block px-4 py-2 hover:bg-gray-100 ${isActive('/faq') ? 'bg-[#002787] text-white' : 'text-[#002787]'}`}>
                        FAQ
                      </Link>
                      <Link href="/forum-komunikasi" className={`block px-4 py-2 hover:bg-gray-100 ${isActive('/forum-komunikasi') ? 'bg-[#002787] text-white' : 'text-[#002787]'}`}>
                        Forum Komunikasi
                      </Link>
                      <Link href="/jaga-batin" className={`block px-4 py-2 hover:bg-gray-100 ${isActive('/jaga-batin') ? 'bg-[#002787] text-white' : 'text-[#002787]'}`}>
                        Jaga Batin
                      </Link>
                      <Link href="/donasi" className={`block px-4 py-2 hover:bg-gray-100 ${isActive('/donasi') ? 'bg-[#002787] text-white' : 'text-[#002787]'}`}>
                        Donasi
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="block whitespace-nowrap">
            <button
              onClick={() => setShowModal(true)}
              className="relative font-medium text-[#002787] text-[clamp(1.5vw,1.7vw,2rem)] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-[#002787] after:w-0 hover:after:w-full after:transition-all after:duration-300"
            >
              Log In
            </button>
            <ConfirmLoginModal
              isOpen={showModal}
              onClose={() => setShowModal(false)}
              onConfirm={() => {
                setShowModal(false);

                window.location.href = '/api/auth/google';
              }}
            />
          </div>
        </>
      )}

      {isMobileView && (
        <>
          {/* Hamburger button with higher z-index */}
          <div className="block fixed top-6 right-6 z-[60]">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <Image src={hamburger} alt="menu" width={36} height={36} />
            </button>
          </div>

          <AnimatePresence>
            {isMobileMenuOpen && (
              <>
                {/* Overlay click blocker */}
                <div onClick={() => setIsMobileMenuOpen(false)} className="fixed inset-0 z-40" />

                {/* Sidebar */}
                <motion.div
                  key="sidebar"
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="fixed top-0 right-0 h-full md:w-[250px] font-medium w-[200px] bg-white p-6 z-50 flex flex-col gap-4 pt-20 text-lg"
                >
                  <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className={`px-4 py-2 rounded-lg ${isActive('/') ? 'bg-[#002787] text-white font-semibold' : 'text-[#002787]'}`}>
                    Beranda
                  </Link>
                  <Link href="/berita" onClick={() => setIsMobileMenuOpen(false)} className={`px-4 py-2 rounded-lg ${isActive('/berita') ? 'bg-[#002787] text-white font-semibold' : 'text-[#002787]'}`}>
                    Berita
                  </Link>
                  <Link href="/tentang" onClick={() => setIsMobileMenuOpen(false)} className={`px-4 py-2 rounded-lg ${isActive('/tentang') ? 'bg-[#002787] text-white font-semibold' : 'text-[#002787]'}`}>
                    Tentang
                  </Link>
                  <Link href="/proker" onClick={() => setIsMobileMenuOpen(false)} className={`px-4 py-2 rounded-lg ${isActive('/proker') ? 'bg-[#002787] text-white font-semibold' : 'text-[#002787]'}`}>
                    Program Kerja
                  </Link>

                  <div>
                    <button
                      onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
                      className={`w-full text-left px-4 py-2 rounded-lg font-medium flex justify-between items-center ${isActive('/layanan') ? 'bg-[#002787] text-white' : 'text-[#002787]'}`}
                    >
                      Layanan
                      <div className="relative w-[20px] h-[11px] ml-2">
                        <Image src={dropdown} alt="dropdown" fill className={`object-contain transition-transform duration-300 ease-in-out ${isMobileDropdownOpen ? 'rotate-180' : 'rotate-0'}`} />
                      </div>
                    </button>

                    <AnimatePresence>
                      {isMobileDropdownOpen && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden ml-2 mt-2 flex flex-col gap-1">
                          <Link
                            href="/faq"
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              setIsMobileDropdownOpen(false);
                            }}
                            className={`block px-4 py-2 rounded-lg text-sm ${isActive('/faq') ? 'bg-[#002787] text-white font-semibold' : 'text-[#002787]'}`}
                          >
                            FAQ
                          </Link>
                          <Link
                            href="/forum-komunikasi"
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              setIsMobileDropdownOpen(false);
                            }}
                            className={`block px-4 py-2 rounded-lg text-sm ${isActive('/forum-komunikasi') ? 'bg-[#002787] text-white font-semibold' : 'text-[#002787]'}`}
                          >
                            Forum Komunikasi
                          </Link>
                          <Link
                            href="/jaga-batin"
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              setIsMobileDropdownOpen(false);
                            }}
                            className={`block px-4 py-2 rounded-lg text-sm ${isActive('/jaga-batin') ? 'bg-[#002787] text-white font-semibold' : 'text-[#002787]'}`}
                          >
                            Jaga Batin
                          </Link>
                          <Link
                            href="/donasi"
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              setIsMobileDropdownOpen(false);
                            }}
                            className={`block px-4 py-2 rounded-lg text-sm ${isActive('/donasi') ? 'bg-[#002787] text-white font-semibold' : 'text-[#002787]'}`}
                          >
                            Donasi
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className={`px-4 py-2 rounded-lg ${isActive('/login') ? 'bg-[#002787] text-white font-semibold' : 'text-[#002787]'}`}>
                    Log In
                  </Link>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </>
      )}
    </nav>
  );
}
