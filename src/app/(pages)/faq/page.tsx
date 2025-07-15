"use client";

import Image from "next/image";
import bg from "@/assets/faq/background/bg.svg";
import find from "@/assets/faq/icon/find.svg";
import arrowDown from "@/assets/faq/icon/arrow-down.svg";
import QuestionPage from "@/components/faq/question";
import { useState, useRef, useEffect, useMemo } from "react";

const faqData = [
  {
    id: 1,
    question: "Bagaimana cara mengurus Kartu Tanda Mahasiswa (KTM)?",
    answer:
      "syarat dan ketentuan pengurusan KTM lebih lengkap dapat dilihat disini https://akademik.ub.ac.id/kepengurusan-ktm-baru/",
    categories: "KTM",
  },
  {
    id: 2,
    question: "Apa yang harus dilakukan jika kehilangan KTM atau KTM rusak?",
    answer:
      "Jika KTM Hilang, mahasiswa cukup menyerahkan surat kehilangan dari kepolisian setempat. Jika KTM Rusak / Pindah Program Studi, mahasiswa cukup menyerahkan KTM Lama. Selengkapnya https://akademik.ub.ac.id/kepengurusan-ktm-baru/",
    categories: "KTM",
  },
  {
    id: 3,
    question: "Bagaimana prosedur mengurus surat aktif kuliah?",
    answer:
      "Mahasiswa dapat mengajukan permohonan surat aktif kuliah melalui sistem online (SIAM atau layanan fakultas) dengan mengisi biodata.",
    categories: "Administrasi Akademik",
  },
  {
    id: 4,
    question: "Dimana saya bisa melihat data diri dan status akademik saya?",
    answer:
      "Data pribadi, status akademik, dan informasi perkuliahan dapat diakses melalui SIAM (Sistem Informasi Akademik Mahasiswa) UB di laman: https://siam.ub.ac.id",
    categories: "Administrasi Akademik",
  },
  {
    id: 5,
    question: "Apa itu KRS dan kapan pengisiannya?",
    answer:
      "KRS (Kartu Rencana Studi) adalah daftar mata kuliah yang diambil mahasiswa tiap semester. Pengisian dilakukan secara online di SIAM, biasanya sebelum semester dimulai, sesuai jadwal akademik.https://siam.ub.ac.id",
    categories: "Administrasi Akademik",
  },
  {
    id: 6,
    question: "Bagaimana jika saya terlambat mengisi KRS?",
    answer:
      "Mahasiswa wajib mengurus surat izin pengisian KRS terlambat ke bagian akademik fakultas. Pengisian di luar jadwal resmi memerlukan persetujuan pimpinan fakultas.",
    categories: "Administrasi Akademik",
  },
  {
    id: 7,
    question: "Bagaimana cara mengajukan cuti akademik?",
    answer:
      "Ajukan permohonan cuti melalui SIAM dengan alasan jelas dan dokumen pendukung. Selengkapnya  https://siam.ub.ac.id",
    categories: "Administrasi Akademik",
  },
  {
    id: 8,
    question: "Bagaimana cara mengikuti organisasi kemahasiswaan di UB?",
    answer:
      "UB memiliki berbagai organisasi mahasiswa (BEM, UKM, Himpunan, dll). Mahasiswa dapat mendaftar saat masa open recruitment yang diumumkan melalui media sosial atau papan pengumuman fakultas.",
    categories: "Kemahasiswaan",
  },
  {
    id: 9,
    question: "Apakah ada beasiswa yang bisa saya daftar di UB?",
    answer:
      "Ya, UB menyediakan berbagai jenis beasiswa seperti KIP Kuliah, Beasiswa Afirmasi, Beasiswa Prestasi, Beasiswa Bank Indonesia, Djarum, dan lainnya. Informasi lengkap bisa diakses di website Direktorat Kemahasiswaan UB atau akun Instagram resmi mereka. Selengkapnya https://beasiswa.ub.ac.id/",
    categories: "Kemahasiswaan",
  },
  {
    id: 10,
    question:
      "Bagaimana jika saya mengalami kendala psikologis atau butuh konseling?",
    answer:
      "UB memiliki layanan konseling mahasiswa melalui Pusat Konseling Mahasiswa (PKM) atau Layanan Psikologi di fakultas tertentu.",
    categories: "Konseling",
  },
  {
    id: 11,
    question: "Bagaimana cara membayar UKT (Uang Kuliah Tunggal)?",
    answer:
      "Pembayaran UKT di UB dapat dilakukan melalui bank mitra seperti BNI, Mandiri, BRI, BTN, BSI, Muamalat, CIMB Niaga, dan BCA (khusus Vokasi) dengan menggunakan NIM dan mengikuti prosedur pembayaran yang telah ditentukan. Selengkapnya Tata Cara Pembayaran – SELMA UB",
    categories: "Keuangan & UKT",
  },
  {
    id: 12,
    question: "Apa yang harus saya lakukan jika telat membayar UKT?",
    answer:
      "Segera hubungi bagian keuangan fakultas atau BAK UB untuk meminta izin pembayaran susulan. Biasanya akan diminta membuat surat permohonan disertai alasan keterlambatan. Selengkapnya KEMAHASISWAAN – UNIVERSITAS BRAWIJAYA",
    categories: "Keuangan & UKT",
  },
  {
    id: 13,
    question: "Apakah saya bisa mengajukan bantuan keuangan?",
    answer:
      "Ya, kamu bisa mengajukan bantuan keuangan atau keringanan UKT, biasanya dibuka di awal semester. Pengajuan dapat dilakukan melalui SIBAKU (Sistem Informasi Bantuan Keuangan UB) atau dengan menghubungi Crisis Center (CC) EM UB, yang menyediakan layanan pendampingan administratif dan advokasi terkait kendala finansial mahasiswa. Laman sibaku https://sibaku.ub.ac.id/",
    categories: "Keuangan & UKT",
  },
  {
    id: 14,
    question: "Apakah ada sanksi bagi mahasiswa yang tidak membayar UKT?",
    answer:
      "Ya, jika tidak membayar UKT tanpa izin resmi, mahasiswa bisa dinonaktifkan sementara (cuti otomatis) atau tidak diperbolehkan mengikuti perkuliahan dan ujian. Dalam jangka panjang, hal ini bisa berpengaruh pada status kemahasiswaan.",
    categories: "Keuangan & UKT",
  },
  {
    id: 15,
    question:
      "Apakah advokasi ini juga berlaku untuk mahasiswa pascasarjana dan vokasi?",
    answer:
      "Ya. Layanan advokasi terbuka untuk seluruh mahasiswa aktif UB, termasuk program vokasi, sarjana, magister, dan doktoral.",
    categories: "Tentang Pendaftaran",
  },
  {
    id: 16,
    question: "Layanan apa saja yang disediakan oleh Pusat Advokasi?",
    answer:
      "Kami menyediakan layanan berupa: Konsultasi akademik dan non-akademik, Pendampingan kasus mahasiswa, Aspirasi dan advokasi kebijakan kampus,	Informasi birokrasi dan regulasi kampus,	Pengawalan isu-isu krusial yang berdampak pada mahasiswa UB",
    categories: "Advokasi",
  },
  {
    id: 17,
    question: "Siapa saja yang bisa menggunakan layanan ini?",
    answer:
      "Seluruh mahasiswa aktif Universitas Brawijaya dari semua fakultas dapat menggunakan layanan advokasi kami secara gratis dan rahasia.",
    categories: "Advokasi",
  },
  {
    id: 18,
    question: "Apakah Pusat Advokasi hanya menangani kasus akademik?",
    answer:
      "Tidak. Kami juga menangani kasus non-akademik seperti diskriminasi, kekerasan, perundungan, hingga isu kesejahteraan mahasiswa.",
    categories: "Advokasi",
  },
];

