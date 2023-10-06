"use client";
import { Textarea } from "@/components/ui/textarea";
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
import { GET_POSTS } from "@/graphql/queries/post-query";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

//add input validation and max length, also error handling
export default function CreatePost() {
  const { toast } = useToast();

  const [openDialog, setOpenDialog] = useState(false);
  const [postInput, setPostInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [createPost] = useMutation(CREATE_POST_MUTATION, {
    refetchQueries: [{ query: GET_POSTS }],
  });

  const handleCreatePost = async (event: any) => {
    event.preventDefault();
    try {
      await createPost({
        variables: {
          body: postInput,
        },
      });

      setPostInput("");
      setOpenDialog(false);
      toast({
        title: "Post Created",
        description: "Your post has been created.",
      });
    } catch (error) {
      console.log(error);
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
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create a post</DialogTitle>
          </DialogHeader>
          <Textarea
            value={postInput}
            onChange={(event) => setPostInput(event.target.value)}
            ref={textareaRef}
            onInput={handleInput}
            placeholder="Post your reply"
            className="resize-none border-0 text-lg placeholder:text-gray-400 w-full"
          />
          <DialogFooter>
            <Button variant="round" onClick={handleCreatePost}>
              Post
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
