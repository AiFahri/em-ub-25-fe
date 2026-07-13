// lib/apollo-server.ts
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core';
import { mockLink } from '@/lib/mockLink';
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

export const serverApolloClient = new ApolloClient({
  link: USE_MOCK
    ? mockLink
    : new HttpLink({
        uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!,
      }),
  cache: new InMemoryCache(),
});
