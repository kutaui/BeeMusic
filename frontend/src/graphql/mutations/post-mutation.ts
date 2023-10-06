import { gql } from "@apollo/client";

export const CREATE_POST_MUTATION = gql`
  mutation CreatePost($body: String!) {
    createPost(body: $body) {
      id
    }
  }
`;
