import { UserQuery } from './user-query.js';
import { PostQuery } from './post-query.js';

export const Query = {
    ...UserQuery,
    ...PostQuery
}