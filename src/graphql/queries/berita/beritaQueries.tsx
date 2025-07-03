import { gql } from "@apollo/client";

export const LIST_NEWS = gql`
  query ListNews3 {
    listNews(input: { orderBy: ID_DESC }) {
      news {
        slug
        title
        content
        imageUrls
        publishedAt
        id
        categoryName
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
