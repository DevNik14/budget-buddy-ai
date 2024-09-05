import { Routes, Route } from "react-router-dom";
import LoginForm from "./pages/Login/LoginForm";
import RegisterForm from "./pages/Register/RegisterForm";
import { useContext } from "react";
import { AuthContext } from "./contexts/authContext";

function App() {
  const authContext = useContext(AuthContext);
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/" element={<h1>Hello, {authContext?.user?.email}</h1>} />
      </Routes>
    </>
  );
}

export default App;
