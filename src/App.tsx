import { Routes, Route } from "react-router-dom";
import LoginForm from "./pages/Login/LoginForm";
import RegisterForm from "./pages/Register/RegisterForm";
import { useAuth } from "./contexts/authContext";

function App() {
  const auth = useAuth();
  const hello = auth ? <h1>hello, {auth.email}</h1> : <h1>hello, stranger</h1>;
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/" element={hello} />
      </Routes>
    </>
  );
}

export default App;
