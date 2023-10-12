import { UserQuery } from "./user-query.js";
import { PostQuery } from "./post-query.js";
import { commentQuery } from "./comment-query.js";

export const Query = {
  ...UserQuery,
  ...PostQuery,
  ...commentQuery,
};
