import { useState } from "react";

import { useForm, SubmitHandler } from "react-hook-form";

import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";

import { useAuth } from "@/contexts/authContext";

import ErrorAuthMessage from "@/components/ui/ErrorAuthMessage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GoolgeSvg } from "@/assets/google";

import { formatErrorMessage } from "@/utils/formatErrorMessage";

type Inputs = {
  email: string;
  password: string;
};

export default function RegisterForm(): React.JSX.Element {
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
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div className="bg-[#0047AB]"></div>
      <div className="flex flex-col justify-center items-center h-screen w-full ">
        <div className="h-12 mb-4">
          {error !== "" && <ErrorAuthMessage message={error} />}
        </div>
        <div className="flex flex-col w-4/6 gap-y-3">
          <form onSubmit={handleSubmit(submitHandler)}>
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
              <div className="text-white text-xs flex flex-start mt-[0.25rem]">
                <div className="py-[0.125rem] px-[0.25rem] bg-red-600 rounded">
                  {errors.email.message}
                </div>
              </div>
            )}
            <label htmlFor="password" className="text-left">
              Password
            </label>
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
              <div className="text-white text-xs flex flex-start my-[0.25rem]">
                <div className="py-[0.125rem] px-[0.25rem] bg-red-600 rounded">
                  {errors.password.message}
                </div>
              </div>
            )}
            <div className="text-center">
              <Button
                className="rounded border-solid border-black  w-full"
                variant="outline"
                type="submit"
              >
                Create account
              </Button>
            </div>
          </form>
          <div className="text-center">
            <span>Or continue with</span>
          </div>
          {message !== "" && <p>{message}</p>}
          <Button
            onClick={googleLoginClickHandler}
            className="w-full rounded flex justify-items-center"
            variant="outline"
          >
            <GoolgeSvg />
            <span className="ml-2">Google</span>
          </Button>
          <div className="text-center">
            Already a user?{" "}
            <strong>
              <Link to="/login">Sign in</Link>
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
}
