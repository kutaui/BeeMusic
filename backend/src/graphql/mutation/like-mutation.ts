import { db } from "../../utils/db.ts";
import { throwError } from "../../utils/throw-error.ts";
import { Response } from "express";

const createLike = async (
  _: unknown,
  args: { postId: number },
  context: { userId: number; res: Response },
) => {
  const { postId } = args;
  const { userId, res } = context;

  if (!userId) {
    res.clearCookie("token");
    return throwError("Invalid JWT token.", "INVALID_TOKEN");
  }

  try {
    const like = await db.like.findFirst({
      where: {
        postId,
        userId,
      },
    });
    if (like) {
      await db.like.delete({
        where: {
          id: like.id,
        },
      });
      return "Like removed.";
    }
    await db.like.create({
      data: {
        postId,
        userId,
      },
    });
    return "Like created.";
  } catch (e) {
    console.log(e);
  }
};

export const likeMutation = {
  createLike,
};
