// lib/apolloClient.ts
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as ApolloHooksProvider,
  HttpLink,
  from,
} from "@apollo/client";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

const uploadLink = createUploadLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT, // pake endpoint ayas
}) as HttpLink;

const link = from([uploadLink]);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export const ApolloProvider = ({ children }: { children: React.ReactNode }) => (
  <ApolloHooksProvider client={client}>{children}</ApolloHooksProvider>
);
