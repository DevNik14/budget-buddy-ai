import {
  onAuthStateChanged,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
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
  const [user, setUser] = useState<User | null>(null);

  const registerHandler = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginHandler = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signOutHandler = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        localStorage.setItem("user", `${firebaseUser.email}`);
        localStorage.setItem("uid", `${firebaseUser.uid}`);
        navigate("/");
      } else {
        setUser(null);
        localStorage.clear();
      }
    });
    return subscriber;
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        registerHandler,
        loginHandler,
        signOutHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
