"use client";
import { useParams } from "next/navigation";
import { useMutation, useQuery } from "@apollo/client";
import { GET_POST } from "@/graphql/queries/post-query";
import PostCard from "@/components/post-card";
import { CommentCard } from "@/components/comment-card";
import { useContext } from "react";
import { AuthContext } from "@/providers";
import CreateComment from "@/components/create-comment";

export default function PostPage() {
  const params = useParams();
  const postId = parseInt(params.postId as string);
  const { data } = useQuery(GET_POST, { variables: { id: postId } });
  const comments = data?.post.comments;
  const likes = data?.post.likes;
  const { user } = useContext(AuthContext);
  const currentUserLiked = likes?.some((like: Like) => like.userId === user.id);

  return (
    <main className="max-w-[800px] mx-auto">
      {data?.post && (
        <PostCard
          key={data.post.id}
          title={data.post.title}
          description={data.post.description}
          image={data.post.image}
          url={data.post.url}
          provider={data.post.provider}
          username={data.post.user.username}
          postId={data.post.id}
          commentsLength={comments.length}
          currentUserLiked={currentUserLiked}
          likesLength={likes.length}
        />
      )}
      <CreateComment postId={data?.post.id} />
      {comments &&
        comments?.map((comment: Reply) => (
          <CommentCard
            key={comment.id}
            username={data.post.user.username}
            commentId={comment.id}
            body={comment.body}
          />
        ))}
    </main>
  );
}
