"use client";
import { deleteCookie, setCookie } from "cookies-next";

export const validateUser = async (validateFunc: any, user: any) => {
  try {
    const { data } = await validateFunc();
    if (data) {
      setCookie("USER", JSON.stringify(data.validateJwt));
      return true;
    }

    return false;
  } catch (error: any) {
    deleteCookie("USER");

    if (error.message === "Invalid Credentials.") {
      return false;
    }
    return error;
  }
};
