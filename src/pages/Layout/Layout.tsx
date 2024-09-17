import SideNavigation from "@/components/ui/SideNavigation";
import { useAuth } from "@/contexts/authContext";
import { Navigate, Outlet } from "react-router-dom";

export default function Layout() {
  const auth = useAuth();

  if (!auth.user && auth.authenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      <SideNavigation />
      <Outlet />
    </div>
  );
}
