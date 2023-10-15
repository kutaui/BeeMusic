import { waitFor, render, screen } from "@testing-library/react";
import { Providers } from "@/components/providers";
import ProfileCard from "@/components/profile-card";

const ExampleProfile = {
  username: "test",
  avatar: "AVATAR_4",
};

it("should render the profile card", async () => {
  render(
    <Providers>
      <ProfileCard {...ExampleProfile} />
    </Providers>
  );

  expect(screen.getByText("@test")).toBeInTheDocument();
});
