import { gql } from "@apollo/client";

export const LIKE_MUTATION = gql`
  mutation CreateLike($postId: Int!) {
    createLike(postId: $postId)
  }
`;
