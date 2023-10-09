"use client";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group/radio-group";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar/avatar";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Button } from "@/components/ui/button/button";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_USER_AVATAR_MUTATION } from "@/graphql/mutations/user-mutation";
import { GET_USER } from "@/graphql/queries/user-query";
import { getCookie, setCookie } from "cookies-next";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/components/providers";

const avatars = [
  {
    value: "AVATAR_1",
    src: "/avatars/minion_avatar.png",
    alt: "Da minion",
    fallback: "MN",
  },
  {
    value: "AVATAR_2",
    src: "/avatars/anime_avatar.png",
    alt: "No Anime",
    fallback: "NA",
  },
  {
    value: "AVATAR_3",
    src: "/avatars/gudrid_avatar.png",
    alt: "Gudrid",
    fallback: "GD",
  },
  {
    value: "AVATAR_4",
    src: "/avatars/thorfinn_avatar.jpg",
    alt: "Thorfinn",
    fallback: "TF",
  },
  {
    value: "AVATAR_5",
    src: "/avatars/guts_avatar.jpg",
    alt: "Guts",
    fallback: "GT",
  },
  {
    value: "AVATAR_6",
    src: "/avatars/casca_avatar.jpg",
    alt: "Casca",
    fallback: "CS",
  },
];

export default function ProfilePage() {
  const { user, setUser } = useContext(AuthContext);
  const { push, refresh } = useRouter();
  const [selectedAvatar, setSelectedAvatar] = useState("AVATAR_1");
  const [updateAvatar] = useMutation(UPDATE_USER_AVATAR_MUTATION, {
    refetchQueries: [{ query: GET_USER }],
  });

  const handleAvatarChange = (value: React.SetStateAction<string>) => {
    setSelectedAvatar(value);
  };

  const handleSaveButtonClick = async () => {
    try {
      const data = await updateAvatar({
        variables: { avatar: selectedAvatar },
      });

      // Update the user's avatar in the context
      setUser((prevUser) => {
        if (prevUser === null) {
          return null; // Return null if prevUser is null
        }

        // Update the avatar and keep other properties intact
        return {
          ...prevUser,
          avatar: selectedAvatar as AvatarEnum,
        };
      });

      const userCookie = getCookie("USER");
      if (userCookie) {
        const updatedUser = {
          ...JSON.parse(userCookie),
          avatar: selectedAvatar,
        };
        setCookie("USER", JSON.stringify(updatedUser));
      }

      toast({
        title: "Avatar Updated",
        description: "Your avatar has been updated.",
      });

      setTimeout(() => {
        push(`/user/${data?.data?.updateAvatar.username}`);
      }, 2000);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex flex-col items-center pt-10">
      <h2 className="text-xl font-bold pb-4">Choose your Avatar</h2>

      <RadioGroup
        onValueChange={handleAvatarChange}
        className="flex w-52 sm:w-[20rem] md:w-[25rem] flex-wrap mx-auto justify-center pt-4"
        defaultValue="AVATAR_1"
      >
        {avatars.map((avatar) => (
          <div key={avatar.value} className="flex flex-col items-center">
            <Avatar className="mb-3 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32">
              <AvatarImage src={avatar.src} alt={avatar.alt} />
              <AvatarFallback>{avatar.fallback}</AvatarFallback>
            </Avatar>
            <RadioGroupItem
              className="border-black"
              value={avatar.value}
              id={avatar.value}
            />
          </div>
        ))}
        <Button
          onClick={handleSaveButtonClick}
          variant="round"
          className="mt-4 w-full"
        >
          Save
        </Button>
      </RadioGroup>
    </div>
  );
}
