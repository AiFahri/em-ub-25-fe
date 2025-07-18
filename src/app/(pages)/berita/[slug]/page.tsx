// app/(pages)/berita/[slug]/page.tsx

import BeritaDetailPage from '@/app/(pages)/berita/[slug]/BeritaDetailPage'; // atau dari manapun kamu simpan
import { LIST_NEWS } from '@/graphql/queries/berita/beritaQueries';
import { generateStaticParamsFromQuery } from '@/utils/generateStaticParam';

export async function generateStaticParams() {
  return generateStaticParamsFromQuery({
    query: LIST_NEWS,
    pathKey: 'slug',
    resultPath: 'listNews.news',
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

  return <BeritaDetailPage slug={slug} />;
}
