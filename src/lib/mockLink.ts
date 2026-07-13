/**
 * ============================================================================
 *  MOCK APOLLO LINK
 * ============================================================================
 */

import { ApolloLink, Observable, FetchResult, Operation } from '@apollo/client';
import { FieldNode, OperationDefinitionNode } from 'graphql';
import {
  mockLinks,
  mockNews,
  mockWorkPrograms,
  MockNews,
  MockWorkProgram,
} from '@/data/mock/emMockData';

/* ---- util: ambil daftar root field (name + alias + argumen) ---- */

interface RootField {
  /** nama field asli di schema, mis. "listWorkPrograms" */
  name: string;
  /** key yang harus dipakai di objek respons (alias kalau ada) */
  responseKey: string;
}

function getRootFields(operation: Operation): RootField[] {
  const opDef = operation.query.definitions.find(
    (d): d is OperationDefinitionNode => d.kind === 'OperationDefinition'
  );
  if (!opDef) return [];

  return opDef.selectionSet.selections
    .filter((sel): sel is FieldNode => sel.kind === 'Field')
    .map((field) => ({
      name: field.name.value,
      responseKey: field.alias?.value ?? field.name.value,
    }));
}

/* ---- pagination info standar (dipakai listNews) ---- */

function paginationOf(total: number) {
  return {
    __typename: 'Pagination',
    totalData: total,
    totalPages: 1,
    limit: total,
    page: 1,
  };
}

/* ---- resolver per root field ---- */

function resolveField(
  field: RootField,
  variables: Record<string, unknown>
): unknown {
  const { name } = field;

  switch (name) {
    /* ---------------- Tautan Pintas ---------------- */
    case 'listLinks':
      return {
        __typename: 'ListLinksResponse',
        links: mockLinks.map((l) => ({ __typename: 'Link', ...l })),
      };

    /* ---------------- Berita ---------------- */
    case 'listNews':
      return {
        __typename: 'ListNewsResponse',
        news: mockNews.map((n) => withNewsTypename(n)),
        pagination: paginationOf(mockNews.length),
      };

    case 'getNewsBySlug': {
      const slug = String(variables.slug ?? '');
      const found = mockNews.find((n) => n.slug === slug) ?? mockNews[0];
      return withNewsTypename(found);
    }

    case 'getNews': {
      const id = String(variables.id ?? '');
      const found = mockNews.find((n) => n.id === id) ?? mockNews[0];
      return withNewsTypename(found);
    }

    /* ---------------- Program Kerja ---------------- */
    case 'listWorkPrograms': {
      const input = (variables.input ?? {}) as {
        keyword?: string;
        hasOpenRecruitment?: boolean;
        isMegaBesar?: boolean;
      };

      let list = mockWorkPrograms;
      if (input.keyword && input.keyword.trim() !== '') {
        const kw = input.keyword.toLowerCase();
        list = list.filter((wp) => wp.title.toLowerCase().includes(kw));
      }
      if (input.hasOpenRecruitment === true) {
        list = list.filter((wp) => wp.hasForm);
      }
      if (input.isMegaBesar === true) {
        list = list.filter((wp) => wp.isMegaBesar);
      }

      return {
        __typename: 'ListWorkProgramsResponse',
        workPrograms: list.map((wp) => withWorkProgramTypename(wp)),
      };
    }

    case 'getWorkProgramBySlug': {
      const slug = String(variables.slug ?? '');
      const found =
        mockWorkPrograms.find((wp) => wp.slug === slug) ?? mockWorkPrograms[0];
      return withWorkProgramTypename(found);
    }

    /* ---------------- Mutations (form & auth) ---------------- */
    case 'insertAnswer':
      return {
        __typename: 'Answer',
        id: `ans-${Date.now()}`,
        value: (variables.input as { value?: string[] })?.value ?? [],
        createdAt: new Date().toISOString(),
        answerOptionsID: null,
        fieldID: (variables.input as { fieldID?: string })?.fieldID ?? '',
      };

    case 'submitForm':
      // Bentuk respons submitForm ada dua versi di codebase:
      // - Boolean (mutations/pendaftaran/SubmitForm.ts)
      // - { success, message } (mutations/submitForm.ts)
      // Kembalikan objek; kalau query minta scalar, Apollo akan pakai apa adanya.
      return {
        __typename: 'SubmitFormResponse',
        success: true,
        message: 'Formulir berhasil dikirim (mode demo).',
      };

    case 'createResponse':
      return { __typename: 'Response', id: `resp-${Date.now()}` };

    case 'updateForm':
      return {
        __typename: 'Form',
        myResponse: null,
      };

    case 'oAuthCallback':
      // Login demo — kembalikan token dummy agar alur pendaftaran bisa diteruskan.
      return {
        __typename: 'OAuthCallbackResponse',
        accessToken: 'demo-token',
        user: {
          __typename: 'User',
          id: 'user-demo',
          name: 'Mahasiswa Brawijaya',
          email: 'demo@student.ub.ac.id',
        },
      };

    default:
      // Field tak dikenal → null (aman, tidak menyebabkan crash).
      return null;
  }
}

/* ---- helper penambah __typename bertingkat ---- */

function withNewsTypename(n: MockNews) {
  return { __typename: 'News', ...n };
}

function withWorkProgramTypename(wp: MockWorkProgram) {
  const form = wp.form
    ? {
        __typename: 'Form',
        ...wp.form,
        // myResponse selalu null pada data demo (belum ada respons user).
        myResponse: null,
        fields: wp.form.fields.map((f) => ({
          __typename: 'Field',
          ...f,
          options: f.options.map((o) => ({ __typename: 'FieldOption', ...o })),
        })),
      }
    : null;

  return { __typename: 'WorkProgram', ...wp, form };
}

/* ---- ApolloLink ---- */

export const mockLink = new ApolloLink((operation: Operation) => {
  return new Observable<FetchResult>((observer) => {
    const rootFields = getRootFields(operation);
    const variables = (operation.variables ?? {}) as Record<string, unknown>;

    const data: Record<string, unknown> = {};
    for (const field of rootFields) {
      data[field.responseKey] = resolveField(field, variables);
    }

    // Simulasikan sedikit latensi jaringan agar skeleton loading tetap terlihat.
    const timer = setTimeout(() => {
      observer.next({ data });
      observer.complete();
    }, 150);

    return () => clearTimeout(timer);
  });
});
