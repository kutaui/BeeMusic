"use client";
import { Input } from "@/components/ui/input/input";
import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_USERS } from "@/graphql/queries/user-query";
import Link from "next/link";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar/avatar";
import avatarMap from "@/lib/avatars";
import { User } from "@/global";

type ProfileCardProps = {
  username: string;
  avatar: string;
};

function ProfileCard({ username, avatar }: ProfileCardProps) {
  const userAvatar = avatarMap[avatar];
  return (
    <div className="flex items-center p-4 border-b w-full">
      <Avatar className="mr-8">
        <AvatarImage src={userAvatar} alt="@shadcn" className="" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <h2 className="text-2xl font-bold ">@{username}</h2>
    </div>
  );
}

export default function Search() {
  const [searchInput, setSearchInput] = useState("");
  const { data }: { data: { users: User[] } | undefined } = useQuery(GET_USERS);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const filteredUsers = data?.users?.filter((user: User) => {
    return user.username.toLowerCase().includes(searchInput.toLowerCase());
  });

  return (
    <main className="max-w-[600px] mx-auto p-10 ">
      <Input
        placeholder="Search Users"
        onChange={handleSearch}
        className="border-black"
      />
      {searchInput &&
        filteredUsers?.map((user: User, index) => (
          <Link href={`/user/${user.username}`} key={index}>
            <ProfileCard
              key={index}
              username={user.username}
              avatar={user.avatar}
            />
          </Link>
        ))}

      {filteredUsers && !filteredUsers.length && (
        <h3 className="text-xl font-bold p-10">
          No users found with that username
        </h3>
      )}
    </main>
  );
}
