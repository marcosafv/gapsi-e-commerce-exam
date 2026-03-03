import { gql } from 'apollo-angular';

export const CREATE_VISITOR = gql`
  mutation CreateVisitor {
    createVisitorResponse
      @rest(type: "CreateVisitorResponse", path: "visitors", method: "POST") {
      code
      description
      data {
        type
        visitorId
        welcome
        version
      }
    }
  }
`;
