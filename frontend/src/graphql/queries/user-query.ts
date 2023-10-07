import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query GetUsers {
    users {
      username
      avatar
    }
  }
`;

export const GET_USER = gql`
  query GetUser($username: String!) {
    user(username: $username) {
      username
      id
      avatar
      posts {
        id
        title
        provider
        url
        description
        image
      }
      likes {
        id
        userId
        postId
      }
      comments {
        id
        body
      }
    }
  }
`;
