import React from 'react';

interface ModalSubmitProps {
  mode: 'confirm' | 'success';
  onClose: () => void;
  onConfirm?: () => void; // hanya dipakai saat mode: 'confirm'
}

const ModalSubmit: React.FC<ModalSubmitProps> = ({ mode, onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-[#E6EDFF] rounded-2xl p-6 max-w-sm w-full text-center relative">
        {mode === 'success' && (
          <button onClick={onClose} className="absolute top-3 right-4 text-[#002787] font-bold text-xl">
            ×
          </button>
        )}

        <h2 className="text-[#002787] font-bold text-2xl mb-4">{mode === 'confirm' ? 'Konfirmasi Pendaftaran' : 'Terima Kasih!'}</h2>

        {mode === 'confirm' ? (
          <>
            <p className="text-[#002787] text-sm mb-6">
              Apakah Anda yakin ingin mendaftar
              <br />
              pada program ini?
              <br />
              Pastikan data Anda sudah benar sebelum melanjutkan.
            </p>
            <div className="flex justify-center gap-4">
              <button onClick={onClose} className="text-[#002787] text-sm font-bold">
                Batal
              </button>
              <button onClick={onConfirm} className="bg-[#004DFF] hover:bg-[#003bd1] text-white px-4 py-1 rounded text-sm font-bold">
                Daftar
              </button>
            </div>
          </>
        ) : (
          <p className="text-[#002787] text-sm">
            Kami menghargai partisipasi Anda dalam program ini.
            <br />
            Pantau terus informasi selanjutnya melalui website kami.
          </p>
        )}
      </div>
    </div>
  );
};

export default ModalSubmit;
