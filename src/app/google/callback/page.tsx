// src/app/google/callback/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';

const OAUTH_CALLBACK = gql`
  mutation OAuthCallback($code: String!) {
    oAuthCallback(code: $code) {
      accessToken
      user {
        id
        name
        email
      }
    }
  }
`;

export default function GoogleCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  const [runCallback, { data, loading, error }] = useMutation(OAUTH_CALLBACK);


  useEffect(() => {
    if (code && state) {
      runCallback({ variables: { code, state } });
    }
  }, [code, state]);

  useEffect(() => {
    if (data?.oAuthCallback?.accessToken) {
      localStorage.setItem('token', data.oAuthCallback.accessToken);

      const decoded = JSON.parse(atob(decodeURIComponent(state!)));
      const slug = decoded.slug;

      router.push(`/pendaftaran/${slug}`);
    }
  }, [data]);

  if (loading) return <p className="text-center mt-10">Sedang login...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Login gagal: {error.message}</p>;

  return null;
}
