import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      title
      provider
      url
      description
      image

      user {
        username
      }
    }
  }
`;

export const GET_POSTS_BY_USER = gql`
  query GetPostsByUser {
    postsByUser {
      id
      body
      user {
        username
      }
    }
  }
`;
