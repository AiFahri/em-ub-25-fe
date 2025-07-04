import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { GET_WORK_PROGRAMS } from '@/graphql/queries/getWorkPrograms';

export function useWorkProgramForm(workProgramId?: string) {
  const { data, loading, error } = useQuery(GET_WORK_PROGRAMS);
  const [formData, setFormData] = useState<Record<string, any>>({});

  const selectedProgram = data?.listWorkPrograms?.workPrograms.find((wp: any) => wp.id === workProgramId);

  const fields = selectedProgram?.form?.fields?.sort((a: any, b: any) => a.order - b.order) || [];

  const handleChange = (name: string, value: any) => {
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
