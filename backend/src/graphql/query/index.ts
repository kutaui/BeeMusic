import { UserQuery } from "./user-query.ts";
import { PostQuery } from "./post-query.ts";
import { commentQuery } from "./comment-query.ts";

export const Query = {
  ...UserQuery,
  ...PostQuery,
  ...commentQuery,
};
