import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/config/firebase";
import {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
  useContext,
} from "react";

export const AuthContext = createContext(null as any);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(() => auth.currentUser);

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, (user) => {
      setUser(auth.currentUser);
    });
    return subscriber;
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  return useContext(AuthContext);
}
