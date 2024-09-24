import { Routes, Route } from "react-router-dom";

import Layout from "./pages/Layout/Layout";
import DashboardPage from "./pages/Dashboard";
import LoginForm from "./pages/Login/LoginForm";
import RegisterForm from "./pages/Register/RegisterForm";
import TransactionsPage from "./pages/Transactions";
import BudgetPage from "./pages/Budget";
import AdvisorPage from "./pages/Advisor";
import NotFoundPage from "./pages/NotFound";
import UserSettingsPage from "./pages/UserSettings";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route element={<Layout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/budget" element={<BudgetPage />} />
          <Route path="/advisor" element={<AdvisorPage />} />
          <Route path="/settings" element={<UserSettingsPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
