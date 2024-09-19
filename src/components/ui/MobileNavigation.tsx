import { navMenuItems } from "@/data/navItems";

import { NavLink } from "react-router-dom";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

import { Menu } from "lucide-react";

import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import NavAvatar from "./NavAvatar";
import UserActionMenu from "./UserActionMenu";

export default function MobileNavigation() {
  return (
    <header className="flex h-14 md:hidden items-center gap-4 border-b px-4 lg:h-[60px] lg:px-6">
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
          <aside>
            <NavAvatar />
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
            <UserActionMenu />
          </aside>
        </SheetContent>
      </Sheet>
    </header>
  );
}
