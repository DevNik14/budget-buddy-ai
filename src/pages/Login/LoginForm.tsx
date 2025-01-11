import { ComponentPropsWithoutRef, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GoolgeSvg } from "@/assets/google";
import { FirebaseError } from "firebase/app";
import { formatErrorMessage } from "@/utils/formatErrorMessage";
import { useAuth } from "@/contexts/authContext";
import ErrorAuthMessage from "@/components/ui/ErrorAuthMessage";

type Inputs = {
  email: string;
  password: string;
};

export default function LoginForm({
  className,
  ...props
}: ComponentPropsWithoutRef<"form">): React.JSX.Element {
  const user = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const { handleSubmit, control, watch } = useForm<Inputs>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => loginHandler(data);

  const disableLoginButton = () => {
    return watch(["email", "password"]).some((val) => val === "");
  };

  const loginHandler = async (data: Inputs) => {
    const { email, password } = data;
    try {
      await user.loginHandler(email, password);
      user.setAuthenticated(true);
      navigate("/");
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(formatErrorMessage(error));
        setTimeout(() => {
          setError("");
        }, 3000);
      }
    }
  };

  const googleLoginClickHandler = () => {
    setMessage("Still in development");

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  return (
    <>
      <div className="h-12 mb-4">
        {error !== "" && <ErrorAuthMessage message={error} />}
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn("flex flex-col gap-6", className)}
        {...props}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-balance text-sm text-muted-foreground">
            Enter your email below to login to your account
          </p>
        </div>
        <div className="grid gap-6">
          <div className="grid gap-2">
            <label htmlFor="email" className="text-left">
              Email
            </label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input className="rounded" id="email" {...field} />
              )}
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <label htmlFor="password" className="text-left">
                Password
              </label>
              <Link
                to="/login"
                className="ml-auto text-sm underline-offset-4 hover:underline"
              >
                Forgot your password?
              </Link>
            </div>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input
                  className="rounded"
                  type="password"
                  id="password"
                  {...field}
                />
              )}
            />
          </div>
        </div>
        <Button
          className="rounded border-solid border-black w-full"
          variant="outline"
          disabled={disableLoginButton()}
          type="submit"
        >
          Login
        </Button>
        <div className="relative text-center text-sm">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </form>
      {message !== "" && <p className="text-center text-sm">{message}</p>}
      <Button
        onClick={googleLoginClickHandler}
        className="w-full rounded flex justify-items-center mb-[1.5rem] mt-[1.5rem]"
        variant="outline"
      >
        <GoolgeSvg />
        <span className="ml-2">Google</span>
      </Button>
      <div className="text-center text-sm">
        Don't have an account?{" "}
        <strong>
          <Link to="/register">Sign up here</Link>
        </strong>
      </div>
    </>
  );
}
