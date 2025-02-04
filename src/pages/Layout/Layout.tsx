import SideNavigation from "@/components/ui/SideNavigation";
import { Navigate, Outlet } from "react-router-dom";

export default function Layout() {
  const userEmail = localStorage.getItem("user");

  if (!userEmail) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <SideNavigation />
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
}
