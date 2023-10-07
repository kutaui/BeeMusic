"use client";
import React, { useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useMutation } from "@apollo/client";
import { CREATE_COMMENT_MUTATION } from "@/graphql/mutations/comment-mutation";
import { GET_POST } from "@/graphql/queries/post-query";
import avatarMap from "@/lib/avatars";

type CreateCommentProps = {
  postId: string;
  avatar: string;
};

//validate input and put max length and handle errors

export default function CreateComment({ postId, avatar }: CreateCommentProps) {
  const [commentInput, setCommentInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const parsedId = parseInt(postId);
  const [createComment] = useMutation(CREATE_COMMENT_MUTATION, {
    refetchQueries: [{ query: GET_POST, variables: { id: parsedId } }],
  });
  const userAvatar = avatarMap[avatar];

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      const lineHeight = 24;
      const rows = Math.ceil(textarea.scrollHeight / lineHeight);
      textarea.style.height = `${lineHeight * rows}px`;
    }
  };

  const onCreateCommentHandler = async (event: any) => {
    event.preventDefault();
    try {
      await createComment({
        variables: {
          body: commentInput,
          postId: parsedId,
        },
      });
      setCommentInput("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4 flex flex-col items-end border-b w-full">
      <div className="flex flex-row w-full relative pb-6">
        <Avatar className="mt-2">
          <AvatarImage src={userAvatar} alt="@shadcn" className="" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="relative w-full ">
          <Textarea
            value={commentInput}
            onChange={(event) => setCommentInput(event.target.value)}
            ref={textareaRef}
            onInput={handleInput}
            placeholder="Post your reply"
            className="resize-none border-0 text-lg placeholder:text-gray-400 w-full"
          />
        </div>
      </div>
      <Button onClick={onCreateCommentHandler} variant="round" className="w-20">
        Post
      </Button>
    </div>
  );
}
