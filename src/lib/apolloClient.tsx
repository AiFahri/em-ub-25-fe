'use client';

import { ApolloClient, InMemoryCache, ApolloProvider as ApolloHooksProvider, HttpLink, from } from '@apollo/client';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';
import { mockLink } from '@/lib/mockLink';
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

const uploadLink = createUploadLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
}) as HttpLink;

const link = USE_MOCK ? from([mockLink]) : from([uploadLink]);

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export const ApolloProvider = ({ children }: { children: React.ReactNode }) => <ApolloHooksProvider client={client}>{children}</ApolloHooksProvider>;
