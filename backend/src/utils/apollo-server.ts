import { ApolloServer } from "@apollo/server";

import { typeDefs } from "../graphql/typedefs/typedefs.ts";
import { Query } from "../graphql/query/index.ts";
import { Mutation } from "../graphql/mutation/index.ts";

const resolvers = {
  Query,
  Mutation,
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export { server };
