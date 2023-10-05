export const CREATE_COMMENT_MUTATION = gql`
  mutation CreateComment($postId: Int!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      body
      createdAt
      user {
        username
      }
    }
  }
`;
