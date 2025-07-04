import { gql } from '@apollo/client';

export const SUBMIT_FORM = gql`
  mutation SubmitForm($input: SubmitFormInput!) {
    submitForm(input: $input) {
      success
      message
    }
  }
`;
