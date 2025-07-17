import { gql } from '@apollo/client';

export const GET_ALL_WORK_PROGRAM_SLUGS = gql`
  query GetAllWorkProgramSlugs {
    getAllSlugs: listWorkPrograms(input: {}) {
      workPrograms {
        slug
      }
    }
  }
`;
