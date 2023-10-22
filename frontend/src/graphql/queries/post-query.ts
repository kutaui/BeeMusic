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
        avatar
      }
      comments {
        id
        body
      }
      likes {
        id
        postId
        userId
      }
    }
  }
`;

export const GET_POSTS_BY_USER = gql`
  query GetPostsByUser($userId: Int!) {
    postsByUser(userId: $userId) {
      id
      title
      provider
      url
      description
      image
      user {
        username
        avatar
      }
      likes {
        id
        postId
        userId
      }
      comments {
        id
        body
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
        avatar
      }
      comments {
        id
        body
        user {
          avatar
          username
        }
      }
      likes {
        id
        postId
        userId
      }
    }
  }
`;

export const GET_POSTS_BY_FOLLOWING = gql`
  query GetPostsByFollowing($userId: Int!) {
    postsByFollowedUsers(userId: $userId) {
      id
      title
      provider
      url
      description
      image
      user {
        username
        avatar
      }
      likes {
        id
        postId
        userId
      }
      comments {
        id
        body
      }
    }
  }
`;
