type Post = {
  id: number;
  title: string;
  description: string;
  image: string;
  url: string;
  provider: string;
  user: User;
  userId: number;
  comments: Comment[];
  likes: Like[];
  createdAt: string;
};

type User = {
  id: number;
  username: string;
  email: string;
  password: string;
  posts: Post[];
  comments: Comment[];
  likes: Like[];
};

type Comment = {
  id: number;
  body: string;
  user: User;
  userId: number;
  post: Post;
  postId: number;
  likes: Like[];
};

type Like = {
  id: number;
  user: User;
  userId: number;
  post: Post;
  postId: number;
  comment: Comment;
  commentId: number;
};
