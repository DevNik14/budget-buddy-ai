import { db } from "@/config/firebase";
import { FirebaseError } from "firebase/app";
import { collection, addDoc, getDocs, query, orderBy, Timestamp, where, sum, getAggregateFromServer, limit } from "firebase/firestore";

interface Expense {
  amount: string;
  category: string;
  description: string;
  date: string | Date | Timestamp;
  uid?: string;
  [key: string]: any;
}

export type DirectionOrder = "asc" | "desc";

export const addExpense = async (userId: string, expense: Expense) => {
  const response = await addDoc(collection(db, "users", userId as string, "expenses"),
    { ...expense, uid: userId }
  )
}

export const getExpenses = async (userId: string, type: string, order: DirectionOrder): Promise<(Expense & { docId: string })[] | null> => {
  const q = query(collection(db, "users", userId as string, "expenses"), orderBy(type, order))
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

export const getExpensesForTheCurrentMonthHandler = async (userId: string, fromDate: Timestamp) => {
  const q = query(collection(db, "users", userId as string, "expenses"), where("date", ">=", fromDate))
  const querySnapshot = await getAggregateFromServer(q, {
    totalExpenses: sum("amount")
  })
    .then(snap => snap.data().totalExpenses)
    .catch(e => {
      console.log(e);
      return 0;
    })
  return querySnapshot
}

export const getRecentExpenses = async (userId: string) => {
  try {
    const q = query(collection(db, "users", userId, "expenses"), limit(10))
    const querySnapshot = await getDocs(q);

    if (querySnapshot.docs.length > 0) {
      return querySnapshot.docs.map(doc => ({ ...doc.data() as Expense, docId: doc.id }))
    } else {
      throw new FirebaseError('not-found', "No recent expenses!");
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
}