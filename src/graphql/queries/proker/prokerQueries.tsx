// graphql/queries/proker/prokerQueries.tsx
import { gql } from '@apollo/client';

export const LIST_WORK_PROGRAMS = gql`
  query ListWorkPrograms($input: ListWorkProgramInput!) {
    listWorkPrograms(input: $input) {
      workPrograms {
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
        hasForm
        registerLink
        isGeneral
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
      hasForm
      registerLink
      isGeneral
      form {
        id
        category
        categoryName
        description
        ImageUrl
        isPublished
        groupLink
        acceptedLink
        fileLink
        deadlineAt
        extendedDeadlineAt
        createdAt
        myResponse {
          id
          fillStatus
          applicationStatus
          submittedAt
          createdAt
          answers {
            id
            value
            createdAt
            answerOptionsID
            fieldID
          }
        }
        fields {
          id
          label
          type
          isRequired
          order
          fileCategories
          maxFile
          maxFileSize
          options {
            id
            label
            order
          }
        }
      }
    }
  }
`;
