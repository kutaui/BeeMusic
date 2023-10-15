"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar/avatar";
import Link from "next/link";
import React from "react";
import avatarMap from "@/lib/avatars";

type CommentCardProps = {
  body: string;
  username: string;
  commentId: number;
  avatar: string;
};

//TODO:add ... dots on the corner and put deletecomment with a alert to confirm

export function CommentCard({ username, body, avatar }: CommentCardProps) {
  const userAvatar = avatarMap[avatar];

  return (
    <Card className="border-b-[1px] hover:bg-gray-100 hover:cursor-pointer ">
      <CardHeader className="flex flex-row items-center w-[80%]">
        <Link
          passHref
          href={{
            pathname: "/user/[username]",
            query: { username: username },
          }}
          as={`/user/${username}`}
        >
          <Avatar className="">
            <AvatarImage src={userAvatar} alt={`${username}'s Avatar`} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Link>
        <Link
          passHref
          href={{
            pathname: "/user/[username]",
            query: { username: username },
          }}
          as={`/user/${username}`}
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
