"use client";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/providers";
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "@/graphql/queries/post-query";
import PostCard from "@/components/post-card";

export default function Home() {
  const { user } = useContext(AuthContext);
  const { data }: { data: { posts: Post[] } | undefined } = useQuery(GET_POSTS);

  return (
    <main className="w-full">
      {data?.posts?.map((post: Post) => {
        return (
          <PostCard
            key={post.id}
            title={post.title}
            description={post.description}
            image={post.image}
            url={post.url}
            provider={post.provider}
            username={post.user.username}
            postId={post.id}
            commentsLength={post.comments.length}
            currentUserLiked={post.likes.some(
              (like: Like) => like.userId === user?.id
            )}
            likesLength={post.likes.length}
            avatar={post.user.avatar}
          />
        );
      })}
    </main>
  );
}
