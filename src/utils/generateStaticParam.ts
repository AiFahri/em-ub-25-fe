import { DocumentNode } from '@apollo/client';
import { serverApolloClient } from '@/lib/apolloServer';

interface GraphQLResponse<T = unknown> {
  data: T;
}

interface PathItem {
  [key: string]: string | number;
}

type NestedObject = Record<string, unknown>;

interface GraphQLVariables {
  [key: string]: unknown;
}

interface GenerateStaticParamsOptions<T extends PathItem> {
  query: DocumentNode;
  pathKey: keyof T;
  resultPath: string;
  variables?: GraphQLVariables;
}

interface StaticParam {
  [key: string]: string;
}

function getNestedValue(obj: NestedObject, path: string): unknown {
  return path.split('.').reduce((current: unknown, key: string) => {
    if (current && typeof current === 'object' && !Array.isArray(current)) {
      return (current as NestedObject)[key];
    }
    return undefined;
  }, obj);
}

function isValidArray(value: unknown): value is PathItem[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'object' && item !== null && !Array.isArray(item));
}

export async function generateStaticParamsFromQuery<T extends PathItem>({ query, pathKey, resultPath, variables = {} }: GenerateStaticParamsOptions<T>): Promise<StaticParam[]> {
  try {
    const { data }: GraphQLResponse = await serverApolloClient.query({
      query,
      variables,
    });

    const items = getNestedValue(data as NestedObject, resultPath);

    if (!isValidArray(items)) {
      throw new Error(`[generateStaticParamsFromQuery] resultPath "${resultPath}" tidak mengarah ke array yang valid. ` + `Ditemukan: ${typeof items}`);
    }

    return items.map((item: PathItem): StaticParam => {
      const pathValue = item[pathKey as string];

      if (pathValue === undefined || pathValue === null) {
        throw new Error(`[generateStaticParamsFromQuery] pathKey "${String(pathKey)}" tidak ditemukan dalam item: ${JSON.stringify(item)}`);
      }

      const stringValue = String(pathValue);

      return {
        [pathKey as string]: stringValue,
      };
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn(`[generateStaticParamsFromQuery] Tidak bisa mengambil static params untuk "${resultPath}": ${message}. Build dilanjutkan tanpa pre-render slug.`);
    return [];
  }
}
