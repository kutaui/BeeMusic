"use client";
import { deleteCookie, setCookie } from "cookies-next";

export const validateUser = async (validateFunc: any) => {
  try {
    const { data } = await validateFunc();
    if (data) {
      setCookie("USER", JSON.stringify(data.validateJwt));
      return true;
    }

    return false;
  } catch (error: any) {
    deleteCookie("USER");

    return "error";
  }
};
