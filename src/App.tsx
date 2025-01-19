import { Routes, Route } from "react-router-dom";

import Layout from "./pages/Layout/Layout";
import DashboardPage from "./pages/Dashboard";
import ExpensesPage from "./pages/Expenses";
import AddExpensePage from "./pages/Expenses/AddExpense";
import BudgetPage from "./pages/Budget";
import AdvisorPage from "./pages/Advisor";
import NotFoundPage from "./pages/NotFound";
import UserSettingsPage from "./pages/UserSettings";
import LoginFormPage from "./pages/Login";
import RegisterFormPage from "./pages/Register";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginFormPage />} />
        <Route path="/register" element={<RegisterFormPage />} />
        <Route element={<Layout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/expenses" element={<ExpensesPage />} />
          <Route path="/expenses/add" element={<AddExpensePage />} />
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
