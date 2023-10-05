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

export const GET_POST = gql`
  query GetPost($id: Int!) {
    post(id: $id) {
      id
      title
      provider
      url
      description
      image
      user {
        username
      }
      comments {
        id
        body
      }
    }
  }
`;
