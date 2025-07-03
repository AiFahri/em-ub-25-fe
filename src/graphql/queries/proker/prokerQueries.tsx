// graphql/queries/proker/prokerQueries.tsx
import { gql } from '@apollo/client';

export const LIST_WORK_PROGRAMS = gql`
  query ListWorkPrograms {
    listWorkPrograms(input: { orderBy: ID_DESC }) {
      workPrograms {
        slug
        title
        status
        isMegaBesar
        imageUrls
        ministryName
      }
    }
  }
`;

export const GET_WORK_PROGRAM_BY_SLUG = gql`
  query GetWorkProgramBySlug($slug: String!) {
    getWorkProgramBySlug(slug: $slug) {
      id
      slug
      title
      content
      status
      ministryID
      ministryName
      isMegaBesar
      instagramUrl
      imageUrls
      createdAt
    }
  }
`;