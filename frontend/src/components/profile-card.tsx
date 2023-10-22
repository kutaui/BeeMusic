import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar/avatar";
import avatarMap from "@/lib/avatars";
import { Button } from "@/components/ui/button/button";
import { useMutation } from "@apollo/client";
import {
  FOLLOW_USER_MUTATION,
  UNFOLLOW_USER_MUTATION,
} from "@/graphql/mutations/user-mutation";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/components/providers";
import { User } from "@/global";

type ProfileCardProps = {
  username: string;
  avatar: string;
  followers: User[];
  following: User[];
  refetchUser: any;
};

export default function ProfileCard({
  username,
  avatar,
  following,
  followers,
  refetchUser,
}: ProfileCardProps) {
  const userAvatar = avatarMap[avatar];
  const { user } = useContext(AuthContext);
  const [isFollowing, setIsFollowing] = useState(
    followers?.some((follower) => follower.username === user?.username)
  );
  const currentUser = user?.username === username;

  const [followUser] = useMutation(FOLLOW_USER_MUTATION, {
    variables: { username },
    onCompleted: () => {
      refetchUser();
    },
  });

  const [unfollowUser] = useMutation(UNFOLLOW_USER_MUTATION, {
    variables: { username },
    onCompleted: () => {
      refetchUser();
    },
  });

  // Function to handle following a user
  const handleFollowUser = async () => {
    try {
      await followUser();
      setIsFollowing(true); // Set to true when the user follows
    } catch (error) {
      console.log(error);
    }
  };

  // Function to handle unfollowing a user
  const handleUnFollowUser = async () => {
    try {
      await unfollowUser();
      setIsFollowing(false); // Set to false when the user unfollows
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-4  border-b">
      <Avatar className="w-20 h-20">
        <AvatarImage
          src={userAvatar}
          alt={`${username}'s Avatar`}
          className=""
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <h2 className="text-2xl font-bold ">@{username}</h2>
      {!currentUser &&
        (isFollowing ? (
          <Button onClick={handleUnFollowUser}>Unfollow</Button>
        ) : (
          <Button onClick={handleFollowUser}>Follow</Button>
        ))}

      <div className=" flex justify-between w-52">
        <h3 className="hover:underline hover:cursor-pointer">
          {following?.length} Following
        </h3>
        <h3 className="hover:underline hover:cursor-pointer">
          {followers?.length} Followers
        </h3>
      </div>
    </div>
  );
}
