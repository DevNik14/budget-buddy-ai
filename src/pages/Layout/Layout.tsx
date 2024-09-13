import SideNavigation from "@/components/ui/SideNavigation";
import { useAuth } from "@/contexts/authContext";
import { Navigate, Outlet } from "react-router-dom";

export default function Layout() {
  const auth = useAuth();
  console.log(auth);

  if (!auth.user && auth.authenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <SideNavigation />
      <Outlet />
    </>
  );
}
