"use client";
import React, { useContext, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useMutation } from "@apollo/client";
import { CREATE_COMMENT_MUTATION } from "@/graphql/mutations/comment-mutation";
import { GET_POST } from "@/graphql/queries/post-query";
import avatarMap from "@/lib/avatars";
import { AuthContext } from "@/providers";
import * as z from "zod";
import { toast } from "@/components/ui/use-toast";
import DOMPurify from "dompurify";

type CreateCommentProps = {
  postId: string;
};

const errorMessage = "Your comment cannot exceed 180 characters.";

const inputSchema = z.object({
  body: z
    .string()
    .min(1, { message: errorMessage })
    .max(180, { message: errorMessage }),
});

export default function CreateComment({ postId }: CreateCommentProps) {
  const [commentInput, setCommentInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const parsedId = parseInt(postId);
  const [createComment] = useMutation(CREATE_COMMENT_MUTATION, {
    refetchQueries: [{ query: GET_POST, variables: { id: parsedId } }],
  });

  const { user } = useContext(AuthContext);
  //@ts-ignore
  const userAvatar = avatarMap[user?.avatar];

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
    const sanitizedCommentInput = DOMPurify.sanitize(commentInput);
    const validationResult = inputSchema.safeParse({
      body: sanitizedCommentInput,
    });
    try {
      if (!validationResult.success) {
        toast({
          title: "Comment Invalid",
          description: errorMessage,
        });
        return;
      }
      if (validationResult.success) {
        await createComment({
          variables: {
            body: sanitizedCommentInput,
            postId: parsedId,
          },
        });
        setCommentInput("");
      } else {
        toast({
          title: "Something went wrong",
          description: "Please try again.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Something went wrong",
        description: error.message,
      });
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
            maxLength={180}
          />
        </div>
      </div>
      <Button onClick={onCreateCommentHandler} variant="round" className="w-20">
        Post
      </Button>
    </div>
  );
}
