"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import React from "react";

type CommentCardProps = {
  body: string;
  username: string;
  commentId: number;
};

export function CommentCard({ username, body }: CommentCardProps) {
  return (
    <Card className="border-b-[1px] hover:bg-gray-100 hover:cursor-pointer ">
      <CardHeader className="flex flex-row items-center w-[80%]">
        <Link
          passHref
          href={{
            pathname: "/[username]",
            query: { username: username },
          }}
          as={`/${username}`}
        >
          <Avatar className="">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Link>
        <Link
          passHref
          href={{
            pathname: "/[username]",
            query: { username: username },
          }}
          as={`/${username}`}
        >
          <CardTitle className=" w-full pl-2  hover:underline">
            @{username}
          </CardTitle>
        </Link>
      </CardHeader>
      <CardContent className="break-words">{body}</CardContent>
    </Card>
  );
}
