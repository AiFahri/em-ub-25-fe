import { gql } from '@apollo/client';

export const INSERT_ANSWER = gql`
  mutation InsertAnswer($input: InsertAnswerInput!) {
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

export const CREATE_RESPONSE = gql`
  mutation CreateResponse($formID: ID!) {
    createResponse(formID: $formID) {
      id
    }
  }
`;

export const UPDATE_FORM = gql`
  mutation UpdateForm {
    updateForm {
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
    }
  }
`;

