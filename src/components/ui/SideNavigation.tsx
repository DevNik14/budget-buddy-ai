import { auth } from "@/config/firebase";

import { NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import { FirebaseError } from "firebase/app";

import { useAuth } from "@/contexts/authContext";

const navMenuItems = [{ iocn: "dashboard", name: "dashboard" }];
const displayNavMenuItem = () => {
  const user = useAuth();

  return (
    <>
      <ul>
        {navMenuItems.map((item) => {
          return <li key={item.name}>{item.name}</li>;
        })}
      </ul>
      <button
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
        Sign out
      </button>
    </>
  );
};

export default function SideNavigation() {
  return <nav>{displayNavMenuItem()}</nav>;
}