const categories = [
  "Semua",
  "KTM",
  "Administrasi Akademik",
  "Kemahasiswaan",
  "Konseling",
  "Keuangan & UKT",
  "Advokasi",
];

export default function FAQPage() {
  const pageStyle = {
    background:
      "linear-gradient(243.8deg, #FFFFFF 0%, #BACEFF 49.35%, #FFFFFF 100.63%)",
  };

  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [searchQuestion, setSearchQuestion] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const filteredFaqs = useMemo(() => {
    let results = faqData;
    if (selectedCategory !== "Semua") {
      results = results.filter((faq) => faq.categories === selectedCategory);
    }

    if (searchQuestion) {
      results = results.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuestion.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuestion.toLowerCase())
      );
    }
    return results;
  }, [selectedCategory, searchQuestion]);

  return (
    <div className="w-full relative aspect-[1920/1791] mt-36">
      <div className="inset-0 fixed -z-10" style={pageStyle} id="faq">
        <Image
          src={bg}
          alt="Background Simpul Memori"
          objectFit="cover"
          layout="fill"
          className="w-full"
        />
      </div>

      <div className="mt-[2vw] lg:w-9/12 w-10/12 mx-auto items-center min-h-screen flex gap-y-[3vw] flex-col relative pb-20">
        <h1 className="text-[#0538B9] font-bold text-[clamp(7vw,5vw,5rem)] lg:text-[clamp(5vw,5vw,5rem)]">
          Pertanyaan & Jawaban
        </h1>

        <div className="flex flex-row items-center justify-center gap-x-[2vw]">
          <div className="relative flex items-center w-[50vw]">
            <input
              placeholder="Cari apa yang ingin kamu tanyakan"
              className="w-full bg-white rounded-full  text-[#0538B9] placeholder:text-[#0538B9] font-medium tracking-tight py-[1vw] pl-[2vw] pr-[4.5vw] text-[clamp(2.7vw,2vw,1.2rem)] lg:text-[clamp(1.5vw,2vw,1.2rem)] focus:outline-none focus:ring-2 focus:ring-[#BACEFF] transition-all duration-300"
              value={searchQuestion}
              onChange={(e) => setSearchQuestion(e.target.value)}
            />
            <Image
              src={find}
              alt="Cari"
              className="absolute right-[1.5vw] w-[1.8vw] cursor-pointer"
            />
          </div>

          <div
            ref={dropdownRef}
            className="relative flex items-center w-[20vw]"
          >
            <button
              onClick={handleToggle}
              className="w-full flex justify-between items-center bg-white rounded-full text-[#0538B9] font-medium py-[0.8vw] px-[2vw]  border-2 border-[#BACEFF] cursor-pointer"
            >
              <span
                className={`truncate ${
                  selectedCategory === "Tentang Pendaftaran"
                    ? "text-[clamp(1vw,1.5vw,0.9rem)] lg:text-[clamp(1vw,2vw,1.2rem)]"
                    : "text-[clamp(2.7vw,2vw,1.2rem)] lg:text-[clamp(1.5vw,2vw,1.2rem)]"
                }`}
              >
                {selectedCategory}
              </span>
              <Image
                src={arrowDown}
                alt="Pilih Kategori"
                className={`w-[1.2vw] transform transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isOpen && (
              <div className="absolute top-full mt-2 bg-white rounded-2xl shadow-lg border border-[#BACEFF] z-10 py-2 z-20">
                <ul className="list-none">
                  {categories.map((category, index) => (
                    <li
                      key={index}
                      onClick={() => handleCategorySelect(category)}
                      className="text-[#0538B9] font-medium px-4 py-2 hover:bg-[#E0E9FF] cursor-pointer  text-[clamp(3vw,2vw,0.9rem)] lg:text-[clamp(1.5vw,2vw,1.2rem)]"
                    >
                      {category}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="w-full flex flex-col items-center lg:gap-y-[5vw] gap-y-[10vw]">
          {filteredFaqs.map((faq) => (
            <QuestionPage
              key={faq.id}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
