import { auth } from "@/config/firebase";
import { useAuth } from "@/contexts/authContext";
import { navMenuItems } from "@/data/navItems";

import { NavLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { FirebaseError } from "firebase/app";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut, Settings } from "lucide-react";

const setActiveClassHandler = ({ isActive }: { isActive: boolean }) => {
  return `w-full justify-start flex items-center h-10 px-4 py-2 rounded  ${
    isActive ? "bg-slate-300" : ""
  }`;
};

export default function LargeScreenNav() {
  const navigate = useNavigate();
  const user = useAuth();

  return (
    <aside className="w-64 bg-white shadow-md hidden md:flex md:flex-col">
      <div className="p-5">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold">John Doe</h2>
            <p className="text-sm text-gray-500">john@example.com</p>
          </div>
        </div>
      </div>
      {
        <nav className="flex-1 p-5">
          <ul className="space-y-2">
            {navMenuItems.map((item) => {
              return (
                <NavLink
                  className={setActiveClassHandler}
                  to={item.path}
                  key={item.name}
                >
                  {<item.icon className="mr-2 h-4 w-4" />}
                  {item.name}
                </NavLink>
              );
            })}
          </ul>
        </nav>
      }
      <div className="p-5 space-y-2">
        <Button variant="outline" className="w-full justify-start">
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={() => {
            signOut(auth)
              .then(() => {
                user.setAuthenticated(false);
                navigate("/login", { replace: true });
                console.log("Signed out");
              })
              .catch((error) => {
                if (error instanceof FirebaseError) {
                  console.log(error);
                }
              });
          }}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign out
        </Button>
      </div>
    </aside>
  );
}