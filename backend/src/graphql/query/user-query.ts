import { db } from "../../utils/db.js";
import { Response } from "express";
import { throwError } from "../../utils/throw-error.js";

export const UserQuery = {
  users: async () => {
    return db.user.findMany();
  },
  user: async (
    _: unknown,
    __: unknown,
    context: { userId: number; res: Response },
  ) => {
    // Get the user id from the context
    const { userId, res } = context;

    if (!userId) {
      // clear the cookie if the token is invalid
      res.clearCookie("token");
      return throwError("Invalid JWT token.", "INVALID_TOKEN");
    }
    return db.user.findUnique({
      where: {
        id: userId,
      },
    });
  },
};