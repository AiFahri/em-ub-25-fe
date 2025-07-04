import { gql } from '@apollo/client';

export const GET_LANDING_PAGE_DATA = gql`
  query ListWorkPrograms {
    listWorkPrograms(input: {}) {
      workPrograms {
        title
        id
        content
        ministryID
        status
      }
    }
    listNews(input: { orderBy: ID_DESC }) {
      news {
        id
        title
        content
        ministryID
        publishedAt
        createdAt
        imageUrls
      }
    }
    listLinks(input: {}) {
      links {
        id
        title
        url
      }
    }
  }
`;
