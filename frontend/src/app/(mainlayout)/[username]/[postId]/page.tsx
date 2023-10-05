"use client";
import { useParams } from "next/navigation";
import { useQuery } from "@apollo/client";
import { GET_POST } from "@/graphql/queries/post-query";
import PostCard from "@/components/post-card";
import { CommentCard } from "@/components/comment-card";

export default function PostPage() {
  const params = useParams();
  const postId = parseInt(params.postId as string);
  const { data } = useQuery(GET_POST, { variables: { id: postId } });
  const comments = data?.post.comments;
  return (
    <div>
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
        />
      )}
      {comments &&
        comments?.map((comment: Reply) => (
          <CommentCard
            key={comment.id}
            username={data.post.user.username}
            commentId={comment.id}
            body={comment.body}
          />
        ))}
    </div>
  );
}
