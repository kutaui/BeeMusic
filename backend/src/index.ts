import dotenv from "dotenv";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import cors, { CorsRequest } from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { context } from "./utils/middleware-context.js";
import { server } from "./utils/apollo-server.js";

dotenv.config();

const app = express();

await server.start();

app.use(
  "/",
  cors<CorsRequest>({
    origin: process.env.FRONTEND_URL,
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
