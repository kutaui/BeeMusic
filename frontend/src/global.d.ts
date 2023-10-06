type Post = {
  id: string;
  title: string;
  description: string;
  image: string;
  url: string;
  provider: string;
  user: User;
  userId: number;
  comments: Reply[];
  likes: Like[];
  createdAt: string;
};

type User = {
  id: number;
  username: string;
  email: string;
  password: string;
  posts: Post[];
  comments: Reply[];
  likes: Like[];
};

type Reply = {
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
  comment: Reply;
  commentId: number;
};
