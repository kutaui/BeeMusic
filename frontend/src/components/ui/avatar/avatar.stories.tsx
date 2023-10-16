import type { Meta, StoryObj } from "@storybook/react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

const meta: Meta<typeof Avatar> = {
  component: Avatar,
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  render: (args) => (
    <Avatar className="w-20 h-20">
      <AvatarImage src="/avatars/thorfinn_avatar.jpg" />
      <AvatarFallback>asd</AvatarFallback>
    </Avatar>
  ),
};
