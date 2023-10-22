"use client";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/components/providers";
import { useQuery } from "@apollo/client";
import {
  GET_POSTS,
  GET_POSTS_BY_FOLLOWING,
} from "@/graphql/queries/post-query";
import PostCard from "@/components/post/post-card";
import { Like, Post } from "@/global";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  const { user } = useContext(AuthContext);
  const { data: allPosts }: { data: { posts: Post[] } | undefined } =
    useQuery(GET_POSTS);
  const {
    data: postsByFollowing,
  }: { data: { postsByFollowedUsers: Post[] } | undefined } = useQuery(
    GET_POSTS_BY_FOLLOWING,
    {
      variables: { userId: Number(user?.id) },
    }
  );

  return (
    <main className="w-full">
      <Tabs defaultValue="Foryou">
        <TabsList className="w-full   mx-auto">
          <TabsTrigger value="Foryou">For you</TabsTrigger>
          <TabsTrigger value="following">Following</TabsTrigger>
        </TabsList>
        <TabsContent value="Foryou" className="w-full">
          {allPosts?.posts?.map((post: Post) => {
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
        </TabsContent>
        <TabsContent value="following">
          {postsByFollowing?.postsByFollowedUsers?.map((post: Post) => {
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
        </TabsContent>
      </Tabs>
    </main>
  );
}
