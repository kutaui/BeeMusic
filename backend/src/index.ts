import dotenv from "dotenv";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import cors, { CorsRequest } from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { typeDefs } from "./graphql/typedefs/typedefs.js";
import { context } from "./utils/middleware-context.js";
import { Query } from "./graphql/query/index.js";
import { Mutation } from "./graphql/mutation/index.js";

dotenv.config();

const resolvers = {
  Query,
  Mutation,
};

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

await server.start();

app.use(
  "/",
  cors<CorsRequest>({
    origin: ["http://localhost:3000", "http://192.168.1.110:3000"],
    credentials: true,
  }),
  bodyParser.json(),
  cookieParser(),
  expressMiddleware(server, {
    context,
  }),
);

app.listen(4000, () => {
  console.log("Server is listening on port 4000");
});
