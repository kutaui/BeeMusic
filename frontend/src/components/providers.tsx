"use client";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import React, { createContext, useEffect, useState } from "react";
import { getCookie } from "cookies-next";

const link = createHttpLink({
  uri: process.env.NEXT_PUBLIC_BACKEND_URL,
  credentials: "include",
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

enum AvatarEnum {
  AVATAR_1 = "AVATAR_1",
  AVATAR_2 = "AVATAR_2",
  AVATAR_3 = "AVATAR_3",
  AVATAR_4 = "AVATAR_4",
  AVATAR_5 = "AVATAR_5",
  AVATAR_6 = "AVATAR_6",
}

const initialUser: User = {
  id: 0,
  username: "",
  email: "",
  password: "",
  avatar: AvatarEnum.AVATAR_1,
  posts: [],
  comments: [],
  likes: [],
};

export const AuthContext = createContext<{
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}>({
  user: initialUser,
  setUser: () => null, // Change this to match the type
});

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(initialUser); // Update this line
  useEffect(() => {
    const storedUser = getCookie("USER");
    const userInCookie = storedUser ? JSON.parse(storedUser) : null;
    setUser(userInCookie);
  }, []);

  return (
    <AuthContext.Provider value={{ user: user, setUser: setUser }}>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </AuthContext.Provider>
  );
};
