import { useAuth } from "@/contexts/authContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";

export default function NavAvatar() {
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState({
    photoURL: "",
    displayName: "",
    email: "",
    userInitials: "",
  });

  useEffect(() => {
    if (user?.email) {
      const { displayName, email, photoURL } = user;
      let userName = displayName ? displayName : user.email.split("@")[0];
      const userInitials = `${userName[0]}${userName[userName.length - 1]}`;

      setUserInfo({
        photoURL,
        email,
        displayName: userName,
        userInitials,
      });
    }
  }, [user]);

  return (
    <div className="p-5">
      <div className="flex items-center space-x-3">
        <Avatar>
          <AvatarImage src={userInfo.photoURL} alt="User" />
          <AvatarFallback>{userInfo.userInitials}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="font-semibold">{userInfo.displayName}</h2>
          <p className="text-sm text-gray-500">{userInfo.email}</p>
        </div>
      </div>
    </div>
  );
}
