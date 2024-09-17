import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/config/firebase";
import {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
  useContext,
} from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(null as any);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(() => auth.currentUser);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setAuthenticated(true);
        navigate("/", { replace: true });
      } else {
        setUser(null);
        setAuthenticated(false);
        navigate("/login", { replace: true });
      }
    });
    return subscriber;
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ user, authenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
