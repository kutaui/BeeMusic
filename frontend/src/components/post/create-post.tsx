"use client";
import { Textarea } from "@/components/ui/textarea/textarea";
import React, { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMutation } from "@apollo/client";
import { CREATE_POST_MUTATION } from "@/graphql/mutations/post-mutation";
import { GET_POSTS, GET_POSTS_BY_USER } from "@/graphql/queries/post-query";
import Image from "next/image";
import { Button } from "@/components/ui/button/button";
import { useToast } from "@/components/ui/use-toast";
import * as z from "zod";
import DOMPurify from "dompurify";

const errorMessage =
  "Please enter a valid song URL that does not exceed 100 characters.";

const inputSchema = z.object({
  body: z
    .string()
    .min(1, { message: errorMessage })
    .max(100, { message: errorMessage })
    .refine((value) => value.startsWith("https://open.spotify.com/"), {
      message: errorMessage,
    }),
});

//TODO: Maybe redirect user to the created post for better UX, not sure about UX
export default function CreatePost() {
  const { toast } = useToast();

  const [openDialog, setOpenDialog] = useState(false);
  const [postInput, setPostInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [createPost, { loading }] = useMutation(CREATE_POST_MUTATION, {
    refetchQueries: [GET_POSTS, GET_POSTS_BY_USER],
  });

  const handleCreatePost = async (event: any) => {
    event.preventDefault();
    const sanitizedCommentInput = DOMPurify.sanitize(postInput);

    const validationResult = inputSchema.safeParse({
      body: sanitizedCommentInput,
    });
    try {
      if (!validationResult.success) {
        toast({
          title: "Invalid URL",
          description: errorMessage,
        });
        return;
      }
      if (validationResult.success) {
        await createPost({
          variables: {
            body: sanitizedCommentInput,
          },
        });
        toast({
          title: "Post Created",
          description: "Your post has been created.",
        });
        setPostInput("");
        setOpenDialog(false);
        return;
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

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      const lineHeight = 24;
      const rows = Math.ceil(textarea.scrollHeight / lineHeight);
      textarea.style.height = `${lineHeight * rows}px`;
    }
  };

  return (
    <div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger className="hover:cursor-pointer" asChild>
          <Image
            src="/icons/post.png"
            alt="Make a post icon"
            width={25}
            height={25}
          />
        </DialogTrigger>
        <DialogContent className="max-w-[425px] all:max-w-[650px]">
          <DialogHeader>
            <DialogTitle className="text-3xl">Create a post</DialogTitle>
          </DialogHeader>
          <Textarea
            value={postInput}
            onChange={(event) => setPostInput(event.target.value)}
            ref={textareaRef}
            onInput={handleInput}
            placeholder="Post your reply"
            className="resize-none border-0 text-lg placeholder:text-gray-400 w-full"
            maxLength={120}
          />
          <DialogFooter>
            <Button
              variant="round"
              onClick={handleCreatePost}
              disabled={loading}
            >
              {loading ? "Posting..." : "Post"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
