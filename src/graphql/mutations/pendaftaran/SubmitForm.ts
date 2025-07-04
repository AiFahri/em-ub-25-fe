import { gql } from '@apollo/client';

export const INSERT_ANSWER = gql`
  mutation InsertAnswer($input: ValidateInsertAnswerInput!) {
    insertAnswer(input: $input) {
      id
      value
      createdAt
      answerOptionsID
      fieldID
    }
  }
`;

export const SUBMIT_FORM = gql`
  mutation SubmitForm($formID: ID!) {
    submitForm(formID: $formID)
  }
`;
