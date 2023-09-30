import { userMutation } from './user-mutation.js';
import { postMutation } from './post-mutation.js';

export const Mutation = {
    ...userMutation,
    ...postMutation
};