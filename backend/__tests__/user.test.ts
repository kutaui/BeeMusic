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

it("should return all users", async () => {
  const result = await testServer.executeOperation({
    query: `query Users {
   users {
   username
  }
  }`,
  });
  assert(result.body.kind === "single");
  expect(result).toBeTruthy();
  expect(result.body.singleResult.data).toHaveProperty("users");
  expect(result.body.singleResult.errors).toBeFalsy();
}, 10000);

it("should return a user by username", async () => {
  const result = await testServer.executeOperation({
    query: `
            query User($username: String!) {
             user(username: $username) {
             username
            }
            },
            `,
    variables: {
      username: "kutay",
    },
  });
  assert(result.body.kind === "single");
  expect(result).toBeTruthy();
  expect(result.body.singleResult.data).toHaveProperty("user");
  expect(result.body.singleResult.errors).toBeFalsy();
}, 10000);

//works but have to disable generate token in register mutation
//also need to mock prisma to not save stuff t production db
it("should register a user", async () => {
  const result = await testServer.executeOperation({
    query: `     mutation Register($email: String!, $username: String!, $password: String!) {
                 register(email: $email, username: $username, password: $password) {
                 username
                }
                },
                `,
    variables: {
      email: "testingregister1@gmail.com",
      username: "testingregister1",
      password: "testingregister1",
    },
  });
  assert(result.body.kind === "single");
  expect(result).toBeTruthy();
  expect(result.body.singleResult.data).toHaveProperty("register");
  expect(result.body.singleResult.errors).toBeFalsy();
}, 10000);
