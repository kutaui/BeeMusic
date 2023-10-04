import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query GetUsers {
    users {
      username
    }
  }
`;

export const GET_USER = gql`
  query GetUser($username: String!) {
    user(username: $username) {
      username
      posts {
        id
        title
        provider
        url
        description
        image
      }
    }
  }
`;
