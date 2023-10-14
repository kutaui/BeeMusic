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

it("should return all posts", async () => {
  const result = await testServer.executeOperation({
    query: `query Posts {
   posts {
   title
  }
  }`,
  });
  assert(result.body.kind === "single");
  expect(result).toBeTruthy();
  expect(result.body.singleResult.data).toHaveProperty("posts");
  expect(result.body.singleResult.errors).toBeFalsy();
}, 10000);

it("should return posts by user", async () => {
  const result = await testServer.executeOperation({
    query: `
    query PostsByUser($userId: Int!) {
     postsByUser(userId: $userId) {
     title
    }
    },
    `,
    variables: {
      userId: 1,
    },
  });
  assert(result.body.kind === "single");
  expect(result).toBeTruthy();
  expect(result.body.singleResult.data).toHaveProperty("postsByUser");
  expect(result.body.singleResult.errors).toBeFalsy();
}, 10000);

it("should return error if user not found", async () => {
  const result = await testServer.executeOperation({
    query: `
    query PostsByUser($userId: Int!) {
     postsByUser(userId: $userId) {
     title
    }
    },
    `,
    variables: {
      userId: 999,
    },
  });
  assert(result.body.kind === "single");
  expect(result).toBeTruthy();
  expect(result.body.singleResult.errors).toBeTruthy();
  expect(result.body.singleResult.data).toBeFalsy();
});

it("should return post by id", async () => {
  const result = await testServer.executeOperation({
    query: `
        query Post($id: Int!) {
         post(id: $id) {
         title
        }
        },
        `,
    variables: {
      id: 1,
    },
  });
  assert(result.body.kind === "single");
  expect(result).toBeTruthy();
  expect(result.body.singleResult.data).toHaveProperty("post");
  expect(result.body.singleResult.errors).toBeFalsy();
});
