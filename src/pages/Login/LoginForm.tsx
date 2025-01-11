import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

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

export default function LoginForm(): React.JSX.Element {
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
      <main>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="bg-[#0047AB]"></div>
          <div className="flex flex-col justify-center items-center h-screen w-full">
            <div className="h-12 mb-4">
              {error !== "" && <ErrorAuthMessage message={error} />}
            </div>
            <div className="flex flex-col w-4/6 text-center gap-y-3">
              <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="email" className="text-left">
                  Email
                </label>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input className="rounder" id="email" {...field} />
                  )}
                />
                <label htmlFor="password" className="text-left">
                  Password
                </label>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <Input
                      className="rounder"
                      type="password"
                      id="password"
                      {...field}
                    />
                  )}
                />
                <Button
                  className="rounded border-solid border-black"
                  variant="outline"
                  aria-disabled={disableLoginButton()}
                  type="submit"
                >
                  Login in with email
                </Button>
                <br />
                <span>Or continue with</span>
                {message !== "" && <p>{message}</p>}
                <Button
                  onClick={googleLoginClickHandler}
                  className="w-full rounded flex justify-items-center"
                  variant="outline"
                >
                  <GoolgeSvg />
                  <span className="ml-2">Google</span>
                </Button>
                <p>
                  Don't have an account?{" "}
                  <strong>
                    <Link to="/register">Sign up here</Link>
                  </strong>
                </p>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
