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

// Kalau kamu pakai dynamicParams di versi terbaru (boleh di-skip kalau generateStaticParams sudah mencakup semua)

export default function Page({ params }: { params: { slug: string } }) {
  return <BeritaDetailPage slug={params.slug} />;
}
