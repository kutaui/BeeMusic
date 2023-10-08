import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { throwError } from "./throw-error.js";

export const context = async ({
  req,
  res,
}: {
  req: Request;
  res: Response;
}) => {
  const ctx: { userId: number | null; res: Response; req: Request } = {
    userId: null,
    //this enables us to access response and set cookies in the context
    res,
    req,
  };
  try {
    if (req.cookies["token"]) {
      //get the user id from the token and store it in the context
      const token = jwt.verify(
        req.cookies["token"],
        process.env.JWT_SECRET,
      ) as {
        data: number;
      };
      ctx.userId = token.data;
    }
  } catch (e) {
    throwError("Invalid token", "INVALID_TOKEN");
  }
  return ctx;
};
