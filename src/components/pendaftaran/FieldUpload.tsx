'use client';

import React, { useState, useEffect, DragEvent } from 'react';
import Image from 'next/image';
import cloud from '@/assets/pendaftaran/cloud.svg';
// import { INSERT_ANSWER } from '@/graphql/mutations/pendaftaran/SubmitForm';
// import { useMutation } from '@apollo/client';

type FileWrapper = {
  file: File | null;
  uploaded: boolean;
  url?: string;
};

type FieldUploadProps = {
  label: string;
  name: string;
  value?: FileWrapper[];
  onChange: (name: string, value: FileWrapper[]) => void;
  fileCategories?: string[];
  maxFile?: number;
  maxFileSize?: number;
};

const fileCategoryMap: Record<string, string[]> = {
  image: ['jpg', 'jpeg', 'png'],
  video: ['mp4', 'mov', 'hevc'],
  pdf: ['pdf'],
};

export default function FieldUpload({ label, name, value = [], onChange, fileCategories, maxFile, maxFileSize }: FieldUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<FileWrapper[]>(value);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  useEffect(() => {
    setSelectedFiles(value);
  }, [value]);

  const updateFiles = (files: File[]) => {
    const maxCount = maxFile ?? 0;
    const maxSize = (maxFileSize ?? 0) * 1024 * 1024;
    const newErrors: string[] = [];

    if (maxCount > 0 && selectedFiles.length + files.length > maxCount) {
      newErrors.push(`Jumlah file melebihi batas maksimal (${maxCount} file).`);
      setErrorMessages(newErrors);
      return;
    }

    const allowedExt = (fileCategories || []).flatMap((category) => fileCategoryMap[category.toLowerCase()] || []).map((ext) => ext.toLowerCase());

    const newFiles: FileWrapper[] = [];

    for (const file of files) {
      const ext = file.name.split('.').pop()?.toLowerCase();
      const isValidExt = !allowedExt.length || allowedExt.includes(ext || '');
      const isValidSize = file.size <= maxSize;

      const isDuplicate = [...selectedFiles, ...newFiles].some((f) => {
        const existingName = f.file?.name || f.url?.split('/').pop();
        return existingName === file.name;
      });

      if (isDuplicate) {
        newErrors.push(`File dengan nama "${file.name}" sudah ditambahkan.`);
        continue;
      }

      if (!isValidExt) {
        newErrors.push(`Tipe file "${file.name}" tidak valid. Diperbolehkan: ${allowedExt.join(', ')}`);
        continue;
      }

      if (!isValidSize) {
        newErrors.push(`File "${file.name}" terlalu besar. Maksimum ${maxFileSize} MB`);
        continue;
      }

      newFiles.push({ file, uploaded: false });
    }

    if (newErrors.length > 0) {
      setErrorMessages(newErrors);
      return;
    }

    setErrorMessages([]);
    const updated = [...selectedFiles, ...newFiles];
    setSelectedFiles(updated);
    onChange(name, updated);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files || []);
    updateFiles(files);
    e.dataTransfer.clearData();
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    updateFiles(files);
  };

  const handleRemoveFile = async (index: number) => {
    const fileToRemove = selectedFiles[index];

    if (fileToRemove.uploaded && fileToRemove.url) {
      try {
        const updated = selectedFiles.filter((_, i) => i !== index);
        setSelectedFiles(updated);
        onChange(name, updated);
      } catch {
        // console.error('❌ Gagal hapus file di server:', err);
      }
    } else {
      const updated = selectedFiles.filter((_, i) => i !== index);
      setSelectedFiles(updated);
      onChange(name, updated);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-[#002787] font-bold text-lg">{label}</label>
      <div className="text-sm text-gray-600 mb-2">
        {fileCategories && fileCategories.length > 0 && (
          <p>
            <span className="font-medium text-[#002787]">Tipe file:</span>{' '}
            {fileCategories
              .map((cat) => {
                const ext = fileCategoryMap[cat.toLowerCase()] || [];
                return `${cat} (${ext.join(', ')})`;
              })
              .join(', ')}
          </p>
        )}
        {maxFile && (
          <p>
            <span className="font-medium text-[#002787]">Maksimal file:</span> {maxFile} file
          </p>
        )}
      </div>

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`bg-[#E6EDFF] rounded-2xl p-6 w-full flex flex-col items-center justify-center gap-2 text-center transition-all duration-200 ${isDragging ? 'ring-2 ring-[#004DFF] ring-offset-2' : ''}`}
      >
        {selectedFiles.length === 0 && (
          <>
            <Image src={cloud} alt="cloud upload" width={60} height={60} className="mb-2" />
            <p className="text-[#002787] font-medium">Drag files to upload</p>
          </>
        )}

        {selectedFiles.length > 0 && (
          <div className="mt-4 w-full flex flex-col gap-3 text-left">
            {selectedFiles.map((item, index) => {
              const isRestored = item.uploaded && !item.file && item.url;
              const key = isRestored ? item.url : item.file?.name || index;

              return (
                <div key={key} className="flex items-center justify-between bg-white/60 backdrop-blur-md px-5 py-3 rounded-xl shadow-md border border-gray-200 transition hover:shadow-lg">
                  <div className="flex flex-col text-sm text-[#002787] max-w-[80%] overflow-hidden">
                    <span className="font-semibold truncate">{isRestored ? item.url?.split('/').pop() : item.file?.name || 'Unknown file'}</span>
                    <span className="text-xs text-gray-600 mt-0.5">{isRestored ? 'Uploaded file' : `${item.file?.type || 'Unknown type'} · ${((item.file?.size || 0) / 1024).toFixed(2)} KB`}</span>
                  </div>
                  <button type="button" onClick={() => handleRemoveFile(index)} className="text-red-500 text-xs hover:text-red-600 hover:scale-110 transition-transform duration-200" title="Hapus file">
                    🗑
                  </button>
                </div>
              );
            })}
          </div>
        )}

        <label htmlFor={name}>
          <span className="bg-[#7DA7FF] hover:bg-[#6c91e6] text-white font-semibold mt-5 px-4 py-1.5 rounded-md cursor-pointer inline-block">Select files</span>
          <input id={name} type="file" name={name} multiple accept="image/*,video/*,application/pdf" className="hidden" onChange={handleFileChange} />
        </label>
      </div>
      {errorMessages.length > 0 && (
        <div className="mt-3 w-full bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-xl text-sm space-y-1">
          {errorMessages.map((err, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="text-xl">⚠️</span>
              <span>{err}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
