import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LoginFormPage from "../../src/pages/Login";

const renderWithRouter = (ui: React.ReactElement) => {
  return render(ui, { wrapper: MemoryRouter });
};

describe("Login", () => {
  it("should render a button with a Login text", () => {
    renderWithRouter(<LoginFormPage />);

    const loginButton = screen
      .getAllByRole("button")
      .filter((button) => button.textContent === "Login")[0];

    expect(loginButton).toBeInTheDocument();
  });
});
