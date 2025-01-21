import { db } from "@/config/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

import { Expense } from "@/pages/Expenses/Expenses";


export const addExpense = async (uid: string, expense: Expense) => {
  const response = await addDoc(collection(db, "expenses"),
    { ...expense, uid }
  )
}

export const getExpenses = async () => {
  const querySnapshot = await getDocs(collection(db, "expenses"))
    .then(snapshot => {
      return snapshot.docs.map(doc => ({ ...doc.data(), docId: doc.id }))
    })
    .catch(e => console.log(e))
  return querySnapshot

}