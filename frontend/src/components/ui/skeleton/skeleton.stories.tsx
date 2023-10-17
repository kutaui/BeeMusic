import type { Meta, StoryObj } from "@storybook/react";
import { CommentSkeleton, PostSkeleton } from "./skeleton";

const meta: Meta<typeof PostSkeleton> = {
  component: PostSkeleton,
};

export default meta;

type Story = StoryObj<typeof PostSkeleton>;

export const SkeletonPost: Story = {
  render: () => <PostSkeleton className="" />,
};

export const SkeletonComment: Story = {
  render: () => <CommentSkeleton className="" />,
};
