'use client';

import Image from 'next/image';
import closemodal from '@/assets/landingpage/icons/closemodal.svg';

interface ConfirmLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmLoginModal({ isOpen, onClose, onConfirm }: ConfirmLoginModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center font-[NeueHaasDisplay] bg-[#001B5E]/90">
      <div className="relative bg-[#E8F0FF] rounded-2xl px-6 md:px-10 py-8 w-[500px] font-light overflow-auto text-center text-[#0538B9] shadow-xl">
        {/* Tombol close */}
        <button onClick={onClose} className="absolute top-4 right-4 focus:outline-none" aria-label="Tutup modal">
          <Image src={closemodal} alt="Tutup" width={20} height={20} />
        </button>

        <h2 className="text-2xl md:text-3xl font-bold mb-4">Konfirmasi Login</h2>
        <p className="text-sm md:text-lg mb-6 break-words whitespace-pre-wrap">Anda akan diarahkan ke halaman login untuk melanjutkan proses Open Recruitment. Lanjutkan?</p>

        <div className="flex justify-center gap-14">
          <button onClick={onClose} className="text-[#0049FF] font-semibold hover:underline">
            Batal
          </button>
          <button onClick={onConfirm} className="bg-[#0049FF] text-white text-sm font-bold px-4 py-1 rounded-md hover:bg-[#002f8b]">
            Lanjutkan
          </button>
        </div>
      </div>
    </div>
  );
}
