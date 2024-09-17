import { useAuth } from "@/contexts/authContext";

import { auth } from "@/config/firebase";
import { NavLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { FirebaseError } from "firebase/app";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Menu,
  CreditCard,
  Bot,
  Home,
  LogOut,
  PiggyBank,
  Settings,
} from "lucide-react";

import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

const navMenuItems = [
  { icon: Home, path: "/", name: "Dashboard" },
  { icon: CreditCard, path: "transactions", name: "Transactions" },
  { icon: PiggyBank, path: "budget", name: "Budget" },
  { icon: Bot, path: "advisor", name: "AI Advisor" },
];

export default function MobileNavigation() {
  const user = useAuth();
  const navigate = useNavigate();
  return (
    <header className="flex h-14 items-center gap-4 border-b px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetDescription>
          <VisuallyHidden.Root>Mobile Navigation</VisuallyHidden.Root>
        </SheetDescription>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col bg-white shadow-md">
          <SheetTitle>
            <VisuallyHidden.Root>Menu</VisuallyHidden.Root>
          </SheetTitle>
          <aside className="md:hidden">
            <div className="p-5">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage
                    src="/placeholder.svg?height=40&width=40"
                    alt="User"
                  />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-semibold">John Doe</h2>
                  <p className="text-sm text-gray-500">john@example.com</p>
                </div>
              </div>
            </div>
            <nav className="flex-1 p-5 text-lg font-medium">
              <ul className="space-y-2">
                {navMenuItems.map((item) => {
                  return (
                    <NavLink
                      to={item.path}
                      key={item.name}
                      className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
                    >
                      <SheetTrigger className="flex items-center">
                        {<item.icon className="mr-2 h-4 w-4" />}
                        {item.name}
                      </SheetTrigger>
                    </NavLink>
                  );
                })}
              </ul>
            </nav>
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
        </SheetContent>
      </Sheet>
    </header>
  );
}
