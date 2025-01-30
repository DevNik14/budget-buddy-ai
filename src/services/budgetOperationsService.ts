import { db } from "@/config/firebase";
import { getDoc, doc, runTransaction } from "firebase/firestore";

import { UserBudget } from "@/pages/Budget/TotalBudget/TotalBudget";

export const getTotalBudgetHandler = async (userId: string) => {
  const userRef = doc(db, "users", userId as string);
  try {
    const budgetSnap = await getDoc(userRef);
    return budgetSnap.data()?.budget.total;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const setTotalBudgetHandler = async (userId: string, budgetValue: string | number) => {
  const userRef = doc(db, "users", userId as string);
  try {
    const userNewTotalBudget = await runTransaction(
      db,
      async (transaction) => {
        const { budget } = (
          await transaction.get(userRef)
        ).data() as UserBudget;
        const newBudget = (budget.total = budgetValue);
        transaction.update(userRef, {
          budget: { ...budget, total: newBudget },
        });
        return newBudget;
      }
    );
    return userNewTotalBudget;
  } catch (error) {
    console.log(error);
    return null;
  }
}