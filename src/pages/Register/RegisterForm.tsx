import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaGoogle } from "react-icons/fa6";

export default function RegisterForm(): React.JSX.Element {
  const [message, setMessage] = useState("");

  const googleLoginClickHandler = () => {
    setMessage("Still in development");

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  return (
    <>
      <main>
        <form>
          <Input type="email" placeholder="name@example.com" />
          <Input type="password" placeholder="Password" />
          <Button>Sign in with email</Button>
        </form>
        <span>Or continue with</span>
        {message !== "" && <p>{message}</p>}
        <Button onClick={googleLoginClickHandler}>
          <FaGoogle />
          Google
        </Button>
      </main>
    </>
  );
}
