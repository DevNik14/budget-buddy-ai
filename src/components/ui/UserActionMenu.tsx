import { useAuth } from "@/contexts/authContext";

import { useNavigate } from "react-router-dom";
import { auth } from "@/config/firebase";
import { signOut } from "firebase/auth";
import { FirebaseError } from "firebase/app";

import { Button } from "@/components/ui/button";
import { LogOut, Settings } from "lucide-react";

export default function UserActionMenu() {
  const user = useAuth();
  const navigate = useNavigate();
  return (
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
  );
}
