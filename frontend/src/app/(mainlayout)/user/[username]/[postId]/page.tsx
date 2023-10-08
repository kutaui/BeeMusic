"use client";
import { useParams } from "next/navigation";
import { useQuery } from "@apollo/client";
import { GET_POST } from "@/graphql/queries/post-query";
import PostCard from "@/components/post/post-card";
import { CommentCard } from "@/components/comment/comment-card";
import { useContext } from "react";
import { AuthContext } from "@/providers";
import CreateComment from "@/components/comment/create-comment";

export default function PostPage() {
  const params = useParams();
  const postId = parseInt(params.postId as string);
  const { data, loading, error } = useQuery(GET_POST, {
    variables: { id: postId },
  });
  const comments = data?.post.comments;
  const likes = data?.post.likes;
  const { user } = useContext(AuthContext);
  const currentUserLiked = likes?.some(
    (like: Like) => like.userId === user?.id
  );

  //TODO:Add skeleton loading
  if (loading) {
    return <div>Loading...</div>;
  }
  console.log(data.post.comments);
  if (!data)
    return (
      <div className="flex justify-center text-lg all:text-3xl font-bold p-10">
        <h2>Post not found.</h2>
      </div>
    );
  return (
    <main className="max-w-[700px] mx-auto">
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
          avatar={data.post.user.avatar}
        />
      )}
      <CreateComment postId={data?.post.id} />
      {comments &&
        comments?.map((comment: Reply) => (
          <CommentCard
            key={comment.id}
            username={comment.user.username}
            commentId={comment.id}
            body={comment.body}
            avatar={comment.user.avatar}
          />
        ))}
    </main>
  );
}
