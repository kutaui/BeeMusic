export const userType = `
type User {
	id: ID!
	username: String!
	email: String!
	posts: [Post]
}
`