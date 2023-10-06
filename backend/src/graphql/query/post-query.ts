import { db } from "../../utils/db.js";
import { throwError } from "../../utils/throw-error.js";
import { Response } from "express";

const posts = async () => {
  try {
    return db.post.findMany({
      include: {
        user: true,
        likes: true,
        comments: true,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

const postsByUser = async (
  _: unknown,
  { userId }: { userId: number },
  __: unknown,
) => {
  try {
    return db.post.findMany({
      where: {
        userId,
      },
      include: {
        user: true,
        comments: true,
        likes: true,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

const post = async (_: unknown, args: { id: number }) => {
  const { id } = args;
  try {
    return db.post.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
        comments: true,
        likes: true,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

export const PostQuery = {
  posts,
  postsByUser,
  post,
};
