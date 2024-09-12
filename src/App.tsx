import { Routes, Route } from "react-router-dom";
import { signOut } from "firebase/auth";
import { FirebaseError } from "firebase/app";

import LoginForm from "./pages/Login/LoginForm";
import RegisterForm from "./pages/Register/RegisterForm";
import Layout from "./pages/Layout/Layout";

import { auth } from "./config/firebase";
import { useAuth } from "./contexts/authContext";

function App() {
  const user = useAuth();
  const hello = user ? <h1>hello, {user.email}</h1> : <h1>hello, stranger</h1>;
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route element={<Layout />}>
          <Route path="/" element={hello} />
        </Route>
      </Routes>
      <button
        onClick={() => {
          signOut(auth)
            .then(() => {
              console.log("Signed out");
            })
            .catch((error) => {
              if (error instanceof FirebaseError) {
                console.log(error);
              }
            });
        }}
      >
        Sign out
      </button>
    </>
  );
}

export default App;
