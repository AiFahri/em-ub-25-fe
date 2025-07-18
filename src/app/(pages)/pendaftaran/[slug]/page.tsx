// src/app/(pages)/pendaftaran/[slug]/page.tsx

import { generateStaticParamsFromQuery } from '@/utils/generateStaticParam';
import { GET_ALL_WORK_PROGRAM_SLUGS } from '@/graphql/queries/proker/listSlug';
import FormPendaftaranClient from './FormPendaftaranClient';

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return <FormPendaftaranClient slug={slug} />;
}

export async function generateStaticParams() {
  return generateStaticParamsFromQuery({
    query: GET_ALL_WORK_PROGRAM_SLUGS,
    pathKey: 'slug',
    resultPath: 'getAllSlugs.workPrograms',
  });
}
