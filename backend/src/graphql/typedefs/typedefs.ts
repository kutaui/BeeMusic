import { postType } from "./post.js";
import { userType } from "./user.js";

const baseTypeDefs = `
type Query {
	users: [User!]
	user(username: String!): User!
	posts: [Post!]
	postsByUser: [Post]!
}

type Mutation {
	login(email: String!, password: String!): User!
	register(email: String!, username: String!, password: String!): User!
	createPost(body: String!): Post!
	deletePost(postId: Int!): String!
	logout: String!
	validateJwt: User!
}
`;

export const typeDefs = [baseTypeDefs, postType, userType].join("\n");
