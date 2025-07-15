import { gql } from "@apollo/client";

export const GET_NEWS_BY_SLUG = gql`
  query GetNewsBySlug($slug: String!) {     
    getNewsBySlug(slug: $slug) {             
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
