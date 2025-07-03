import { gql } from "@apollo/client";

export const GET_NEWS = gql`
  query GetNews($id: ID!) {
    getNews(id: $id) {
      id
      slug
      title
      content
      status
      ministryID
      ministryName
      categoryID
      categoryName
      imageUrls
      publishedAt
      createdAt
    }
  }
`;
