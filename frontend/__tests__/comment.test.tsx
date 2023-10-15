import { render, screen } from "@testing-library/react";
import { Providers } from "@/components/providers";
import { CommentCard } from "@/components/comment/comment-card";

const exampleComment = {
  body: "test comment",
  username: "test",
  commentId: 133,
  avatar: "AVATAR_3",
};

it("should render comment card", () => {
  render(
    <Providers>
      <CommentCard {...exampleComment} />
    </Providers>
  );

  expect(screen.getByText("test comment")).toBeInTheDocument();
  expect(screen.getByText("@test")).toBeInTheDocument();
  // expect(screen.getByAltText("test's Avatar")).toBeInTheDocument();
  // expect(image).toHaveAttribute("src", "/avatars/gudrid_avatar.png");
});
