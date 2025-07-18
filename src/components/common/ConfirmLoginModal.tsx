'use client';

import Image from 'next/image';
import closemodal from '@/assets/landingpage/icons/closemodal.svg';
import { useRouter } from 'next/navigation';

interface ConfirmLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isOprecPage?: boolean;
  isSessionExpired?: boolean;
  isAuthMissing?: boolean;
  slug?: string;
}

export default function ConfirmLoginModal({ isOpen, onClose, onConfirm, isOprecPage, isSessionExpired = false, slug, isAuthMissing = false }: ConfirmLoginModalProps) {
  const router = useRouter();

  const isExpiredOrMissing = isSessionExpired || isAuthMissing;

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (slug) {
      router.push(`/proker/${slug}`);
    } else if (isOprecPage) {
      onConfirm();
    } else {
      router.push('/proker?kategori=open#proker-list');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center font-[NeueHaasDisplay] bg-[#001B5E]/90">
      <div className="relative bg-[#E8F0FF] rounded-2xl px-6 md:px-10 py-8 w-full max-w-[500px] max-h-[90vh] mx-4 font-light overflow-auto text-center text-[#0538B9] shadow-xl">
        <button onClick={onClose} className="absolute top-4 right-4 focus:outline-none" aria-label="Tutup modal">
          <Image src={closemodal} alt="Tutup" width={20} height={20} />
        </button>

        <h2 className="text-2xl md:text-3xl font-bold mb-4">{isExpiredOrMissing ? 'Sesi Berakhir' : 'Konfirmasi Login'}</h2>

        <p className="text-sm md:text-lg mb-6 break-words whitespace-pre-wrap">
          {isExpiredOrMissing
            ? 'Sesi login kamu telah berakhir atau belum tersedia. Silakan login ulang untuk melanjutkan proses Open Recruitment.'
            : 'Yuk, Lihat Proker yang Sedang Buka Oprec! Kami akan mengarahkan Anda ke halaman daftar program kerja yang sedang membuka pendaftaran kepanitiaan. Setelah itu, Anda bisa memilih salah satu proker dan klik tombol Daftar. Siap untuk melanjutkan?'}
        </p>

        <div className="flex justify-center gap-14">
          <button onClick={onClose} className="text-[#0049FF] font-semibold hover:underline">
            Batal
          </button>
          <button onClick={handleConfirm} className="bg-[#0049FF] text-white text-sm font-bold px-4 py-1 rounded-md hover:bg-[#002f8b]">
            {isExpiredOrMissing ? 'Kembali' : 'Lanjutkan'}
          </button>
        </div>
      </div>
    </div>
  );
}
