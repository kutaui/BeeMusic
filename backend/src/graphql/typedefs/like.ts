export const likeType = `
    type Like {
        id: ID!
        user: User
        userId: ID!
        post: Post!
        postId: ID!
        comment: Comment!
        commentId: ID!
        createdAt: String
    }
`;
