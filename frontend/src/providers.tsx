"use client";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import React, { createContext, useEffect, useState } from "react";
import { deleteCookie, getCookie } from "cookies-next";

const link = createHttpLink({
  uri: "http://localhost:4000",
  credentials: "include",
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export const AuthContext = createContext({
  user: {
    email: null,
    username: null,
    id: null,
  },
  setUser: (user: any) => {},
});

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState({
    email: null,
    username: null,
    id: null,
  });

  useEffect(() => {
    const storedUser = getCookie("USER");
    const userInCookie = storedUser ? JSON.parse(storedUser) : null;
    setUser(userInCookie);
  }, []);

  const value = { user, setUser };

  return (
    <AuthContext.Provider value={value}>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </AuthContext.Provider>
  );
};
