"use client";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar/avatar";
import PostPreview from "@/components/post/post-preview";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import { LIKE_MUTATION } from "@/graphql/mutations/like-mutation";
import {
  GET_POST,
  GET_POSTS,
  GET_POSTS_BY_USER,
} from "@/graphql/queries/post-query";
import avatarMap from "@/lib/avatars";
import { DELETE_POST_MUTATION } from "@/graphql/mutations/post-mutation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/use-toast";
import { AlertDialogOverlay } from "@radix-ui/react-alert-dialog";
import { AuthContext } from "@/components/providers";

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

type DeletePostDialogProps = {
  children: React.ReactNode;
  postId: string;
  username: string;
};

//you don't need AlertDialogOverlay, but in this case I added it to handle the event propagation, if I didn't add that, when user clicks outside of the dialog, they would get redirected to the post page
function DeletePostDialog({
  children,
  postId,
  username,
}: DeletePostDialogProps) {
  const parsedId = parseInt(postId);
  const [openDialog, setOpenDialog] = useState(false);
  const [deletePost] = useMutation(DELETE_POST_MUTATION);
  const { push } = useRouter();
  const onOpenDialog = (event: React.ChangeEvent<EventTarget>) => {
    event.stopPropagation();
    setOpenDialog(true);
  };

  const onCloseDialog = (event: React.ChangeEvent<EventTarget>) => {
    event.stopPropagation();
    setOpenDialog(false);
  };

  const onDeletePost = async (event: React.ChangeEvent<EventTarget>) => {
    event.preventDefault();
    event.stopPropagation();
    try {
      await deletePost({
        variables: { postId: parsedId },
        refetchQueries: [
          { query: GET_POSTS_BY_USER, variables: { username: username } },
          { query: GET_POSTS },
        ],
      });
      toast({
        title: "Post Deleted",
        description: "Your post has been deleted.",
      });
      push("/home");
    } catch (error) {
      console.log("Error deleting post:", error);
    }
  };
  return (
    <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
      <AlertDialogTrigger asChild onClick={onOpenDialog}>
        {children}
      </AlertDialogTrigger>
      <AlertDialogOverlay onClick={onCloseDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-600">
              Delete Post?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Do you want to delete this post? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={onCloseDialog}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={onDeletePost}>
              Delete Post
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
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
  const { user } = useContext(AuthContext);

  const onLikeClick = async (event: React.ChangeEvent<EventTarget>) => {
    event.stopPropagation();
    const newLikesCount = liked ? likesCount - 1 : likesCount + 1;
    setLikesCount(newLikesCount);
    setLiked(!liked);

    try {
      // Perform the actual like mutation
      await createLike();
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error liking this post.",
      });
      console.log("Error liking post:", error);
      // If there's an error, roll back the optimistic update
      setLikesCount(liked ? likesCount + 1 : likesCount - 1);
      setLiked(liked);
    }
  };
  const onCardClick = (event: React.ChangeEvent<EventTarget>) => {
    event.stopPropagation();

    push(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/user/${username}/${postId}`);
  };

  const onProfileClick = (event: React.ChangeEvent<EventTarget>) => {
    event.stopPropagation();
    push(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/user/${username}`);
  };

  return (
    <>
      <Card
        className="border-b-[1px] hover:bg-gray-100 hover:cursor-pointer max-w-[600px] mx-auto relative"
        onClick={onCardClick}
      >
        <CardHeader className="flex flex-row w-[80%] ">
          <Avatar onClick={onProfileClick} className="">
            <AvatarImage src={userAvatar} alt={`${username}'s Avatar`} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <CardTitle onClick={onProfileClick} className="pl-2 hover:underline">
            @{username}
          </CardTitle>

          {user?.username === username && (
            <div className="absolute right-10 flex items-center justify-center ">
              <DeletePostDialog postId={postId} username={username}>
                <h2 className="font-black border border-black w-8 h-8 rounded-full text-center bg-black text-white hover:bg-white hover:text-black ">
                  ...
                </h2>
              </DeletePostDialog>
            </div>
          )}
        </CardHeader>
        <CardContent className="break-words h-[50%]">
          <PostPreview
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
