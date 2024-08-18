import { app, auth, createUserWithEmailAndPassword } from "./config/firebase";
import { Routes, Route } from "react-router-dom";
import LoginForm from "./pages/Login/LoginForm";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<h2>Login Page</h2>} />
      </Routes>
      <LoginForm />
      <footer className="absolute bottom-0 text-center w-full">
        Built with &#x2764; by{" "}
        <a href="https://github.com/DevNik14" target="_blank">
          <strong>Nikolay Kyurchiyski</strong>
        </a>
      </footer>
    </>
  );
}

export default App;
