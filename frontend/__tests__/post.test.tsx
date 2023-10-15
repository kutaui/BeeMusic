import PostCard from "@/components/post/post-card";
import { render, screen } from "@testing-library/react";
import { Providers } from "@/components/providers";

const ExamplePost = {
  url: "https://www.youtube.com/watch?v=5qap5aO4i9A",
  title: "The Best of Bach",
  description: "Bach's music in a 3 hour long playlist",
  image: "https://i.ytimg.com/vi/5qap5aO4i9A/maxresdefault.jpg",
  provider: "youtube",
  username: "Classical Music",
  postId: "100",
  commentsLength: 0,
  currentUserLiked: false,
  likesLength: 0,
  avatar: "https://upload.wikimedia.org/wikipedia/en/d/db/GutsBerserk.PNG",
};

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

it("should render the post card", () => {
  render(
    <Providers>
      <PostCard {...ExamplePost} />
    </Providers>
  );

  expect(screen.getByText("The Best of Bach")).toBeInTheDocument();
  expect(
    screen.getByText("Bach's music in a 3 hour long playlist")
  ).toBeInTheDocument();
  expect(screen.getByText("@Classical Music")).toBeInTheDocument();
  expect(screen.getAllByText("0").length).toBeGreaterThan(1);
  expect(screen.getByAltText("Spotify Song Image")).toBeInTheDocument();
});
