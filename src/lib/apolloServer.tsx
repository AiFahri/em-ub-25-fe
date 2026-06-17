// lib/apollo-server.ts
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core';

export const serverApolloClient = new ApolloClient({
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!,
  }),
  cache: new InMemoryCache(),
});
