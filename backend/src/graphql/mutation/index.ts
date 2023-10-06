import { userMutation } from "./user-mutation.js";
import { postMutation } from "./post-mutation.js";
import { commentMutation } from "./comment-mutation.js";
import { likeMutation } from "./like-mutation.js";

export const Mutation = {
  ...userMutation,
  ...postMutation,
  ...commentMutation,
  ...likeMutation,
};
