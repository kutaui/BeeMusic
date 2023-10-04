import { db } from "../../utils/db.js";
import { throwError } from "../../utils/throw-error.js";
import { Response } from "express";

export const PostQuery = {
  posts: async () => {
    return db.post.findMany({
      include: {
        user: true,
      },
    });
  },
  postsByUser: async (
    _: unknown,
    __: unknown,
    context: { userId: number; res: Response },
  ) => {
    const { userId, res } = context;

    if (!userId) {
      res.clearCookie("token");
      return throwError("Invalid JWT token.", "INVALID_TOKEN");
    }

    return db.post.findMany({
      where: {
        userId,
      },
      include: {
        user: true,
      },
    });
  },
};
