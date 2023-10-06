"use client";
import React, { useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useMutation } from "@apollo/client";
import { CREATE_COMMENT_MUTATION } from "@/graphql/mutations/comment-mutation";
import { GET_POST } from "@/graphql/queries/post-query";

type CreateCommentProps = {
  postId: string;
};

//validate input and put max length

export default function CreateComment({ postId }: CreateCommentProps) {
  const [commentInput, setCommentInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const parsedId = parseInt(postId);
  const [createComment] = useMutation(CREATE_COMMENT_MUTATION, {
    refetchQueries: [{ query: GET_POST, variables: { id: parsedId } }],
  });

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
    <div className="p-4 pb-8 border-b w-full">
      <div className="flex flex-row w-full relative">
        <Avatar className="mt-2">
          <AvatarImage
            src="https://github.com/shadcn.png"
            alt="@shadcn"
            className=""
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="relative w-full">
          <Textarea
            value={commentInput}
            onChange={(event) => setCommentInput(event.target.value)}
            ref={textareaRef}
            onInput={handleInput}
            placeholder="Post your reply"
            className="resize-none border-0 text-lg placeholder:text-gray-400 w-full"
          />
        </div>
        <Button
          onClick={onCreateCommentHandler}
          variant="round"
          className="border absolute -bottom-6 right-0"
        >
          Post
        </Button>
      </div>
    </div>
  );
}
