import { useState, FormEvent } from "react";

import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "@/config/firebase";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GoolgeSvg } from "@/assets/google";
import { FirebaseError } from "firebase/app";
import { formatErrorMessage } from "@/utils/formatErrorMessage";
import { useAuth } from "@/contexts/authContext";

export default function LoginForm(): React.JSX.Element {
  const user = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const userCredentialsHandler = (e: FormEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;

    setUserCredentials((oldCredentials) => ({
      ...oldCredentials,
      [name]: value,
    }));
  };

  const disableLoginButton = () => {
    return Object.values(userCredentials).some((val) => val === "");
  };

  const loginHandler = async () => {
    try {
      await signInWithEmailAndPassword(
        auth,
        userCredentials.email,
        userCredentials.password
      );
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
              {error !== "" && (
                <p className="text-red-500 bg-red-100 px-4 py-2 rounded-md text-sm transition-opacity duration-300 ease-in-out">
                  {error}
                </p>
              )}
            </div>
            <div className="flex flex-col w-4/6 text-center gap-y-3">
              <label htmlFor="email" className="text-left">
                Email
              </label>
              <Input
                id="email"
                type="email"
                name="email"
                value={userCredentials.email}
                onChange={userCredentialsHandler}
                placeholder="name@example.com"
                className="rounded"
              />
              <label htmlFor="password" className="text-left">
                Password
              </label>
              <Input
                id="password"
                type="password"
                name="password"
                value={userCredentials.password}
                onChange={userCredentialsHandler}
                placeholder="Password"
                className="rounded"
              />
              <Button
                className="rounded border-solid border-black"
                variant="outline"
                disabled={disableLoginButton()}
                onClick={loginHandler}
              >
                Login in with email
              </Button>
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
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
