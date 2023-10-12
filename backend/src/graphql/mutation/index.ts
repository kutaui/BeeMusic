import { userMutation } from "./user-mutation.ts";
import { postMutation } from "./post-mutation.ts";
import { commentMutation } from "./comment-mutation.ts";
import { likeMutation } from "./like-mutation.ts";

export const Mutation = {
  ...userMutation,
  ...postMutation,
  ...commentMutation,
  ...likeMutation,
};
