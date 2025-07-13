import React from 'react';
import { useRouter } from 'next/navigation';

interface ModalSubmitProps {
  mode: 'confirm' | 'success';
  onClose: () => void;
  onConfirm?: () => void;
  groupLink?: string;
  slug?: string;
}

const ModalSubmit: React.FC<ModalSubmitProps> = ({ mode, onClose, onConfirm, groupLink, slug }) => {
  const router = useRouter();
  const handleClose = () => {
    if (mode === 'success' && slug) {
      router.push(`/proker/${slug}`);
      window.location.reload();
    } else {
      onClose();
    }
  };
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-[#E6EDFF] rounded-2xl p-4 sm:p-6 max-w-xs sm:max-w-sm w-full text-center relative">
        {mode === 'success' && (
          <button onClick={handleClose} className="absolute top-3 right-4 text-[#002787] font-bold text-xl">
            ×
          </button>
        )}

        <h2 className="text-[#0538B9] font-bold text-xl sm:text-2xl mb-4">{mode === 'confirm' ? 'Konfirmasi Pendaftaran' : 'Terima Kasih!'}</h2>

        {mode === 'confirm' ? (
          <>
            <p className="text-[#0538B9] text-sm sm:text-base mb-6 leading-relaxed">
              Apakah Anda yakin ingin mendaftar
              <br />
              pada program ini?
              <br />
              Pastikan data Anda sudah benar sebelum melanjutkan.
            </p>
            <div className="flex justify-evenly px-4 sm:px-0">
              <button onClick={onClose} className="text-[#0049FF] text-sm font-bold">
                Batal
              </button>
              <button onClick={onConfirm} className="bg-[#004DFF] hover:bg-[#003bd1] text-white px-4 py-1 rounded text-sm font-bold">
                Daftar
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="text-[#0538B9] text-sm sm:text-base leading-relaxed">
              Kami menghargai partisipasi Anda dalam program ini.
              <br />
              Pantau terus informasi selanjutnya melalui website kami.
            </p>
            {groupLink && (
              <p className="text-sm text-[#0538B9] mt-3">
                Gabung grup WhatsApp: <br />
                <a href={groupLink} target="_blank" rel="noopener noreferrer" className="font-semibold underline text-[#0049FF] hover:text-[#002787] transition">
                  <span>{groupLink}</span>
                </a>
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ModalSubmit;
