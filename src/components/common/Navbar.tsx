'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import useAuth from '@/hooks/useAuth';

import logo from '@/assets/logo/logo-em-ub-2025.svg';
import dropdown from '@/assets/landingpage/icons/dropdown.svg';
import { GET_WORK_PROGRAM_BY_SLUG } from '@/graphql/queries/proker/prokerQueries';
import { motion, AnimatePresence } from 'framer-motion';
import ConfirmLoginModal from './ConfirmLoginModal';
import { useRouter } from 'next/navigation';
import HamburgerButton from './HamburgerButton';
import profileIcon from '@/assets/landingpage/icons/profile.svg';
import { useQuery } from '@apollo/client';
import history from '@/assets/landingpage/icons/history.svg';
import logoutIcon from '@/assets/landingpage/icons/Logout.svg';
import Modal from '../pendaftaran/Modal';

export default function Navbar() {
  const pathname = usePathname();

  const { isLoggedIn, logout } = useAuth();
  const [isMobileView, setIsMobileView] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [currentSlug, setCurrentSlug] = useState<string | null>(null);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileServiceDropdownOpen, setIsMobileServiceDropdownOpen] = useState(false);
  const [isMobileProfileDropdownOpen, setIsMobileProfileDropdownOpen] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  useEffect(() => {
    const normalizedPath = pathname.replace(/\/+$/, '');

    const match = normalizedPath.match(/^\/proker\/([^/]+)$/);

    if (match) {
      setCurrentSlug(match[1]);
    } else {
      setCurrentSlug(null);
    }
  }, [pathname]);

  const slug = currentSlug;
  const isOnProkerSlugPage = Boolean(slug);
  console.log('🔍 pathname:', pathname);
  console.log('🔍 currentSlug:', currentSlug);
  console.log('🔍 isOnProkerSlugPage:', isOnProkerSlugPage);

  const { data: prokerData } = useQuery(GET_WORK_PROGRAM_BY_SLUG, {
    variables: { slug },
    skip: !isOnProkerSlugPage,
  });

  useEffect(() => {
    setIsClient(true);

    const mediaQuery = window.matchMedia('(max-width: 799px)');
    const updateView = () => setIsMobileView(mediaQuery.matches);

    updateView();
    mediaQuery.addEventListener('change', updateView);
    return () => mediaQuery.removeEventListener('change', updateView);
  }, []);

  const isOprecProker = prokerData?.getWorkProgramBySlug?.hasForm && prokerData?.getWorkProgramBySlug?.isGeneral;

  const isActive = (path: string) => {
    const current = pathname?.toLowerCase().replace(/\/$/, '');
    const target = path.toLowerCase().replace(/\/$/, '');
    return current === target;
  };

  const handleLoginClick = () => {
    if (isOnProkerSlugPage && isOprecProker) {
      setShowModal(true);
    } else {
      setShowModal(true);
    }
  };

  if (!isClient) return <></>;

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
                  onClick={() => {
                    setIsServiceDropdownOpen(!isServiceDropdownOpen);
                    setIsProfileDropdownOpen(false);
                  }}
                  className="relative flex items-center font-medium text-[#002787] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-[#002787] after:transition-all after:duration-300 after:w-0 hover:after:w-full"
                >
                  Layanan
                  <Image src={dropdown} alt="dropdown" className={`ml-2 w-3 h-3 md:w-3 md:h-3 lg:w-5 lg:h-5 transition-transform duration-500 ease-in-out ${isServiceDropdownOpen ? 'rotate-180' : 'rotate-0'}`} />
                </button>

                <AnimatePresence>
                  {isServiceDropdownOpen && (
                    <motion.div
                      key="service-dropdown"
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

          <div className="block whitespace-nowrap relative">
            {isLoggedIn ? (
              <div className="relative inline-block">
                <button
                  onClick={() => {
                    setIsProfileDropdownOpen(!isProfileDropdownOpen);
                    setIsServiceDropdownOpen(false);
                  }}
                  className="relative flex items-center gap-2 text-[#002787] text-[clamp(1.5vw,1.7vw,2rem)] font-medium after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-[#002787] after:transition-all after:duration-300 after:w-0 hover:after:w-full"
                >
                  <Image src={profileIcon} alt="Profile Icon" className="w-[clamp(1.9vw,2vw,3rem)]" />
                  Profile
                </button>

                <AnimatePresence>
                  {isProfileDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-50 overflow-hidden"
                    >
                      <Link href="/riwayat-pendaftaran" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-[#002787]">
                        <Image src={history} alt="Riwayat" width={20} height={20} />
                        Riwayat Pendaftaran
                      </Link>
                      <button onClick={logout} className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-100 text-[#002787]">
                        <Image src={logoutIcon} alt="Logout" width={20} height={20} />
                        Log out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <button
                  onClick={handleLoginClick}
                  className="relative font-medium text-[#002787] text-[clamp(1.5vw,1.7vw,2rem)] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-[#002787] after:w-0 hover:after:w-full after:transition-all after:duration-300"
                >
                  Log In
                </button>
                {isOnProkerSlugPage && isOprecProker ? (
                  <Modal
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    onConfirm={() => {
                      setShowModal(false);
                      if (prokerData?.getWorkProgramBySlug?.registerLink) {
                        window.location.href = prokerData.getWorkProgramBySlug.registerLink;
                      }
                    }}
                    isGeneral={prokerData?.getWorkProgramBySlug?.isGeneral}
                  />
                ) : (
                  <ConfirmLoginModal isOpen={showModal} onClose={() => setShowModal(false)} onConfirm={handleLoginClick} isOprecPage={false} />
                )}
              </>
            )}
          </div>
        </>
      )}

      {isMobileView && (
        <>
          <div className="block fixed top-6 right-6 z-[60]">
            <HamburgerButton isOpen={isMobileMenuOpen} onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
          </div>

          <AnimatePresence>
            {isMobileMenuOpen && (
              <>
                <div onClick={() => setIsMobileMenuOpen(false)} className="fixed inset-0 z-40" />

                <motion.div
                  key="sidebar"
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="fixed top-10 right-0 h-full md:w-[250px] font-medium w-[200px] bg-white p-6 z-50 flex flex-col gap-4 pt-20 text-lg"
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
                      onClick={() => {
                        setIsMobileServiceDropdownOpen(!isMobileServiceDropdownOpen);
                        setIsMobileProfileDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 rounded-lg font-medium flex justify-between items-center ${isActive('/layanan') ? 'bg-[#002787] text-white' : 'text-[#002787]'}`}
                    >
                      Layanan
                      <div className="relative w-[20px] h-[11px] ml-2">
                        <Image src={dropdown} alt="dropdown" fill className={`object-contain transition-transform duration-300 ease-in-out ${isMobileServiceDropdownOpen ? 'rotate-180' : 'rotate-0'}`} />
                      </div>
                    </button>

                    <AnimatePresence>
                      {isMobileServiceDropdownOpen && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden ml-2 mt-2 flex flex-col gap-1">
                          {[
                            { href: '/faq', label: 'FAQ' },
                            { href: '/forum-komunikasi', label: 'Forum Komunikasi' },
                            { href: '/jaga-batin', label: 'Jaga Batin' },
                            { href: '/donasi', label: 'Donasi' },
                          ].map(({ href, label }) => (
                            <Link
                              key={href}
                              href={href}
                              onClick={() => {
                                setIsMobileMenuOpen(false);
                                setIsMobileServiceDropdownOpen(false);
                              }}
                              className={`block px-4 py-2 rounded-lg text-sm ${isActive(href) ? 'bg-[#002787] text-white font-semibold' : 'text-[#002787]'}`}
                            >
                              {label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {isLoggedIn ? (
                    <div className="relative">
                      <button
                        onClick={() => {
                          setIsMobileProfileDropdownOpen(!isMobileProfileDropdownOpen);
                          setIsMobileServiceDropdownOpen(false);
                        }}
                        className="flex items-center gap-2 w-full text-left px-4 py-2 rounded-lg text-[#002787]"
                      >
                        <Image src={profileIcon} alt="Profile Icon" className="w-[clamp(2vw,4vw,6vw)]" />
                        Profile
                      </button>

                      <AnimatePresence>
                        {isMobileProfileDropdownOpen && (
                          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="mt-2 ml-2 flex flex-col gap-2">
                            <Link
                              href="/riwayat-pendaftaran"
                              onClick={() => {
                                setIsMobileMenuOpen(false);
                                setIsMobileProfileDropdownOpen(false);
                              }}
                              className="flex items-center gap-2 px-4 py-2 rounded-lg text-[#002787]"
                            >
                              <Image src={history} alt="Riwayat" className="w-[3vw]" />
                              Riwayat Pendaftaran
                            </Link>

                            <button
                              onClick={() => {
                                logout();
                                setIsMobileMenuOpen(false);
                                setIsMobileProfileDropdownOpen(false);
                              }}
                              className="flex items-center gap-2 w-full text-left px-4 py-2 rounded-lg text-[#002787]"
                            >
                              <Image src={logoutIcon} alt="Logout" className="w-[3vw]" />
                              Log out
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <>
                      <button onClick={handleLoginClick} className={`w-full text-left px-4 py-2 rounded-lg font-medium ${isActive('/login') ? 'bg-[#002787] text-white font-semibold' : 'text-[#002787]'}`}>
                        Log In
                      </button>
                      {isOnProkerSlugPage && isOprecProker ? (
                        <Modal
                          isOpen={showModal}
                          onClose={() => setShowModal(false)}
                          onConfirm={() => {
                            setShowModal(false);
                            if (prokerData?.getWorkProgramBySlug?.registerLink) {
                              window.location.href = prokerData.getWorkProgramBySlug.registerLink;
                            }
                          }}
                          isGeneral={prokerData?.getWorkProgramBySlug?.isGeneral}
                        />
                      ) : (
                        <ConfirmLoginModal isOpen={showModal} onClose={() => setShowModal(false)} onConfirm={handleLoginClick} isOprecPage={false} />
                      )}
                    </>
                  )}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </>
      )}
    </nav>
  );
}
