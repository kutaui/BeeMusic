export const postType = `

type Post {
	id: ID!
    title: String!
    description: String!
    image: String!
    url: String!
    provider: String!
	user: User!
	userId: ID!
	createdAt: String
}
`;
