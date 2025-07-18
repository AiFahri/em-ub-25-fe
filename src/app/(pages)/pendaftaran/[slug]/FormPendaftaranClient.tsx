'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_WORK_PROGRAM_BY_SLUG } from '@/graphql/queries/proker/prokerQueries';
import Image from 'next/image';
import ConfirmLoginModal from '@/components/common/ConfirmLoginModal';

import FieldInput from '@/components/pendaftaran/FieldInput';
import FieldSelect from '@/components/pendaftaran/FieldSelect';
import FieldCheckboxGroup from '@/components/pendaftaran/FieldCheckboxGroup';
import FieldUpload from '@/components/pendaftaran/FieldUpload';
import { INSERT_ANSWER } from '@/graphql/mutations/pendaftaran/SubmitForm';
import { SUBMIT_FORM } from '@/graphql/mutations/pendaftaran/SubmitForm';
import ModalSubmit from '@/components/pendaftaran/ModalSubmit';
import SkeletonFormPendaftaran from '@/components/pendaftaran/SkeletonFormPendaftaran';

import { useRouter } from 'next/navigation';

interface FieldOption {
  id: string;
  label: string;
  order: number;
}

type FileWrapper = {
  file: File | null;
  uploaded: boolean;
  url?: string;
};

interface Answer {
  id: string;
  fieldID: string;
  value?: string[];
  answerOptionsID?: string[] | string;
}

interface Field {
  id: string;
  label: string;
  type: 'TEXT' | 'DROPDOWN' | 'CHECKBOX' | 'UPLOAD';
  order: number;
  options?: FieldOption[];
  fileCategories?: string[];
  isRequired: boolean;
  maxFile?: number;
  maxFileSize?: number;
}

type InsertAnswerInput = {
  fieldID: string;
  value?: string[];
  image?: File;
};

type FormValue = string | string[] | FileWrapper[];

interface FormPendaftaranClientProps {
  slug: string;
}

