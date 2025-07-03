'use client';

import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_WORK_PROGRAMS } from '@/graphql/queries/getWorkPrograms';
import Image from 'next/image';

import FieldInput from '@/components/pendaftaran/FieldInput';
import FieldSelect from '@/components/pendaftaran/FieldSelect';
import FieldCheckboxGroup from '@/components/pendaftaran/FieldCheckboxGroup';
import FieldUpload from '@/components/pendaftaran/FieldUpload';

export default function FormPendaftaran() {
  const { data, loading, error } = useQuery(GET_WORK_PROGRAMS, {
    variables: {
      input: {
        hasOpenRecruitment: true,
      },
    },
  });

  const [formData, setFormData] = useState<Record<string, any>>({});

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('FORM DATA:', formData);
  };

  if (loading) return <p className="text-white text-center py-10">Loading...</p>;
  if (error) return <p className="text-white text-center py-10">Error loading form</p>;

  const workProgram = data?.listWorkPrograms?.workPrograms?.[0];
  const fields = [...(workProgram?.form?.fields || [])].sort((a: any, b: any) => a.order - b.order);
  const imageUrl = workProgram?.form?.ImageUrl;

  return (
    <div className="min-h-screen bg-[#0049FF] px-4 sm:px-6 md:px-10 py-10 flex justify-center">
      <div className="w-full md:max-w-4xl lg:max-w-7xl flex flex-col gap-y-10">
        <div className="bg-[#E6EDFF] mt-24 mb-5 rounded-[30px] shadow-lg w-full flex flex-col md:flex-row gap-y-5 overflow-hidden">
          <div className="w-full md:w-4/7 py-10 flex flex-col items-center justify-center px-6 md:px-10 lg:px-20">
            {imageUrl ? (
              <Image src={`https://is3.cloudhost.id/em-ub-2025/${imageUrl.replace(/^\/+/, '')}`} alt="Poster" width={400} height={400} className="rounded-xl w-[50%] md:w-full object-contain" />
            ) : (
              <div className="w-full h-48 bg-gray-200 rounded-xl flex items-center justify-center text-gray-500 text-sm">Poster tidak tersedia</div>
            )}
          </div>

          <div className="w-full md:w-3/7 py-10 px-6 sm:px-10 md:px-10 lg:px-20 bg-white z-20 rounded-t-[30px] md:rounded-tr-[0] md:rounded-bl-[30px] flex flex-col" style={{ filter: 'drop-shadow(0 15px 15px rgba(0, 0, 0, 0.30))' }}>
            <h2 className="text-center text-xl md:text-4xl font-bold text-[#002787] mb-4">{workProgram?.title}</h2>

            <div className="flex-1 overflow-y-auto custom-scroll pr-5" style={{ maxHeight: '650px' }}>
              <div>DESKRIPSI BROK</div>
            </div>

            <a href={workProgram?.form?.fileLink} target="_blank" rel="noopener noreferrer" className="mt-4 text-[#0538B9] font-bold underline text-sm sm:text-base md:text-lg flex gap-2 hover:text-blue-800 self-center md:self-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-link" viewBox="0 0 16 16">
                <path d="M6.354 5.5H9.5a.5.5 0 0 1 0 1H6.354a3 3 0 1 0 0 6H9.5a.5.5 0 0 1 0 1H6.354a4 4 0 0 1 0-8z" />
                <path d="M9.646 10.5H6.5a.5.5 0 0 1 0-1h3.146a3 3 0 1 0 0-6H6.5a.5.5 0 0 1 0-1h3.146a4 4 0 0 1 0 8z" />
              </svg>
              Link Berkas Pendaftaran
            </a>
          </div>
        </div>

        <div className="bg-white rounded-[30px] shadow-lg w-full px-6 md:px-10 lg:px-20 py-10">
          <h2 className="text-[#002787] text-xl sm:text-2xl md:text-4xl font-bold mb-6 text-center">Formulir Pendaftaran</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {fields.map((field: any) => {
              const key = field.id;
              const label = field.label;

              switch (field.type) {
                case 'TEXT':
                  return <FieldInput key={key} label={label} name={key} value={formData[key] || ''} onChange={(e) => handleChange(key, e.target.value)} />;
                case 'DROPDOWN':
                  return <FieldSelect key={key} label={label} name={key} options={field.options?.map((opt: any) => opt.label) || []} value={formData[key] || ''} onChange={(e) => handleChange(key, e.target.value)} />;
                case 'CHECKBOX':
                  return <FieldCheckboxGroup key={key} label={label} name={key} options={field.options?.map((opt: any) => opt.label) || []} value={formData[key] || []} onChange={handleChange} />;
                case 'UPLOAD':
                  return <FieldUpload key={key} label={label} name={key} onChange={handleChange} />;
                default:
                  return null;
              }
            })}

            <div className="pt-6 flex justify-center">
              <button type="submit" className="px-10 py-2 rounded-2xl bg-[#004DFF] hover:bg-[#003bd1] text-white font-semibold text-lg">
                Daftar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
