import { postType } from "./post.ts";
import { userType } from "./user.ts";
import { commentType } from "./comment.ts";
import { likeType } from "./like.ts";

const baseTypeDefs = `
type Query {
	users: [User]!
	user(username: String!): User!
	posts: [Post]!
	postsByUser(userId: Int!): [Post]!
	commentsByPost(postId: Int!): [Comment]!
	post(id: Int!): Post!
}

type Mutation {
	login(email: String!, password: String!): User!
	register(email: String!, username: String!, password: String!): User!
	updateAvatar(avatar: String!): User!
	createPost(body: String!): Post!
	createComment(postId: Int!, body: String!): Comment!
	createLike(postId: Int!): String!
	deletePost(postId: Int!): Post!
	logout: String!
	validateJwt: User!
}
`;

export const typeDefs = [
  baseTypeDefs,
  postType,
  userType,
  commentType,
  likeType,
].join("\n");