export default function FormPendaftaranClient({ slug }: FormPendaftaranClientProps) {
  const router = useRouter();

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSessionExpired, setIsSessionExpired] = useState(false);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  function isFileWrapperArray(value: FormValue): value is FileWrapper[] {
    return Array.isArray(value) && value.length > 0 && typeof value[0] === 'object' && 'file' in value[0];
  }

  useEffect(() => {
    if (!token) {
      setIsLoginModalOpen(true);
      setIsSessionExpired(false);
    }
  }, [token]);

  const { data, loading, error, refetch } = useQuery(GET_WORK_PROGRAM_BY_SLUG, {
    variables: { slug },
    context: {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    },
    onError: (err) => {
      if (err.message.includes('Unauthorized') || err.message.includes('expired')) {
        setIsLoginModalOpen(true);
        setIsSessionExpired(true);
      }
    },
  });

  const workProgram = data?.getWorkProgramBySlug;
  useEffect(() => {
    const fillStatus = workProgram?.form?.myResponse?.fillStatus;

    if (fillStatus === 'submitted') {
      setModalMode('success');
    }
  }, [workProgram]);

  const fields: Field[] = useMemo(() => {
    return [...(workProgram?.form?.fields || [])].sort((a, b) => a.order - b.order);
  }, [workProgram]);

  const imageUrl = workProgram?.form?.ImageUrl;

  const [formData, setFormData] = useState<Record<string, FormValue>>({});

  const [insertAnswer] = useMutation(INSERT_ANSWER);
  const [submitForm] = useMutation(SUBMIT_FORM);
  const [modalMode, setModalMode] = useState<'confirm' | 'success' | null>(null);
  const debounceRef = useRef<Record<string, NodeJS.Timeout>>({});
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    if (notification) {
      const timeout = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timeout);
    }
  }, [notification]);
  const handleChange = (name: string, value: FormValue) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    const field = fields.find((f: Field) => String(f.id) === name);
    if (!field) return;

    if (field.type === 'TEXT') {
      clearTimeout(debounceRef.current[name]);
      debounceRef.current[name] = setTimeout(() => {
        insertSingleAnswer(field, value);
      }, 800);
    }

    if (['DROPDOWN', 'CHECKBOX', 'UPLOAD'].includes(field.type)) {
      insertSingleAnswer(field, value);
    }
  };

  const insertSingleAnswer = async (field: Field, value: FormValue) => {
    const isEmptyArray = Array.isArray(value) && value.length === 0;
    if (value === undefined || value === '' || isEmptyArray) return;

    const input: InsertAnswerInput = { fieldID: String(field.id) };

    if (field.type === 'UPLOAD') {
      if (!isFileWrapperArray(value)) return;

      const unuploaded = value.filter((v) => !v.uploaded && v.file);
      if (unuploaded.length === 0) return;

      const firstFile = unuploaded[0].file;
      if (!firstFile) return;

      input.image = firstFile;

      const updated = (value as FileWrapper[]).map((file, idx) => {
        if (!file.uploaded && idx === value.indexOf(unuploaded[0])) {
          return { ...file, uploaded: true };
        }
        return file;
      });

      setFormData((prev) => ({
        ...prev,
        [field.id]: updated,
      }));
    } else {
      const val = Array.isArray(value) ? value.map(String) : [String(value)];
      if (val.length === 0 || !val[0]) return;
      input.value = val;
    }

    try {
      await insertAnswer({
        variables: { input },
        context: {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
          },
        },
      });
    } catch {
      // console.warn(`❌ Gagal insert untuk "${field.label}"`, err);
    }
  };

  useEffect(() => {
    const savedAnswers = workProgram?.form?.myResponse?.answers;
    if (!savedAnswers || savedAnswers.length === 0) return;

    const restored: Record<string, FormValue> = {};

    (savedAnswers as Answer[]).forEach((answer) => {
      const key = String(answer.fieldID);
      const field = fields.find((f: Field) => String(f.id) === key);
      if (!field) return;

      if (field.type === 'UPLOAD' && answer.value?.[0]) {
        restored[key] = [
          {
            uploaded: true,
            file: null,
            url: `https://is3.cloudhost.id/emub/${answer.value[0].replace(/^\/+/, '')}`,
          },
        ];
      } else if (['DROPDOWN', 'CHECKBOX'].includes(field.type)) {
        restored[key] = Array.isArray(answer.answerOptionsID) ? (answer.answerOptionsID.length === 1 ? answer.answerOptionsID[0] : answer.answerOptionsID.map(String)) : String(answer.answerOptionsID);
      } else if (field.type === 'TEXT') {
        if (answer.value && answer.value.length > 0) {
          restored[key] = answer.value.length > 1 ? answer.value : answer.value[0];
        }
      }
    });

    setFormData((prev) => ({
      ...prev,
      ...restored,
    }));
  }, [workProgram, fields]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fields || fields.length === 0) return;

    const missingFields: string[] = [];
    const newErrors: Record<string, boolean> = {};

    for (const field of fields) {
      if (!field.isRequired) continue;

      const value = formData[field.id];
      const isEmptyArray = Array.isArray(value) && value.length === 0;
      const isUpload = field.type === 'UPLOAD' && isFileWrapperArray(value);

      const isEmpty = value === undefined || value === '' || isEmptyArray || (isUpload && value.every((file) => !file.uploaded && !file.file));

      if (isEmpty) {
        missingFields.push(field.label);
        newErrors[field.id] = true;
      }
    }

    if (missingFields.length > 0) {
      setNotification('Mohon lengkapi semua isian wajib sebelum mendaftar.');
      return;
    }

    setNotification(null);
    setModalMode('confirm');
  };

  const handleConfirmSubmit = async () => {
    setModalMode(null);

    try {
      if (!fields || fields.length === 0) return;

      for (const field of fields) {
        const fieldID = String(field.id);
        const value = formData[fieldID];
        const isEmptyArray = Array.isArray(value) && value.length === 0;
        if (value === undefined || value === '' || isEmptyArray) continue;

        const input: InsertAnswerInput = { fieldID: String(field.id) };

        if (field.type === 'UPLOAD') {
          if (!isFileWrapperArray(value)) continue;

          const unuploadedFiles = value.filter((v) => v.file && !v.uploaded);
          if (unuploadedFiles.length === 0) continue;

          if (unuploadedFiles[0].file) {
            input.image = unuploadedFiles[0].file;
          } else {
            continue;
          }
        } else {
          const val = Array.isArray(value) ? value.map(String) : [String(value)];
          if (val.length === 0 || !val[0]) continue;
          input.value = val;
        }

        await insertAnswer({
          variables: { input },
          context: {
            headers: {
              Authorization: token ? `Bearer ${token}` : '',
            },
          },
        });
      }

      await submitForm({
        variables: {
          formID: workProgram.form.id,
        },
        context: {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
          },
        },
      });
      await refetch();
      setModalMode('success');
    } catch {
      // console.error('❌ Gagal submit form:', err);
      alert('Gagal submit. Silakan coba lagi.');
    }
  };

  if (loading) return <SkeletonFormPendaftaran />;
  if (error || !workProgram || !fields) return <p className="text-white text-center py-10">Gagal memuat formulir.</p>;

  return (
    <div className="min-h-screen bg-[#0049FF] px-4 sm:px-6 md:px-10 py-10 flex justify-center">
      <div className="w-full md:max-w-4xl lg:max-w-7xl flex flex-col gap-y-10">
        <div className="bg-[#E6EDFF] mt-24 mb-5 rounded-[30px] shadow-lg w-full flex flex-col md:flex-row gap-y-5 overflow-hidden">
          <div className="w-full md:w-4/7 py-10 flex flex-col items-center justify-center px-6 md:px-10 lg:px-20">
            {imageUrl ? (
              <Image src={`https://is3.cloudhost.id/emub/${imageUrl.replace(/^\/+/, '')}`} alt="Poster" width={400} height={400} className="rounded-xl w-full object-contain" />
            ) : (
              <div className="w-full h-48 bg-gray-200 rounded-xl flex items-center justify-center text-red-500 text-sm">Poster tidak tersedia</div>
            )}
          </div>

          <div className="w-full md:w-3/7 py-10 px-6 sm:px-10 md:px-10 lg:px-20 bg-white z-20 rounded-t-[30px] md:rounded-tr-[0] md:rounded-bl-[30px] flex flex-col" style={{ filter: 'drop-shadow(0 15px 15px rgba(0, 0, 0, 0.30))' }}>
            <h2 className="text-center text-xl md:text-4xl font-bold text-[#002787] mb-4">{workProgram?.title}</h2>

            <div className="flex-1 overflow-y-auto custom-scroll pr-5" style={{ maxHeight: '650px' }}>
              <div>{workProgram?.form?.description || 'Deskripsi tidak tersedia'}</div>
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
            {fields.map((field: Field) => {
              const key = field.id;
              const label = field.label;

              console.log(`Field "${label}" (ID: ${key}) wajib diisi?`, field.isRequired);

              switch (field.type) {
                case 'TEXT':
                  return (
                    <div key={key}>
                      <FieldInput label={label} name={key} value={typeof formData[key] === 'string' ? formData[key] : ''} onChange={(e) => handleChange(key, e.target.value)} />
                      <p className="text-xs text-red-500 mt-1 ml-1 italic">{field.isRequired ? 'Wajib diisi' : 'Opsional'}</p>
                    </div>
                  );

                case 'DROPDOWN':
                  return (
                    <div key={key}>
                      <FieldSelect
                        label={label}
                        name={String(field.id)}
                        options={
                          field.options?.map((opt: FieldOption) => ({
                            label: opt.label,
                            value: opt.id,
                          })) || []
                        }
                        value={typeof formData[key] === 'string' ? (formData[key] as string) : ''}
                        onChange={(val) => handleChange(String(field.id), val)}
                      />
                      <p className="text-xs text-red-500 mt-1 ml-1 italic">{field.isRequired ? 'Wajib diisi' : 'Opsional'}</p>
                    </div>
                  );

                case 'CHECKBOX':
                  return (
                    <div key={key}>
                      <FieldCheckboxGroup
                        name={String(field.id)}
                        label={field.label}
                        options={(field.options ?? []).map((opt: FieldOption) => ({
                          label: opt.label,
                          value: String(opt.id),
                        }))}
                        value={Array.isArray(formData[String(field.id)]) ? (formData[String(field.id)] as string[]) : []}
                        onChange={handleChange}
                      />
                      <p className="text-xs text-red-500 mt-1 ml-1 italic">{field.isRequired ? 'Wajib diisi' : 'Opsional'}</p>
                    </div>
                  );

                case 'UPLOAD':
                  return (
                    <div key={key}>
                      <FieldUpload
                        label={label}
                        name={key}
                        value={Array.isArray(formData[key]) && typeof formData[key][0] === 'object' ? (formData[key] as FileWrapper[]) : []}
                        onChange={handleChange}
                        fileCategories={field.fileCategories}
                        maxFile={field.maxFile}
                        maxFileSize={field.maxFileSize}
                      />
                      <p className="text-xs text-red-500 mt-1 ml-1 italic">{field.isRequired ? 'Wajib diisi' : 'Opsional'}</p>
                    </div>
                  );

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
      {modalMode && (
        <ModalSubmit mode={modalMode} onClose={() => setModalMode(null)} onConfirm={modalMode === 'confirm' ? handleConfirmSubmit : undefined} groupLink={modalMode === 'success' ? workProgram?.form?.groupLink : undefined} slug={slug} />
      )}
      {isLoginModalOpen && (
        <ConfirmLoginModal
          isOpen={true}
          onClose={() => router.push('/')}
          onConfirm={() => {
            const encoded = encodeURIComponent(btoa(JSON.stringify({ slug })));
            window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?...&state=${encoded}`;
          }}
          isOprecPage={true}
          isSessionExpired={isSessionExpired}
          isAuthMissing={!token}
          slug={slug}
        />
      )}
      {notification && <div className="fixed top-[10vw] left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-xl shadow-lg z-50 transition-all">{notification}</div>}
    </div>
  );
}
