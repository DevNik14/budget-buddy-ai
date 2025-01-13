import { useState } from "react";

import { useForm, SubmitHandler } from "react-hook-form";

import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";

import { useAuth } from "@/contexts/authContext";

import { cn } from "@/lib/utils";

import ErrorAuthMessage from "@/components/ui/ErrorAuthMessage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GoolgeSvg } from "@/assets/google";

import { formatErrorMessage } from "@/utils/formatErrorMessage";

type Inputs = {
  email: string;
  password: string;
};

export default function RegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">): React.JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const user = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const googleLoginClickHandler = () => {
    setMessage("Still in development");

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const createUserHandler = async (data: Inputs) => {
    const { email, password } = data;
    try {
      await user.registerHandler(email, password);
      navigate("/");
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(formatErrorMessage(error));
        setTimeout(() => {
          setError("");
        }, 5000);
      }
    }
  };

  const submitHandler: SubmitHandler<Inputs> = (data) =>
    createUserHandler(data);

  return (
    <>
      <div className="h-12 mb-4 errorMessage">
        {error !== "" && <ErrorAuthMessage message={error} />}
      </div>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className={cn("flex flex-col gap-6", className)}
        {...props}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Sign up</h1>
        </div>
        <div className="grid gap-6">
          <div className="grid gap-2 relative ">
            <label htmlFor="email" className="text-left">
              Email
            </label>
            <Input
              className="rounded"
              type="text"
              id="email"
              {...register("email", {
                pattern: {
                  value: /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm,
                  message: "Email must be valid",
                },
                required: "Must enter an email",
              })}
            />
            {errors.email && (
              <div className="text-white text-xs flex flex-start mt-[0.25rem] absolute bottom-[-21px]">
                <div className="py-[0.125rem] px-[0.25rem] bg-red-600 rounded">
                  {errors.email.message}
                </div>
              </div>
            )}
          </div>
          <div className="grid gap-2 relative">
            <div className="flex items-center">
              <label htmlFor="password" className="text-left">
                Password
              </label>
              <Link
                to="/register"
                className="ml-auto text-sm underline-offset-4 hover:underline"
              >
                Forgot your password?
              </Link>
            </div>
            <Input
              className="rounded"
              type="password"
              id="password"
              {...register("password", {
                minLength: {
                  value: 6,
                  message: "Password must be atleast 6 characters",
                },
                required: "Must enter a password",
              })}
            />
            {errors.password && (
              <div className="text-white text-xs flex flex-start my-[0.25rem] absolute bottom-[-25px]">
                <div className="py-[0.125rem] px-[0.25rem] bg-red-600 rounded">
                  {errors.password.message}
                </div>
              </div>
            )}
          </div>
          <div className="text-center">
            <Button
              className="rounded border-solid border-black  w-full"
              variant="outline"
              type="submit"
            >
              Create account
            </Button>
          </div>
        </div>
        <div className="relative text-center text-sm">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </form>
      {message !== "" && <p>{message}</p>}
      <Button
        onClick={googleLoginClickHandler}
        className="w-full rounded flex justify-items-center mb-[1.5rem] mt-[1.5rem]"
        variant="outline"
      >
        <GoolgeSvg />
        <span className="ml-2">Google</span>
      </Button>
      <div className="text-center text-sm">
        Already a user?{" "}
        <strong>
          <Link to="/login">Sign in</Link>
        </strong>
      </div>
    </>
  );
}
