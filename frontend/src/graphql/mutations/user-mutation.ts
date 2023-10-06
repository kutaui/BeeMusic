import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      email
      username
      id
    }
  }
`;

export const REGISTER_MUTATION = gql`
  mutation Register($email: String!, $username: String!, $password: String!) {
    register(email: $email, username: $username, password: $password) {
      email
      username
      id
    }
  }
`;

export const VALIDATE_JWT_MUTATION = gql`
  mutation ValidateJwt {
    validateJwt {
      email
      username
      id
    }
  }
`;

export const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout
  }
`;
