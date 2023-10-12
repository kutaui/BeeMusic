import { Response } from "express";
import { db } from "../../utils/db.ts";
import { throwError } from "../../utils/throw-error.ts";
import getMetaData from "metadata-scraper";

const createPost = async (
  _: unknown,
  { body }: { body: string },
  context: { userId: number; res: Response },
) => {
  const { userId, res } = context;
  if (!userId) {
    res.clearCookie("token");
    return throwError("Invalid JWT token.", "INVALID_TOKEN");
  }

  if (body.startsWith("https://open.spotify.com/")) {
    try {
      //@ts-ignore no types for metadata-scraper
      const metadata = await getMetaData(body);
      const { title, description, image, url, provider } = metadata;
      if (!description || !image || !url || !provider)
        return throwError(
          "Please check the song url and try again",
          "POST_CREATION_ERROR",
        );
      return db.post.create({
        data: {
          title,
          description,
          image,
          url,
          provider,
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
      return throwError("Error creating post.", "POST_CREATION_ERROR");
    }
  } else if (!body.startsWith("https://open.spotify.com/")) {
    return throwError(
      "This does not look a like a song link.",
      "POST_CREATION_ERROR",
    );
  }
};

const deletePost = async (
  _: unknown,
  { postId }: { postId: number },
  context: { userId: number; res: Response },
) => {
  const { userId, res } = context;
  if (!userId) {
    // clear the cookie if the token is invalid
    res.clearCookie("token");
    return throwError("Invalid JWT token.", "INVALID_TOKEN");
  }

  try {
    await db.comment.deleteMany({
      where: {
        postId,
      },
    });
    await db.like.deleteMany({
      where: {
        postId,
      },
    });

    return await db.post.delete({
      where: {
        id: postId,
      },
    });
  } catch (error) {
    console.log(error);
    return throwError("Error deleting post.", "POST_DELETION_ERROR");
  }
};

export const postMutation = {
  createPost,
  deletePost,
};
