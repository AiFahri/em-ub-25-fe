// graphql/queries/getWorkPrograms.ts
import { gql } from '@apollo/client';

export const GET_WORK_PROGRAMS = gql`
  query GetWorkPrograms($input: ListWorkProgramInput!) {
    listWorkPrograms(input: $input) {
      workPrograms {
        id
        title
        form {
          id
          ImageUrl
          fileLink
          fields {
            id
            label
            type
            order
            options {
              id
              label
            }
          }
        }
      }
    }
  }
`;
