"use client";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SpotifyPreview from "@/components/spotify-preview";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import { LIKE_MUTATION } from "@/graphql/mutations/like-mutation";
import {
  GET_POST,
  GET_POSTS,
  GET_POSTS_BY_USER,
} from "@/graphql/queries/post-query";
import avatarMap from "@/lib/avatars";

type PostCardFooterProps = {
  postId: string;
  username: string;
  commentsLength: number;
  currentUserLiked: boolean;
  onLikeClick: (event: React.ChangeEvent<EventTarget>) => void;
  likesLength: number;
};

export function PostCardFooter({
  postId,
  username,
  commentsLength,
  currentUserLiked,
  onLikeClick,
  likesLength,
}: PostCardFooterProps) {
  const [liked, setLiked] = useState(currentUserLiked);

  return (
    <div className="flex justify-around w-full items-center">
      <div className="flex text-ellipsis w-16">
        <Image
          src={liked ? "/icons/heart-red.png" : "/icons/heart.png"}
          width={25}
          height="25"
          alt="Like Icon"
          className="h-6 w-auto"
          onClick={(event) => {
            onLikeClick(event);
            setLiked(!liked);
          }}
        />
        <p className="w-16 truncate pl-1">{likesLength}</p>
      </div>
      <Link
        className="flex text-ellipsis w-16"
        passHref
        href="/user/[username]/[postId]"
        as={`/user/${username}/${postId}`}
      >
        <Image
          src="/icons/comment.png"
          width={25}
          height={25}
          alt="Comment Icon"
        />
        <p className="w-full truncate pl-1">{commentsLength}</p>
      </Link>
    </div>
  );
}

type PostCardProps = {
  title: string;
  description: string;
  image: string;
  url: string;
  provider: string;
  username: string;
  postId: string;
  commentsLength: number;
  likesLength: number;
  currentUserLiked: boolean;
  avatar: string;
};

//TODO: add a tooltip on username or avatar hover like twitter
//TODO: make the alt text for the avatar more accessible
export default function PostCard({
  url,
  title,
  description,
  image,
  provider,
  username,
  postId,
  commentsLength,
  currentUserLiked,
  likesLength,
  avatar,
}: PostCardProps) {
  const [liked, setLiked] = useState(currentUserLiked);
  const [likesCount, setLikesCount] = useState(likesLength);
  const parsedId = parseInt(postId);
  const { push } = useRouter();
  //the reason for a lot of the refetch queries is because when user clicks back, they don't see the updated like, they have to refresh, this solves that
  const [createLike] = useMutation(LIKE_MUTATION, {
    variables: { postId: parsedId },
    refetchQueries: [
      { query: GET_POST, variables: { id: parsedId } },
      { query: GET_POSTS_BY_USER, variables: { username: username } },
      { query: GET_POSTS },
    ],
  });
  const userAvatar = avatarMap[avatar];

  const onLikeClick = async (event: React.ChangeEvent<EventTarget>) => {
    event.stopPropagation();
    const newLikesCount = liked ? likesCount - 1 : likesCount + 1;
    setLikesCount(newLikesCount);
    setLiked(!liked);

    try {
      // Perform the actual like mutation
      await createLike();
    } catch (error) {
      console.log("Error liking post:", error);
      // If there's an error, roll back the optimistic update
      setLikesCount(liked ? likesCount + 1 : likesCount - 1);
      setLiked(liked);
    }
  };
  const onCardClick = (event: React.ChangeEvent<EventTarget>) => {
    event.stopPropagation();
    push(`http://localhost:3000/user/${username}/${postId}`);
  };

  const onProfileClick = (event: React.ChangeEvent<EventTarget>) => {
    event.stopPropagation();
    push(`http://localhost:3000/user/${username}`);
  };

  return (
    <>
      <Card
        className="border-b-[1px] hover:bg-gray-100 hover:cursor-pointer max-w-[600px] mx-auto "
        onClick={onCardClick}
      >
        <CardHeader className="flex flex-row w-[80%]">
          <Avatar onClick={onProfileClick} className="">
            <AvatarImage src={userAvatar} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <CardTitle onClick={onProfileClick} className="pl-2 hover:underline">
            @{username}
          </CardTitle>
        </CardHeader>
        <CardContent className="break-words h-[50%]">
          <SpotifyPreview
            provider={provider}
            url={url}
            image={image}
            description={description}
            title={title}
          />
        </CardContent>
        <CardFooter>
          <PostCardFooter
            commentsLength={commentsLength}
            username={username}
            postId={postId}
            currentUserLiked={currentUserLiked}
            onLikeClick={onLikeClick}
            likesLength={likesCount}
          />
        </CardFooter>
      </Card>
    </>
  );
}
