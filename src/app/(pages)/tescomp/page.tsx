'use client';

import React, { useState } from 'react';
import ModalSubmit from '@/components/pendaftaran/ModalSubmit';

const Page = () => {
  const [modalMode, setModalMode] = useState<'confirm' | 'success' | null>(null);

  const handleOpenConfirm = () => {
    setModalMode('confirm');
  };

  const handleConfirmSubmit = () => {
    setModalMode('success');
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <button onClick={handleOpenConfirm} className="bg-blue-600 text-white px-6 py-2 rounded-lg">
        Buka Modal
      </button>

      {modalMode && <ModalSubmit mode={modalMode} onClose={() => setModalMode(null)} onConfirm={modalMode === 'confirm' ? handleConfirmSubmit : undefined} />}
    </div>
  );
};

export default Page;
