import { LIST_NEWS } from "@/graphql/queries/berita/beritaQueries";
import { client } from "@/lib/apolloClient";

interface NewsSlug {
  slug: string;
}

export async function getAllNewsSlugs(): Promise<NewsSlug[]> {
  const { data } = await client.query({
    query: LIST_NEWS,
  });

  return (
    data?.listNews?.news?.map((n: { slug: string }) => ({
      slug: n.slug,
    })) ?? []
  );
}
