import { db } from "@/config/firebase";
import { collection, addDoc, getDocs, where, query, orderBy, Timestamp } from "firebase/firestore";

interface Expense {
  amount: string;
  category: string;
  description: string;
  date: string | Date | Timestamp;
  uid?: string;
  [key: string]: any;
}

export type DirectionOrder = "asc" | "desc";

const userId = localStorage.getItem("uid");

export const addExpense = async (expense: Expense) => {
  const response = await addDoc(collection(db, "expenses"),
    { ...expense, uid: userId }
  )
}

export const getExpenses = async (type: string, order: DirectionOrder): Promise<(Expense & { docId: string })[] | null> => {
  const q = query(collection(db, "expenses"), orderBy(type, order), where("uid", "==", userId))
  const querySnapshot = await getDocs(q)
    .then(snapshot => {
      if (snapshot.docs.length > 0) {
        return snapshot.docs.map(doc => ({ ...doc.data() as Expense, docId: doc.id }))
      } else {
        return null;
      }
    })
    .catch(e => {
      console.log(e);
      return null;
    })
  return querySnapshot
}