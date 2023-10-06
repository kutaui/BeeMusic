"use client";

import { useQuery } from "@apollo/client";
import { GET_USER } from "@/graphql/queries/user-query";
import { useParams } from "next/navigation";
import PostCard from "@/components/post-card";
import ProfileCard from "@/components/profile-card";
import { useContext } from "react";
import { AuthContext } from "@/providers";
import { GET_POSTS_BY_USER } from "@/graphql/queries/post-query";

export default function UserPage() {
  const { user, setUser } = useContext(AuthContext);

  const params = useParams();
  const { data } = useQuery(GET_USER, {
    variables: { username: params.username },
  });
  const { data: userPosts } = useQuery(GET_POSTS_BY_USER, {
    variables: { username: user.id },
  });
  console.log(userPosts);
  console.log(params.username);
  return (
    <main className="">
      <ProfileCard username={data?.user.username} />
      <div className="flex justify-center border-b p-6">
        <h2 className="font-bold text-xl p-4">
          {data?.user.username}`&apos;`s Posts
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
            (like: Like) => like.userId === user.id
          )}
          likesLength={post.likes.length}
        />
      ))}
    </main>
  );
}
