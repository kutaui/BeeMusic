import { db } from '../../utils/db.js';

export const PostQuery = {
    posts: async () => {
        return db.post.findMany({
            include: {
                user: true
            }
        });

    }
};