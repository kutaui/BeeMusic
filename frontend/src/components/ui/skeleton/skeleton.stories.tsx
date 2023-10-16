import type { Meta, StoryObj } from "@storybook/react";
import { PostSkeleton } from "./skeleton";

const meta: Meta<typeof PostSkeleton> = {
  component: PostSkeleton,
};

export default meta;

type Story = StoryObj<typeof PostSkeleton>;

export const SkeletonPost: Story = {
  render: () => <PostSkeleton className="border border-gray-500 w-32 h-32" />,
};
