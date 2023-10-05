import { postType } from "./post.js";
import { userType } from "./user.js";
import { commentType } from "./comment.js";

const baseTypeDefs = `
type Query {
	users: [User!]
	user(username: String!): User!
	posts: [Post!]
	postsByUser: [Post]!
	commentsByPost(postId: Int!): [Comment]!
	post(id: Int!): Post!
}

type Mutation {
	login(email: String!, password: String!): User!
	register(email: String!, username: String!, password: String!): User!
	createPost(body: String!): Post!
	createComment(postId: Int!, body: String!): Comment!
	deletePost(postId: Int!): String!
	logout: String!
	validateJwt: User!
}
`;

export const typeDefs = [baseTypeDefs, postType, userType, commentType].join(
  "\n",
);
