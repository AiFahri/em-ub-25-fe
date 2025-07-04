import { gql } from "@apollo/client";

export const GET_NEWS = gql`
  query GetNews($id: ID!) {
    getNews(id: $id) {
      id
      title
      content
      publishedAt
      categoryName
      imageUrls
      ministryName
    }
  }
`;

export const LIST_NEWS = gql`
  query ListNews3 {
    listNews(input: { orderBy: ID_DESC }) {
      news {
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
      pagination {
        totalData
        totalPages
        limit
        page
      }
    }
  }
`;
