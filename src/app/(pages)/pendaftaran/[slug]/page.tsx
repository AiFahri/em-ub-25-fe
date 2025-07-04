'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useMutation, useQuery } from '@apollo/client';
import { GET_WORK_PROGRAM_BY_SLUG } from '@/graphql/queries/proker/prokerQueries';
import Image from 'next/image';

import FieldInput from '@/components/pendaftaran/FieldInput';
import FieldSelect from '@/components/pendaftaran/FieldSelect';
import FieldCheckboxGroup from '@/components/pendaftaran/FieldCheckboxGroup';
import FieldUpload from '@/components/pendaftaran/FieldUpload';
import { INSERT_ANSWER } from '@/graphql/mutations/pendaftaran/SubmitForm';
import { SUBMIT_FORM } from '@/graphql/mutations/submitForm';
import ModalSubmit from '@/components/pendaftaran/ModalSubmit';

export default function FormPendaftaran() {
  const params = useParams();
  const slug = params?.slug as string;

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const { data, loading, error } = useQuery(GET_WORK_PROGRAM_BY_SLUG, {
    variables: { slug },
    context: {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    },
  });

  const [formData, setFormData] = useState<Record<string, any>>({});
  const [insertAnswer] = useMutation(INSERT_ANSWER);
  const [submitForm] = useMutation(SUBMIT_FORM);
  const [modalMode, setModalMode] = useState<'confirm' | 'success' | null>(null);

  const handleChange = (name: string, value: any) => {
    console.log('🖊️ handleChange:', name, value);
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      console.log('📦 Updated formData:', updated);
      return updated;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setModalMode('confirm');
  };

  const handleConfirmSubmit = async () => {
    setModalMode(null);

    try {
      const fieldList = fields;
      const allInputs = [];
      console.log('🧾 formData saat submit:', formData);

      for (const field of fieldList) {
        const value = formData[field.id];
        console.log(`Cek field ID: ${field.id}, value:`, value);

        const isEmptyArray = Array.isArray(value) && value.length === 0;

        if (value === undefined || value === '' || isEmptyArray) {
          console.log(`⚠️ Field "${field.label}" (${field.type}) belum diisi. Tidak dikirim.`);
          continue;
        }

        const input: any = {
          fieldID: field.id,
        };

        if (field.type === 'CHECKBOX') {
          input.value = JSON.stringify(value);
        } else if (field.type === 'UPLOAD') {
          input.image = value instanceof File ? value : null;
          input.deleted_image = null;
        } else {
          input.value = value; // biarkan nilainya apa adanya
        }

        Object.keys(input).forEach((key) => {
          if (input[key] === null || input[key] === undefined) {
            delete input[key];
          }
        });

        console.log('🔄 Input dikirim:', input);

        await insertAnswer({ variables: { input } });
        allInputs.push(input);
      }

      console.log('🧾 Semua input akan dikirim:', allInputs);
      await submitForm({ variables: { formID: workProgram.form.id } });

      setModalMode('success');
    } catch (error) {
      console.error('Error submit:', error);
      alert('Gagal submit form.');
    }
  };

  if (loading) return <p className="text-white text-center py-10">Loading...</p>;
  if (error) return <p className="text-white text-center py-10">Error loading form</p>;

  const workProgram = data?.getWorkProgramBySlug;
  const fields = [...(workProgram?.form?.fields || [])].sort((a: any, b: any) => a.order - b.order);
  const imageUrl = workProgram?.form?.ImageUrl;

  console.log(fields);

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
              <div>{workProgram?.content || 'Deskripsi tidak tersedia'}</div>
            </div>

            {workProgram?.form?.fileLink && (
              <a href={workProgram.form.fileLink} target="_blank" rel="noopener noreferrer" className="mt-4 text-[#0538B9] font-bold underline text-sm sm:text-base md:text-lg flex gap-2 hover:text-blue-800 self-center md:self-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-link" viewBox="0 0 16 16">
                  <path d="M6.354 5.5H9.5a.5.5 0 0 1 0 1H6.354a3 3 0 1 0 0 6H9.5a.5.5 0 0 1 0 1H6.354a4 4 0 0 1 0-8z" />
                  <path d="M9.646 10.5H6.5a.5.5 0 0 1 0-1h3.146a3 3 0 1 0 0-6H6.5a.5.5 0 0 1 0-1h3.146a4 4 0 0 1 0 8z" />
                </svg>
                Link Berkas Pendaftaran
              </a>
            )}
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
                  console.log('📦 FieldSelect:', field);
                  return <FieldSelect key={key} label={label} name={key} options={field.options?.map((opt: any) => ({ label: opt.label, value: opt.label })) || []} value={formData[key] || ''} onChange={(val) => handleChange(key, val)} />;
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
      {modalMode && <ModalSubmit mode={modalMode} onClose={() => setModalMode(null)} onConfirm={modalMode === 'confirm' ? handleConfirmSubmit : undefined} />}
    </div>
  );
}
