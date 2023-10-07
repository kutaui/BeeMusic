export const userType = `
type User {
	id: ID!
	username: String!
	email: String!
	avatar: String!
	posts: [Post]
	comments: [Comment]
	likes: [Like]
}
`;
