import express from "express";
import { db } from "../../utils/db.js";
import { User } from "@prisma/client";
import bcrypt from "bcryptjs";
import generateToken from "../../utils/generate-token.js";
import { throwError } from "../../utils/throw-error.js";

const login = async (
  _: unknown,
  { email, password }: User,
  context: { res: express.Response },
) => {
  const { res } = context;
  const user = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return throwError("Invalid Credentials.", "INVALID_CREDENTIALS");
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (isPasswordValid) {
    // should check if user already has a token to optimize performance
    generateToken(res, user.id);
    return user;
  } else {
    return throwError("Invalid Credentials.", "INVALID_CREDENTIALS");
  }
};

const register = async (
  _: unknown,
  { email, username, password }: User,
  context: { res: express.Response },
) => {
  const { res } = context;
  const userByEmail = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (userByEmail) {
    return throwError(
      "User with this email already exists.",
      "USER_ALREADY_EXISTS",
    );
  }

  const userByUsername = await db.user.findUnique({
    where: {
      username,
    },
  });

  if (userByUsername) {
    return throwError(
      "User with this username already exists.",
      "USER_ALREADY_EXISTS",
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await db.user.create({
    data: {
      email,
      username,
      password: hashedPassword,
    },
  });
  generateToken(res, user.id);
  return { ...user, password: null };
};

const logout = async (
  _: unknown,
  __: unknown,
  context: { res: express.Response },
) => {
  const { res } = context;
  res.clearCookie("token");
  return "Logged out successfully.";
};

const validateJwt = async (
  _: unknown,
  __: unknown,
  context: { res: express.Response; userId: number | null },
) => {
  const { res, userId } = context;

  if (!userId) {
    res.clearCookie("token");
    return throwError("Invalid Credentials.", "INVALID_CREDENTIALS");
  }

  return db.user.findUnique({
    where: {
      id: userId,
    },
  });
};

const updateAvatar = async (
  _: unknown,
  { avatar }: User,
  context: { res: express.Response; userId: number | null },
) => {
  const { res, userId } = context;

  if (!userId) {
    res.clearCookie("token");
    return throwError("Invalid Credentials.", "INVALID_CREDENTIALS");
  }

  try {
    return db.user.update({
      where: {
        id: userId,
      },
      data: {
        avatar,
      },
    });
  } catch (error) {
    console.log(error);
    return throwError("Something went wrong.", "SOMETHING_WENT_WRONG");
  }
};

const followUser = async (
  _: unknown,
  { username }: { username: string },
  context: { res: express.Response; userId: number | null },
) => {
  const { res, userId } = context;

  console.log("User ID:", userId); // Log the user's ID
  console.log("Followed User ID:", username); // Log the ID you're trying to connect

  if (!userId) {
    res.clearCookie("token");
    return throwError("Invalid Credentials.", "INVALID_CREDENTIALS");
  }

  try {
    const updatedUser = await db.user.update({
      where: {
        id: userId,
      },
      data: {
        follows: {
          connect: {
            username,
          },
        },
      },
    });
    return "Followed successfully.";
  } catch (error) {
    console.log(error);
    return throwError("Something went wrong.", "SOMETHING_WENT_WRONG");
  }
};

const unfollowUser = async (
  _: unknown,
  { username }: { username: string },
  context: { res: express.Response; userId: number | null },
) => {
  const { res, userId } = context;

  console.log("User ID:", userId); // Log the user's ID
  console.log("Unfollowed User ID:", username); // Log the ID you're trying to connect

  if (!userId) {
    res.clearCookie("token");
    return throwError("Invalid Credentials.", "INVALID_CREDENTIALS");
  }

  try {
    const updatedUser = await db.user.update({
      where: {
        id: userId,
      },
      data: {
        follows: {
          disconnect: {
            username,
          },
        },
      },
    });
    return "Unfollowed successfully.";
  } catch (error) {
    console.log(error);
    return throwError("Something went wrong.", "SOMETHING_WENT_WRONG");
  }
};

export const userMutation = {
  login,
  register,
  logout,
  validateJwt,
  updateAvatar,
  followUser,
  unfollowUser,
};
