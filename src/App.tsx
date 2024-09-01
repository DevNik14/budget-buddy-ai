import { Routes, Route } from "react-router-dom";
import LoginForm from "./pages/Login/LoginForm";
import RegisterForm from "./pages/Register/RegisterForm";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/" element={<h1>Home</h1>} />
      </Routes>

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
