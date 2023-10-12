import { Response } from "express";
import { db } from "../../utils/db.ts";
import { throwError } from "../../utils/throw-error.ts";

const createComment = async (
  _: unknown,
  { body, postId }: { body: string; postId: number },
  context: { userId: number; res: Response },
) => {
  const { userId, res } = context;
  if (!userId) {
    res.clearCookie("token");
    return throwError("Invalid JWT token.", "INVALID_TOKEN");
  }
  try {
    return db.comment.create({
      data: {
        body,
        post: {
          connect: { id: postId },
        },
        user: {
          connect: { id: userId },
        },
      },
      include: {
        user: true,
      },
    });
  } catch (error) {
    console.log(error);
    return throwError("Error creating comment.", "COMMENT_CREATION_ERROR");
  }
};

export const commentMutation = {
  createComment,
};
