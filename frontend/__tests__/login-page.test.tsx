import { render, screen } from "@testing-library/react";
import { Providers } from "@/components/providers";
import LoginPage from "@/components/pages/login-page";
import { userEvent } from "@testing-library/user-event";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

describe("Login Page", () => {
  it("should load login data to form", async () => {
    render(
      <Providers>
        <LoginPage />
      </Providers>
    );
    const user = userEvent.setup();

    let submitButton = screen.getByText("Sign In");
    let email = screen.getByLabelText(/email/i);
    let password = screen.getByLabelText(/password/i);

    await user.type(email, "test@example.com");
    await user.type(password, "test123");
    await userEvent.click(submitButton);

    expect(screen.getByRole("form", { name: /login form/i })).toHaveFormValues({
      email: "test@example.com",
      password: "test123",
    });

    //  await screen.findByText("Login Successful");
  });
});
