'use client';

import React, { useState, DragEvent } from 'react';
import Image from 'next/image';
import cloud from '@/assets/pendaftaran/cloud.svg';

type FieldUploadProps = {
  label: string;
  name: string;
  onChange: (name: string, value: File | undefined) => void;
};

export default function FieldUpload({ label, name, onChange }: FieldUploadProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onChange(name, e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(name, e.target.files?.[0]);
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-[#002787] font-bold text-lg">{label}</label>

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`bg-[#E6EDFF] rounded-2xl p-6 w-full flex flex-col items-center justify-center gap-2 text-center transition-all duration-200 ${isDragging ? 'ring-2 ring-[#004DFF] ring-offset-2' : ''}`}
      >
        <Image src={cloud} alt="cloud upload" width={60} height={60} className="mb-2" />
        <p className="text-[#002787] font-medium">Drag files to upload</p>

        <label htmlFor={name}>
          <span className="bg-[#7DA7FF] hover:bg-[#6c91e6] text-white font-semibold px-4 py-1.5 rounded-md cursor-pointer inline-block">Select files</span>
          <input id={name} type="file" name={name} accept="image/*" className="hidden" onChange={handleFileChange} />
        </label>
      </div>
    </div>
  );
}
