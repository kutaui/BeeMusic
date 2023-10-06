"use client";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/providers";
import { useMutation, useQuery } from "@apollo/client";
import {
  LOGOUT_MUTATION,
  VALIDATE_JWT_MUTATION,
} from "@/graphql/mutations/user-mutation";
import { validateUser } from "@/lib/validate-user";
import { deleteCookie } from "cookies-next";
import { toast } from "@/components/ui/use-toast";
import { GET_POSTS } from "@/graphql/queries/post-query";
import PostCard from "@/components/post-card";

export default function Home() {
  const [validateJwt] = useMutation(VALIDATE_JWT_MUTATION);
  const [logout] = useMutation(LOGOUT_MUTATION);
  const { user, setUser } = useContext(AuthContext);
  const { data }: { data: { posts: Post[] } | undefined } = useQuery(GET_POSTS);

  useEffect(() => {
    (async () => {
      const validatedUser = await validateUser(validateJwt);
      if (!validatedUser) {
        toast({
          title: "Something went wrong",
          description: "Please login again",
        });
        deleteCookie("USER");
        setUser(null);
        await logout();
      }
    })();
  }, [logout, setUser, validateJwt]);

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
              (like: Like) => like.userId === user.id
            )}
            likesLength={post.likes.length}
          />
        );
      })}
    </main>
  );
}
