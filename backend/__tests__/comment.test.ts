import { ApolloServer } from "@apollo/server";
import { Query } from "../src/graphql/query";
import { Mutation } from "../src/graphql/mutation";
import { typeDefs } from "../src/graphql/typedefs/typedefs";
import assert = require("assert");

const resolvers = {
  Query,
  Mutation,
};
const testServer = new ApolloServer({
  typeDefs,
  resolvers,
});

it("should return comments by post", async () => {
  const result = await testServer.executeOperation({
    query: `
        query CommentsByPost($postId: Int!) {
         commentsByPost(postId: $postId) {
         body
        }
        },
        `,
    variables: {
      postId: 1,
    },
  });
  assert(result.body.kind === "single");
  expect(result).toBeTruthy();
  expect(result.body.singleResult.data).toHaveProperty("commentsByPost");
  expect(result.body.singleResult.errors).toBeFalsy();
});
