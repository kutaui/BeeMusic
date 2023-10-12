import express from "express";
import { db } from "../../utils/db.ts";

const commentsByPost = async (
  _: unknown,
  { postId }: { postId: number },
  context: { res: express.Response },
) => {
  return db.comment.findMany({
    where: {
      postId,
    },
    include: {
      user: true,
    },
  });
};

export const commentQuery = {
  commentsByPost,
};
