"use client";

import { useQuery } from "@apollo/client";
import { GET_USER } from "@/graphql/queries/user-query";
import { useParams } from "next/navigation";
import PostCard from "@/components/post/post-card";
import ProfileCard from "@/components/profile-card";
import { useContext, useEffect, useLayoutEffect } from "react";
import { AuthContext } from "@/providers";
import { GET_POSTS_BY_USER } from "@/graphql/queries/post-query";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function UserPage() {
  const { user } = useContext(AuthContext);
  const params = useParams();
  const { data, loading } = useQuery(GET_USER, {
    variables: { username: params.username },
    fetchPolicy: "no-cache",
  });
  const userId = parseInt(data?.user?.id);
  const { data: userPosts } = useQuery(GET_POSTS_BY_USER, {
    variables: { userId },
    fetchPolicy: "no-cache",
  });

  //TODO:Add skeleton loading
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data)
    return (
      <div className="flex justify-center text-lg all:text-3xl font-bold p-10">
        <h2>This user doesn&apos;t exist, try searching for another.</h2>
      </div>
    );
  return (
    <main className="max-w-[800px] mx-auto">
      <ProfileCard username={data?.user.username} avatar={data?.user.avatar} />
      <div className="flex flex-col items-center border-b p-6">
        {params.username === user?.username && (
          <Link passHref href="/profile" className="-10">
            <Button variant="round">Edit Profile</Button>
          </Link>
        )}
        <h2 className="font-bold text-xl p-4">
          {data?.user.username}&apos;s Posts
        </h2>
      </div>
      {userPosts?.postsByUser?.map((post: Post) => (
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
      ))}
    </main>
  );
}
