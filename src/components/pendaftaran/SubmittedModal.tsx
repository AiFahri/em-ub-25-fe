import React from 'react';
import { useRouter } from 'next/navigation';

interface SubmittedModalProps {
  mode: 'confirm' | 'success';
  onClose: () => void;
  onConfirm?: () => void;
  groupLink?: string;
  slug?: string;
}

const SubmittedModal: React.FC<SubmittedModalProps> = ({ mode, onClose, groupLink, slug }) => {
  const router = useRouter();
  const handleClose = () => {
    if (mode === 'success' && slug) {
      router.replace(`/proker/${slug}`);
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

        <h2 className="text-[#0538B9] font-bold text-xl sm:text-2xl mb-4">Anda Telah Terdaftar!</h2>

        <p className="text-[#0538B9] text-sm sm:text-base leading-relaxed">
          Kami menghargai partisipasi Anda dalam program ini.
          <br />
          Pantau terus informasi selanjutnya melalui website kami.
        </p>
        {groupLink && (
          <p className="text-sm text-[#0538B9] mt-3">
            Gabung grup: <br />
            <a href={groupLink} target="_blank" rel="noopener noreferrer" className="font-semibold underline text-[#0049FF] hover:text-[#002787] transition break-all max-w-full inline-block">
              {groupLink}
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

export default SubmittedModal;
