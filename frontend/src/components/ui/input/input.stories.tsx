import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./input";

const meta: Meta<typeof Input> = {
  component: Input,
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: "Placeholder",
  },
  render: (args) => <Input {...args} className="rounded-none" />,
};

export const MDRound: Story = {
  args: {
    placeholder: "Placeholder",
  },
};

export const Rounded: Story = {
  args: {
    placeholder: "Placeholder",
  },
  render: (args) => <Input {...args} className="rounded-full" />,
};
