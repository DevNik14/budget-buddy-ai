import { useAuth } from "@/contexts/authContext";
import { Navigate, Outlet } from "react-router-dom";

export default function Layout() {
  const auth = useAuth();

  if (!auth) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
