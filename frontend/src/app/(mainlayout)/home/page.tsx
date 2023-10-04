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
import { GET_POSTS, GET_POSTS_BY_USER } from "@/graphql/queries/post-query";
import PostCard from "@/components/post-card";

export default function Try() {
  const [validateJwt, { error }] = useMutation(VALIDATE_JWT_MUTATION);
  const [logout] = useMutation(LOGOUT_MUTATION);
  const { user, setUser } = useContext(AuthContext);
  const { data: posts } = useQuery(GET_POSTS);
  const { data: userPosts } = useQuery(GET_POSTS_BY_USER);

  useEffect(() => {
    (async () => {
      const validatedUser = await validateUser(validateJwt, user);
      if (!validatedUser || error) {
        toast({
          title: "Something went wrong",
          description: "Please login again",
        });
        deleteCookie("USER");
        setUser(null);
        await logout();
      }
    })();
  }, [error, logout, setUser, user, validateJwt]);

  return (
    <main className="w-full">
      {posts?.posts?.map((post) => (
        <PostCard
          key={post.id}
          title={post.title}
          description={post.description}
          image={post.image}
          url={post.url}
          provider={post.provider}
        />
      ))}
    </main>
  );
}
