import { Routes, Route } from "react-router-dom";

import Layout from "./pages/Layout/Layout";
import DashboardPage from "./pages/Dashboard";
import LoginForm from "./pages/Login/LoginForm";
import RegisterForm from "./pages/Register/RegisterForm";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route element={<Layout />}>
          <Route path="/" element={<DashboardPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
