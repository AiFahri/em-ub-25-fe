import { DocumentNode } from '@apollo/client';
import { serverApolloClient } from '@/lib/apolloServer';

type GenerateStaticParamsOptions<TData, TItem, TVariables extends object> = {
  query: DocumentNode;
  pathKey: keyof TItem;
  resultPath: string;
  variables?: TVariables;
};

export async function generateStaticParamsFromQuery<TData, TItem extends Record<string, unknown>, TVariables extends object = {}>({ query, pathKey, resultPath, variables }: GenerateStaticParamsOptions<TData, TItem, TVariables>) {
  const { data } = await serverApolloClient.query<TData, TVariables>({
    query,
    variables,
  });

  const pathSegments = resultPath.split('.');

  let current: unknown = data;
  for (const key of pathSegments) {
    if (typeof current === 'object' && current !== null && key in current) {
      current = (current as Record<string, unknown>)[key];
    } else {
      throw new Error(`[generateStaticParamsFromQuery] resultPath "${resultPath}" tidak mengarah ke array`);
    }
  }

  if (!Array.isArray(current)) {
    throw new Error(`[generateStaticParamsFromQuery] resultPath "${resultPath}" tidak mengarah ke array`);
  }

  const items = current as TItem[];

  return items.map((item) => ({
    [pathKey]: item[pathKey],
  }));
}
