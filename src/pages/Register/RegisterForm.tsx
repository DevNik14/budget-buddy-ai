import { FormEvent, useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { auth } from "@/config/firebase";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GoolgeSvg } from "@/assets/google";

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

type ACTION = {
  type: string;
  payload: boolean;
  key?: string;
};

const reducer = (state: State, action: ACTION) => {
  switch (action.type) {
    case "VALIDATE_EMAIL":
      return {
        ...state,
        doesEmailPassChecks: {
          ...state.doesEmailPassChecks,
          criteria: action.payload,
        },
      };
    case "VALIDATE_PASSWORD_CASE_LETTER":
      return {
        ...state,
        [action.key!]: {
          ...state[action.key as keyof typeof state],
          criteria: action.payload,
        },
      };
    case "VALIDATE_PASSWORD_LENGTH":
      return {
        ...state,
        passwordLength: {
          ...state.passwordLength,
          criteria: action.payload,
        },
      };
    case "VALIDATE_PASSWORD_FOR_DIGITS":
      return {
        ...state,
        doesPasswordIncludesADigit: {
          ...state.doesPasswordIncludesADigit,
          criteria: action.payload,
        },
      };
    default:
      return state;
  }
};

export default function RegisterForm(): React.JSX.Element {
  const initialUserInputRequirements: State = {
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
  };
  const [message, setMessage] = useState("");
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });
  const [hideEmailRequirmentMessage, setHideEmailRequirmentMessage] =
    useState(false);
  const [hidePasswordRequirmentMessage, setHidePasswordRequirmentMessage] =
    useState(false);

  const [userInputRequirements, dispatch] = useReducer<
    React.Reducer<State, ACTION>
  >(reducer, initialUserInputRequirements);

  const disableEmailHintsHandler = () => {
    if (userInputRequirements.doesEmailPassChecks.criteria)
      setHideEmailRequirmentMessage(true);
  };

  const disablePasswordHintsHandler = () => {
    if (
      Object.values(userInputRequirements)
        .slice(1)
        .every((val) => val.criteria)
    ) {
      setHidePasswordRequirmentMessage(true);
    }
  };

  useEffect(() => {
    disableEmailHintsHandler();
    disablePasswordHintsHandler();
  }, [userInputRequirements]);

  const toggleRequirmentMessagesHandler = (
    val: boolean,
    credential: string
  ) => {
    if (credential === "email") {
      if (hideEmailRequirmentMessage && !val) {
        setHideEmailRequirmentMessage(false);
      }
    } else {
      if (hidePasswordRequirmentMessage && !val) {
        setHidePasswordRequirmentMessage(false);
      }
    }
  };

  const validateEmailHandler = (value: string) => {
    const emailRegex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm;
    const isEmailValid = emailRegex.test(value);
    toggleRequirmentMessagesHandler(isEmailValid, "email");
    dispatch({ type: "VALIDATE_EMAIL", payload: isEmailValid });
  };

  const validatePasswordCaseHandler = (value: string, letterCase: string) => {
    const regex = letterCase === "Upper" ? /.*[A-Z].*/ : /.*[a-z].*/;
    const foundCapitalLetter = regex.test(value);
    const key =
      `doesPasswordIncludes${letterCase}CaseLetter` as keyof typeof userInputRequirements;
    toggleRequirmentMessagesHandler(foundCapitalLetter, "password");
    dispatch({
      type: `VALIDATE_PASSWORD_CASE_LETTER`,
      payload: foundCapitalLetter,
      key,
    });
  };

  const validatePasswordLengthHandler = (value: string) => {
    const inRange = value.length > 5 && value.length < 31;
    toggleRequirmentMessagesHandler(inRange, "password");
    dispatch({ type: "VALIDATE_PASSWORD_LENGTH", payload: inRange });
  };

  const validatePasswordIncludesDigitHandler = (value: string) => {
    const hasDigit = /.*[0-9].*/.test(value);
    toggleRequirmentMessagesHandler(hasDigit, "password");
    dispatch({
      type: "VALIDATE_PASSWORD_FOR_DIGITS",
      payload: hasDigit,
    });
  };

  const displayRequirementMessage = (start: number, end?: number) => {
    return Object.values(userInputRequirements)
      .slice(start, end)
      .map((value, i) => (
        <li
          key={i}
          className={value.criteria ? "text-lime-500" : "text-red-500"}
        >
          {value.requirementMessage}
        </li>
      ));
  };

  const disableSignUpButtonHandler = () =>
    !Object.values(userInputRequirements).every((val) => val.criteria);

  const userCredentialsHandler = (e: FormEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    if (name === "email") {
      validateEmailHandler(value);
    } else {
      validatePasswordLengthHandler(value);

      validatePasswordCaseHandler(value, "Upper");

      validatePasswordCaseHandler(value, "Lower");

      validatePasswordIncludesDigitHandler(value);
    }

    setUserCredentials((oldCredentials) => ({
      ...oldCredentials,
      [name]: value,
    }));
  };

  const googleLoginClickHandler = () => {
    setMessage("Still in development");

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const createUserHandler = (e) => {
    const target = e.currentTarget;
    console.log(target);

    // createUserWithEmailAndPassword(
    //   auth,
    //   userCredentials.email,
    //   userCredentials.password
    // )
    //   .then((credentials) => {
    //     const user = credentials.user;
    //     console.log(user);
    //   })
    //   .catch((error) => {
    //     console.log(error.code);
    //     console.log(error.message);
    //   });
    console.log("clicked");
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
              <ul
                className={`text-left text-sm text-slate-700 ${
                  hideEmailRequirmentMessage && `hidden`
                }`}
              >
                {displayRequirementMessage(0, 1)}
              </ul>
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
              <ul
                className={`text-left text-sm text-slate-700 ${
                  hidePasswordRequirmentMessage && `hidden`
                }`}
              >
                {displayRequirementMessage(1)}
              </ul>
              <Button
                className="rounded border-solid border-black"
                variant="outline"
                disabled={disableSignUpButtonHandler()}
                onClick={createUserHandler}
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
