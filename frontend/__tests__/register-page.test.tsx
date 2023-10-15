import { act, render, screen } from "@testing-library/react";
import { Providers } from "@/components/providers";
import RegisterPage from "@/components/pages/register-page";
import { userEvent } from "@testing-library/user-event";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

describe("Register Page", () => {
  it("should load register data to form", async () => {
    render(
      <Providers>
        <RegisterPage />
      </Providers>
    );
    const user = userEvent.setup();

    let submitButton = screen.getByText("Register");
    let email = screen.getByLabelText(/email/i);
    let username = screen.getByLabelText(/username/i);
    let password = screen.getByLabelText(/password/i);

    await user.type(email, "test@example.com");
    await user.type(username, "test");
    await user.type(password, "test123");

    await userEvent.click(submitButton);

    expect(
      screen.getByRole("form", { name: /register form/i })
    ).toHaveFormValues({
      email: "test@example.com",
      username: "test",
      password: "test123",
    });
  });
});
