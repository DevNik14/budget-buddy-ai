import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LoginFormPage from "../../src/pages/Login";
import { AuthContext } from "@/contexts/authContext";
import { vi } from "vitest";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const mockAuthContext = {
  loginHandler: vi.fn(),
  setAuthenticated: vi.fn(),
  user: null,
  loading: false,
};

const renderLoginForm = () => {
  return render(
    <AuthContext.Provider value={mockAuthContext}>
      <MemoryRouter>
        <LoginFormPage />
      </MemoryRouter>
    </AuthContext.Provider>
  );
};

describe("Login", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render login form with all elements", () => {
    renderLoginForm();

    expect(screen.getByText("Login to your account")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /google/i })).toBeInTheDocument();
  });

  it("should have disabled login button when fields are empty", () => {
    renderLoginForm();

    const loginButton = screen.getByRole("button", { name: "Login" });
    expect(loginButton).toBeDisabled();
  });

  it("should enable login button when both fields have values", async () => {
    renderLoginForm();

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const loginButton = screen.getByRole("button", { name: "Login" });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    await waitFor(() => {
      expect(loginButton).not.toBeDisabled();
    });
  });

  it("should handle successful login and navigation", async () => {
    mockAuthContext.loginHandler.mockResolvedValueOnce({
      user: {
        email: "test@example.com",
      },
    });
    renderLoginForm();

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const loginButton = screen.getByRole("button", { name: "Login" });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(mockAuthContext.loginHandler).toHaveBeenCalledWith(
        "test@example.com",
        "password123"
      );
      expect(mockAuthContext.setAuthenticated).toHaveBeenCalledWith(true);
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });

  it("should handle login failure and show error message", async () => {
    const firebaseError = {
      code: "auth/invalid-credential",
    };
    mockAuthContext.loginHandler.mockRejectedValueOnce(firebaseError);

    renderLoginForm();

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const loginButton = screen.getByRole("button", { name: "Login" });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "wrongpassword" } });

    fireEvent.click(loginButton);

    await waitFor(
      () => {
        const errorContainer = screen.getByRole("alert");
        expect(errorContainer.textContent).toBe("Invalid credential");
      },
      { timeout: 3000 }
    );
  });

  it("should show development message for Google login", async () => {
    vi.useFakeTimers();
    renderLoginForm();

    const googleButton = screen.getByRole("button", { name: /google/i });
    fireEvent.click(googleButton);

    expect(screen.getByText("Still in development")).toBeInTheDocument();

    await vi.runAllTimersAsync();

    expect(screen.queryByText("Still in development")).not.toBeInTheDocument();

    vi.useRealTimers();
  });
});
