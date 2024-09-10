import { useAuth } from "@/contexts/authContext";
import { Navigate, Outlet } from "react-router-dom";

export default function Layout() {
  const auth = useAuth();
  if (auth?.email) {
    <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
