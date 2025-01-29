import {
  onAuthStateChanged,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/config/firebase";
import {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
  useContext,
} from "react";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";

export const AuthContext = createContext(null as any);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  // const registerHandler = async (email: string, password: string) => {
  //   const userCredential = await createUserWithEmailAndPassword(
  //     auth,
  //     email,
  //     password
  //   );
  //   const user = userCredential.user;

  //   await setDoc(doc(db, "users", user.uid), {
  //     email: user.email,
  //     budget: {
  //       total: 0,
  //       monthlyLimit: 0,
  //     },
  //   });
  //   return userCredential;
  // };

  const registerHandler = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        budget: {
          total: 0,
          monthlyLimit: 0,
        },
      });
      return user;
    } catch (error) {
      if (error instanceof FirebaseError) {
        throw error;
      }
    }
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
