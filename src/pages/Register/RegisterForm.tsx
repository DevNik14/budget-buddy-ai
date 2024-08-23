import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// UI
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { GoolgeSvg } from "@/assets/google";
import { Link } from "react-router-dom";

export default function RegisterForm(): React.JSX.Element {
  const [message, setMessage] = useState("");

  const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  };

  const app = initializeApp(firebaseConfig);

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
            <div className="flex flex-col w-4/6 text-center gap-y-3">
              <label htmlFor="email" className="text-left">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                className="rounded"
              />
              <label htmlFor="password" className="text-left">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                className="rounded"
              />
              <label htmlFor="firstName" className="text-left">
                First Name
              </label>
              <Input
                id="firstName"
                type="text"
                placeholder="First Name"
                className="rounded"
              />
              <label htmlFor="lastName" className="text-left">
                last Name
              </label>
              <Input
                id="lastName"
                type="text"
                placeholder="Last Name"
                className="rounded"
              />
              <Button
                className="rounded border-solid border-black"
                variant="outline"
              >
                Sign up
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
                Already a user?{" "}
                <strong>
                  <Link to="/login">Sign in</Link>
                </strong>
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
