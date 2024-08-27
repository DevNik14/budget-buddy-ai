import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormEvent, useState } from "react";
import { GoolgeSvg } from "@/assets/google";
import { Link } from "react-router-dom";

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

type State = {
  doesEmailPassChecks: {
    criteria: boolean;
    requirementMessage: string;
  };
  passwordLength: {
    criteria: boolean;
    requirementMessage: string;
  };
  doesPasswordIncludesUpperCaseLetter: {
    criteria: boolean;
    requirementMessage: string;
  };
  doesPasswordIncludesLowerCaseLetter: {
    criteria: boolean;
    requirementMessage: string;
  };
  doesPasswordIncludesADigit: {
    criteria: boolean;
    requirementMessage: string;
  };
};

export default function RegisterForm(): React.JSX.Element {
  const [message, setMessage] = useState("");
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  const [userInputRequirements, setUserInputRequirements] = useState({
    doesEmailPassChecks: {
      criteria: false,
      requirementMessage: "email@email.com",
    },
    passwordLength: {
      criteria: false,
      requirementMessage:
        "Password needs to be between 6 and 30 characters long",
    },
    doesPasswordIncludesUpperCaseLetter: {
      criteria: false,
      requirementMessage: "At least 1 capital letter",
    },
    doesPasswordIncludesLowerCaseLetter: {
      criteria: false,
      requirementMessage: "At least 1 lower case letter",
    },
    doesPasswordIncludesADigit: {
      criteria: false,
      requirementMessage: "At least 1 digit",
    },
  });

  const validateEmailHandler = (state: State, value: string) => {
    const emailRegex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm;
    const isEmailValid = emailRegex.test(value);
    setUserInputRequirements((oldRequirements) => {
      return {
        ...oldRequirements,
        doesEmailPassChecks: {
          ...oldRequirements.doesEmailPassChecks,
          criteria: isEmailValid,
        },
      };
    });
  };

  const validatePasswordIncludesCapitalLetterHandler = (
    state: State,
    value: string,
    letterCase: string
  ) => {
    const regex = letterCase === "Upper" ? /.*[A-Z].*/ : /.*[a-z].*/;
    const foundCapitalLetter = regex.test(value);
    const key =
      `doesPasswordIncludes${letterCase}CaseLetter` as keyof typeof userInputRequirements;
    setUserInputRequirements((oldRequirements) => {
      return {
        ...oldRequirements,
        [key]: {
          ...oldRequirements[key],
          criteria: foundCapitalLetter,
        },
      };
    });
  };

  const validatePasswordLengthHandler = (state: State, value: string) => {
    const inRange = value.length > 5 && value.length < 31;
    setUserInputRequirements((oldRequirements) => {
      return {
        ...oldRequirements,
        passwordLength: {
          ...oldRequirements.passwordLength,
          criteria: inRange,
        },
      };
    });
  };

  const validatePasswordIncludesDigit = (state: State, value: string) => {
    const hasDigit = /.*[0-9].*/.test(value);
    setUserInputRequirements((oldRequirements) => {
      return {
        ...oldRequirements,
        doesPasswordIncludesADigit: {
          ...oldRequirements.doesPasswordIncludesADigit,
          criteria: hasDigit,
        },
      };
    });
  };

  const userCredentialsHandler = (e: FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (target.name === "email") {
      validateEmailHandler(userInputRequirements, target.value);
    } else {
      validatePasswordLengthHandler(userInputRequirements, target.value);

      validatePasswordIncludesCapitalLetterHandler(
        userInputRequirements,
        target.value,
        "Upper"
      );

      validatePasswordIncludesCapitalLetterHandler(
        userInputRequirements,
        target.value,
        "Lower"
      );

      validatePasswordIncludesDigit(userInputRequirements, target.value);
    }

    setUserCredentials((oldCredentials) => {
      return {
        ...oldCredentials,
        [target.name]: target.value,
      };
    });
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
            <div className="flex flex-col w-4/6 text-center gap-y-3">
              <label htmlFor="email" className="text-left">
                Email
              </label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="name@example.com"
                className="rounded"
                value={userCredentials.email}
                onChange={userCredentialsHandler}
              />
              <div>
                <ul className="text-left text-sm text-slate-700">
                  {Object.values(userInputRequirements)
                    .slice(0, 1)
                    .map((value, i) => (
                      <li
                        key={i}
                        className={
                          value.criteria ? "text-lime-500" : "text-red-500"
                        }
                      >
                        {value.requirementMessage}
                      </li>
                    ))}
                </ul>
              </div>
              <label htmlFor="password" className="text-left">
                Password
              </label>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="Password"
                className="rounded"
                value={userCredentials.password}
                onChange={userCredentialsHandler}
              />
              <ul className="text-left text-sm text-slate-700">
                {Object.values(userInputRequirements)
                  .slice(1)
                  .map((value, i) => (
                    <li
                      key={i}
                      className={
                        value.criteria ? "text-lime-500" : "text-red-500"
                      }
                    >
                      {value.requirementMessage}
                    </li>
                  ))}
              </ul>
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
