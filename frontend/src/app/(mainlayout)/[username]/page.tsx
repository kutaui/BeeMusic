"use client";

import { useQuery } from "@apollo/client";
import { GET_USER } from "@/graphql/queries/user-query";
import { useParams } from "next/navigation";
import PostCard from "@/components/post-card";
import ProfileCard from "@/components/profile-card";

export default function UserPage() {
  const params = useParams();
  const { data: user } = useQuery(GET_USER, {
    variables: { username: params.username },
  });

  console.log(user?.user);
  return (
    <main className="">
      <ProfileCard username={user?.user.username} />
      <div className="flex justify-center border-b p-6">
        <h2 className="font-bold text-xl p-4">{user?.user.username}'s Posts</h2>
      </div>
      {user?.user.posts?.map((post) => (
        <PostCard
          key={post.id}
          title={post.title}
          description={post.description}
          image={post.image}
          url={post.url}
          provider={post.provider}
          username={user?.user.username}
        />
      ))}
    </main>
  );
}
