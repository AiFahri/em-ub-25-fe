// utils/generateStaticParams.ts

import { DocumentNode } from '@apollo/client';
import { serverApolloClient } from '@/lib/apolloServer';

export async function generateStaticParamsFromQuery({ query, pathKey, resultPath, variables = {} }: { query: DocumentNode; pathKey: string; resultPath: string; variables?: Record<string, any> }) {
  const { data } = await serverApolloClient.query({ query, variables });

  const items = resultPath.split('.').reduce((obj, key) => obj?.[key], data);

  if (!Array.isArray(items)) {
    throw new Error(`[generateStaticParamsFromQuery] resultPath "${resultPath}" tidak mengarah ke array`);
  }

  return items.map((item: any) => ({
    [pathKey]: item[pathKey],
  }));
}
