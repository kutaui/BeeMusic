import type { Meta, StoryObj } from "@storybook/react";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "./card";

const meta: Meta<typeof Card> = {
  component: Card,
};
export default meta;
type Story = StoryObj<typeof Card>;

export const CardBase: Story = {
  args: {
    title: "Card",
  },
  render: (args) => (
    <Card {...args} className="border w-96">
      <CardHeader>
        <CardTitle>{args.title}</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>Card Content</CardContent>
      <CardFooter>Card Footer</CardFooter>
    </Card>
  ),
};
