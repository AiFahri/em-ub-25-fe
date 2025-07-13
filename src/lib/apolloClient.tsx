'use client';

import { ApolloClient, InMemoryCache, ApolloProvider as ApolloHooksProvider, HttpLink, from } from '@apollo/client';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';
import { generateTraceId } from '@/utils/trace';

const uploadLink = createUploadLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
}) as HttpLink;

const link = from([uploadLink]);

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export const ApolloProvider = ({ children }: { children: React.ReactNode }) => <ApolloHooksProvider client={client}>{children}</ApolloHooksProvider>;
