"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/providers";
import React, { useContext, useEffect, useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar/avatar";
import avatarMap from "@/lib/avatars";
import Link from "next/link";
import { Button } from "@/components/ui/button/button";
import { getCookie } from "cookies-next";

export default function MainNavbar() {
  const userCookie = getCookie("USER");
  const userInCookie = userCookie && JSON.parse(userCookie);
  const { user } = useContext(AuthContext);
  const avatar = avatarMap[user?.avatar || userInCookie.avatar];

  const { back } = useRouter();
  return (
    <div className="w-full flex justify-around justify-items-center pt-6 pb-6 border-b [&>*]:sm:w-[60px] [&>*]:all:w-[75px] [&>*]:sm:h-[60px] [&>*]:all:h-[75px] ">
      <Image
        width={40}
        height={40}
        src="/icons/return.png"
        alt="Go back icon"
        className="hover:cursor-pointer "
        onClick={() => back()}
      />

      <Button variant="round" className="" asChild>
        <Link passHref href="/home">
          Home
        </Link>
      </Button>

      <Avatar className="">
        <Link passHref href={`/user/${user?.username}`}>
          <AvatarImage src={avatar} alt={`${user?.username}'s Avatar`} />
          <AvatarFallback>{user?.username}</AvatarFallback>
        </Link>
      </Avatar>
    </div>
  );
}
