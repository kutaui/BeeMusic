export const commentType = `
    type Comment {
        id: ID!
        body: String!
        user: User!
        userId: ID!
        post: Post!
        postId: ID!
        createdAt: String
    }
`;
