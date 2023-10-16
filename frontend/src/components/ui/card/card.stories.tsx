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
    // @ts-ignore
    description: "Card description",
    content: "Card content",
    footer: "Card footer",
  },
  render: (args) => (
    <Card {...args} className="border w-96">
      <CardHeader>
        <CardTitle className="border">{args.title}</CardTitle>
        {/* @ts-ignore */}
        <CardDescription className="border">{args.description}</CardDescription>
      </CardHeader>
      <CardContent className="border">{args.content}</CardContent>
      {/* @ts-ignore */}
      <CardFooter className="border">{args.footer}</CardFooter>
    </Card>
  ),
};
