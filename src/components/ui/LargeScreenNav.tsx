import { navMenuItems } from "@/data/navItems";

import { NavLink } from "react-router-dom";

import NavAvatar from "./NavAvatar";
import UserActionMenu from "./UserActionMenu";

const setActiveClassHandler = ({ isActive }: { isActive: boolean }) => {
  return `w-full justify-start flex items-center h-10 px-4 py-2 rounded  ${
    isActive ? "bg-slate-300" : ""
  }`;
};

export default function LargeScreenNav() {
  return (
    <aside className="w-64 bg-white shadow-md hidden md:flex md:flex-col">
      <NavAvatar />
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
      <UserActionMenu />
    </aside>
  );
}
