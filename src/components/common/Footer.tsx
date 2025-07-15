"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo/logo-em-ub-2025-whiteText2.svg";
import instagram from "@/assets/footer/icons/Instagram.svg";
import twitter from "@/assets/footer/icons/X.png";
import LinkedIn from "@/assets/footer/icons/LinkedIn.svg";
import Youtube from "@/assets/footer/icons/YouTube.svg";
import TikTok from "@/assets/footer/icons/TikTok.svg";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#0038C4] to-[#001B5E] text-white px-8 py-10">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center lg:items-start justify-between gap-10 lg:gap-24">
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <Image src={logo} alt="Logo Simpul Memori" width={220} height={220} />
          <div className="flex space-x-5 mt-10">
                <a
                  className="hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.linkedin.com/company/em-ub-2024/"
                >
                  <Image src={LinkedIn} alt="Linkedin" width={30} height={30} />
                </a>
                <a
                  className="hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.tiktok.com/@em_ubofficial"
                >
                  <Image src={TikTok} alt="Tiktok" width={30} height={30} />
                </a>
                <a
                  className="hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://youtube.com/@emubofficial"
                >
                  <Image src={Youtube} alt="YouTube" width={30} height={30} />
                </a>
                <a
                  className="hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://instagram.com/em_ubofficial"
                >
                  <Image
                    src={instagram}
                    alt="Instagram"
                    width={30}
                    height={30}
                  />
                </a>
                <a
                  className="hover:underline"
                  href="http://x.com/em_ubofficial"
                >
                  <Image src={twitter} alt="Twitter" width={30} height={30} />
                </a>
          </div>
        </div>

        <div className="w-full lg:w-auto flex flex-col items-center lg:items-start">
          <div className="w-full flex flex-col lg::flex-wrap md:flex-row md:justify-center lg:justify-start text-xl gap-10 md:gap-x-16 text-center md:text-left">
            <div className="min-w-[150px]">
              <h3 className="font-semibold mb-2">Tautan</h3>
              <ul className="space-y-1">
                <li>
                  <Link href="/" className="hover:underline">
                    Beranda
                  </Link>
                </li>
                <li>
                  <Link href="/berita" className="hover:underline">
                    Berita
                  </Link>
                </li>
                <li>
                  <Link href="/tentang" className="hover:underline">
                    Tentang
                  </Link>
                </li>
                <li>
                  <Link href="/proker" className="hover:underline">
                    Proker
                  </Link>
                </li>
              </ul>
            </div>

            <div className="min-w-[150px]">
              <h3 className="font-semibold mb-2">Sosial Media</h3>
              <ul className="space-y-1">
                <li>
                  <a
                    className="hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.linkedin.com/company/em-ub-2024/"
                  >
                    Linkedin
                  </a>
                </li>
                <li>
                  <a
                    className="hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.tiktok.com/@em_ubofficial"
                  >
                    Tiktok
                  </a>
                </li>
                <li>
                  <a
                    className="hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://youtube.com/@emubofficial"
                  >
                    Youtube
                  </a>
                </li>
                <li>
                  <a
                    className="hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://instagram.com/em_ubofficial"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    className="hover:underline"
                    href="http://x.com/em_ubofficial"
                  >
                    X
                  </a>
                </li>
              </ul>
            </div>

            <div className="min-w-[250px]">
              <h3 className="font-semibold mb-2">Alamat</h3>
              <p className="leading-relaxed">
                Gedung EM-DPM UB Lantai 1 Universitas Brawijaya
                <br />
                Malang, Jalan Veteran 06C Malang 66145
              </p>

              <h3 className="font-semibold mt-6 mb-1">Kontak Kami</h3>
              <p>
                Telp: +62 000 000 000
                <br />
                E-mail: em@ub.ac.id
              </p>
            </div>
          </div>

          <div className="lg:border-t border-white mt-10 w-full" />
        </div>
      </div>
    </footer>
  );
}
