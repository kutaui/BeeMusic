import { db } from "../../utils/db.js";
import { Response } from "express";
import { throwError } from "../../utils/throw-error.js";

export const UserQuery = {
  users: async () => {
    return db.user.findMany();
  },
  user: async (
    _: any,
    { username }: { username: string },
    { res }: { res: Response },
  ) => {
    const user = await db.user.findUnique({
      where: { username },
      include: { posts: true, comments: true, likes: true },
    });
    if (!user) {
      return throwError("User Not Found", "USER_NOT_FOUND");
    }
    return user;
  },
};
