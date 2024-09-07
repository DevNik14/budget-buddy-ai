import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase";

export function useRegister(email: string, password: string) {
  return createUserWithEmailAndPassword(auth, email, password);
}