import { Response } from 'express';
import { db } from '../../utils/db.js';
import { throwError } from '../../utils/throw-error.js';

const createPost = async (_: unknown, {body}: { body: string }, context: { userId: number, res: Response }) => {
    const {userId, res} = context;

    if (!userId) {
        // clear the cookie if the token is invalid
        res.clearCookie('token');
        return throwError('Invalid JWT token.', 'INVALID_TOKEN');
    }
    try {
        return db.post.create({
            data: {
                body,
                user: {
                    connect: {id: userId}
                }
            },
            include: {
                user: true
            }
        });
    } catch (error) {
        console.log(error);
        return throwError('Error creating post.', 'POST_CREATION_ERROR');

    }
};

const deletePost = async (_: unknown, {postId}: { postId: number }, context: { userId: number, res: Response }) => {
    const {userId, res} = context;
    if (!userId) {
        // clear the cookie if the token is invalid
        res.clearCookie('token')
        return throwError('Invalid JWT token.', 'INVALID_TOKEN');

    }

    try {
        const post = await db.post.delete({
            where: {
                id: postId
            }
        });
        return 'Post deleted successfully.';
    } catch (error) {
        return throwError('Error deleting post.', 'POST_DELETION_ERROR');
    }
};

export const postMutation = {
    createPost,
    deletePost
};