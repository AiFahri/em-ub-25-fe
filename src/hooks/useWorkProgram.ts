import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { GET_WORK_PROGRAMS } from '@/graphql/queries/getWorkPrograms';

export interface WorkProgramField {
  id: string;
  label: string;
  type: 'TEXT' | 'DROPDOWN' | 'CHECKBOX' | 'UPLOAD';
  order: number;
  isRequired: boolean;
  options?: {
    id: string;
    label: string;
    order: number;
  }[];
  fileCategories?: string[];
  maxFile?: number;
  maxFileSize?: number;
}

export interface WorkProgramForm {
  id: string;
  fields: WorkProgramField[];
  category: string;
  categoryName: string;
  isPublished: boolean;
  groupLink?: string;
}

export interface WorkProgram {
  id: string;
  title: string;
  form?: WorkProgramForm;
}

type FormValue = string | string[] | File[];

export function useWorkProgramForm(workProgramId?: string) {
  const { data, loading, error } = useQuery(GET_WORK_PROGRAMS);
  const [formData, setFormData] = useState<Record<string, FormValue>>({});

  const selectedProgram: WorkProgram | undefined = data?.listWorkPrograms?.workPrograms.find((wp: WorkProgram) => wp.id === workProgramId);

  const fields: WorkProgramField[] = selectedProgram?.form?.fields?.sort((a, b) => a.order - b.order) || [];

  const handleChange = (name: string, value: FormValue) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return {
    loading,
    error,
    fields,
    formData,
    setFormData,
    handleChange,
    formInfo: selectedProgram?.form,
    programTitle: selectedProgram?.title,
  };
}
