import { UserBudget } from "@/types/common";

import { db } from "@/config/firebase";
import { getDoc, doc, runTransaction } from "firebase/firestore";

export const getTotalBudget = async (userId: string) => {
  const userRef = doc(db, "users", userId as string);
  try {
    const budgetSnap = await getDoc(userRef);
    if (!budgetSnap.exists()) {
      throw new Error("Can't get budget!");
    }
    return budgetSnap.data()?.budget.total;
  } catch (error) {
    console.log(error);
    throw new Error("Can't get budget!")
  }
};

export const setTotalBudgetHandler = async (userId: string, budgetValue: number) => {
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
    throw new Error("Can't set budget!");
  }
}

export const getMonthlySpendingLimit = async (userId: string): Promise<number> => {
  const userRef = doc(db, "users", userId as string);
  try {
    const spendingLimit = await runTransaction(db, async (transaction) => {
      const spendingLimitDoc = await transaction.get(userRef);
      if (!spendingLimitDoc.exists()) {
        throw new Error;
      }
      return spendingLimitDoc.data() as UserBudget;
    })
    return spendingLimit.budget.monthlyLimit;
  } catch (error) {
    throw new Error("Can't get monthly spending limit!")
  }
}

export const setMonthlyLimit = async (userId: string, newMonthlyLimit: number): Promise<number> => {
  const userRef = doc(db, "users", userId as string);
  try {
    const usersMonthlyLimit = await runTransaction(
      db,
      async (transaction) => {
        const { budget } = (
          await transaction.get(userRef)
        ).data() as UserBudget;
        const newLimit = (budget.monthlyLimit = newMonthlyLimit);
        transaction.update(userRef, {
          budget: { ...budget, monthlyLimit: newLimit },
        });
        return newLimit;
      }
    );
    return usersMonthlyLimit;
  } catch (error) {
    console.log(error);
    throw new Error("Could not set monthly limit!")
  }
}