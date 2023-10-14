import { render, screen } from "@testing-library/react";
import { Button } from "./button";

it("renders a button", () => {
  render(<Button>Button</Button>);
  expect(screen.getByRole("button")).toBeInTheDocument();
});
