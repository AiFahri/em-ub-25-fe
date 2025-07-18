// src/app/(pages)/proker/[slug]/page.tsx
import { generateStaticParamsFromQuery } from '@/utils/generateStaticParam';
import { LIST_WORK_PROGRAMS } from '@/graphql/queries/proker/prokerQueries';
import ProkerDetailPage from './ProkerDetailPage';

export async function generateStaticParams() {
  return generateStaticParamsFromQuery({
    query: LIST_WORK_PROGRAMS,
    pathKey: 'slug',
    resultPath: 'listWorkPrograms.workPrograms',
    variables: {
      input: {
        keyword: '',
        orderBy: 'ID_DESC',
      },
    },
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return <ProkerDetailPage slug={slug} />;
}
