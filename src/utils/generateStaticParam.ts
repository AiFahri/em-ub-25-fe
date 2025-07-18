import { DocumentNode } from '@apollo/client';
import { serverApolloClient } from '@/lib/apolloServer';

// Generic type untuk GraphQL response
interface GraphQLResponse<T = unknown> {
  data: T;
}

// Type untuk item yang memiliki property yang bisa digunakan sebagai path
interface PathItem {
  [key: string]: string | number;
}

// Type untuk struktur nested object
type NestedObject = Record<string, unknown>;

// Type untuk variables yang dikirim ke GraphQL
interface GraphQLVariables {
  [key: string]: unknown;
}

// Type untuk parameter fungsi
interface GenerateStaticParamsOptions<T extends PathItem> {
  query: DocumentNode;
  pathKey: keyof T;
  resultPath: string;
  variables?: GraphQLVariables;
}

// Type untuk return value generateStaticParams
interface StaticParam {
  [key: string]: string;
}

// Helper function untuk mengakses nested object secara type-safe
function getNestedValue(obj: NestedObject, path: string): unknown {
  return path.split('.').reduce((current: unknown, key: string) => {
    if (current && typeof current === 'object' && !Array.isArray(current)) {
      return (current as NestedObject)[key];
    }
    return undefined;
  }, obj);
}

// Helper function untuk validasi apakah value adalah array
function isValidArray(value: unknown): value is PathItem[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'object' && item !== null && !Array.isArray(item));
}

export async function generateStaticParamsFromQuery<T extends PathItem>({ query, pathKey, resultPath, variables = {} }: GenerateStaticParamsOptions<T>): Promise<StaticParam[]> {
  try {
    const { data }: GraphQLResponse = await serverApolloClient.query({
      query,
      variables,
    });

    // Mengakses nested property secara type-safe
    const items = getNestedValue(data as NestedObject, resultPath);

    // Validasi apakah items adalah array yang valid
    if (!isValidArray(items)) {
      throw new Error(`[generateStaticParamsFromQuery] resultPath "${resultPath}" tidak mengarah ke array yang valid. ` + `Ditemukan: ${typeof items}`);
    }

    // Map items ke format yang dibutuhkan generateStaticParams
    return items.map((item: PathItem): StaticParam => {
      const pathValue = item[pathKey as string];

      // Validasi apakah pathKey exists dan bernilai string/number
      if (pathValue === undefined || pathValue === null) {
        throw new Error(`[generateStaticParamsFromQuery] pathKey "${String(pathKey)}" tidak ditemukan dalam item: ${JSON.stringify(item)}`);
      }

      // Convert ke string untuk URL path
      const stringValue = String(pathValue);

      return {
        [pathKey as string]: stringValue,
      };
    });
  } catch (error) {
    console.error('[generateStaticParamsFromQuery] Error:', error);
    throw error;
  }
}
