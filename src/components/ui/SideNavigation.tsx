import { auth } from "@/config/firebase";
import { useAuth } from "@/contexts/authContext";

import { NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import { FirebaseError } from "firebase/app";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  CreditCard,
  Bot,
  Home,
  LogOut,
  PiggyBank,
  Settings,
} from "lucide-react";

export default function SideNavigation() {
  const navMenuItems = [
    { icon: Home, path: "dashboard", name: "Dashboard" },
    { icon: CreditCard, path: "transactions", name: "Transactions" },
    { icon: PiggyBank, path: "budget", name: "Budget" },
    { icon: Bot, path: "advisor", name: "AI Advisor" },
  ];
  const user = useAuth();

  const displayNavMenuItems = () => {
    return (
      <nav className="flex-1 p-5">
        <ul className="space-y-2">
          {navMenuItems.map((item) => {
            return (
              <NavLink
                className="w-full justify-start flex items-center"
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
    );
  };

  return (
    <aside className="w-64 bg-white shadow-md">
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
      {displayNavMenuItems()}
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
