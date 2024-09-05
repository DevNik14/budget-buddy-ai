import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/config/firebase";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export const AuthContext = createContext(null as any);

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);

  const setUserHandler = (user: User) => {
    setUser(user);
  };

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(auth.currentUser);
      } else {
      }
    });
    return subscriber;
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUserHandler }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
