import { Expense } from "@/pages/Expenses/Expenses";
import { UserBudget } from "@/pages/Budget/TotalBudget/TotalBudget";
import { Inputs } from "@/pages/Expenses/AddExpense/ExpenseForm";

import { db } from "@/config/firebase";
import { FirebaseError } from "firebase/app";
import { collection, doc, writeBatch, getDocs, runTransaction, query, orderBy, Timestamp, where, sum, getAggregateFromServer, limit } from "firebase/firestore";
import { FirebaseExpenseValues } from "@/types/common";

export type DirectionOrder = "asc" | "desc";

export const addExpense = async (userId: string, expense: Inputs) => {
  const { amount } = expense;

  try {
    const updatedBudget = await runTransaction(db, async (transaction) => {
      const userRef = doc(db, "users", userId as string);
      const userDoc = await transaction.get(userRef);

      if (!userDoc.exists()) {
        throw new Error("User document does not exist!");
      }

      const { budget } = userDoc.data() as UserBudget;

      if (amount > budget.total) {
        throw new Error("Insufficient budget!");
      }

      const newTotal = budget.total - amount;

      const expenseRef = doc(collection(db, "users", userId, "expenses"));

      transaction.set(expenseRef,
        { ...expense, uid: userId }
      )

      transaction.update(doc(db, "users", userId as string), {
        budget: { ...budget, total: newTotal }
      })

      return newTotal
    })
    return updatedBudget;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export const getExpenses = async (userId: string, type: string, order: DirectionOrder): Promise<(Expense & { docId: string })[]> => {
  const q = query(collection(db, "users", userId as string, "expenses"), orderBy(type, order))
  try {
    const querySnapshot = await getDocs(q)
    if (querySnapshot.docs.length > 0) {
      return querySnapshot.docs.map(doc => ({ ...doc.data() as Expense, docId: doc.id }))
    } else {
      throw new FirebaseError('not-found', "No expenses found!");
    }
  }
  catch (error: any) {
    throw new Error(error.message);
  }
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
    const q = query(collection(db, "users", userId, "expenses"), limit(8))
    const querySnapshot = await getDocs(q);

    if (querySnapshot.docs.length > 0) {
      return querySnapshot.docs.map(doc => ({ ...doc.data() as Expense, docId: doc.id }))
    } else {
      throw new FirebaseError('not-found', "No expenses found!");
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export const updateExpense = async (userId: string, expense: FirebaseExpenseValues, docId: string) => {
  const { amount: newExpenseAmount } = expense;

  const expenseRef = doc(db, "users", userId, "expenses", docId);
  const userRef = doc(db, "users", userId as string);

  try {
    const updatedExpense = await runTransaction(db, async (transaction) => {
      const userDoc = await transaction.get(userRef);
      const expenseDoc = await transaction.get(expenseRef);
      if (!userDoc.exists()) {
        throw new Error("User document does not exist!");
      }

      const { budget } = userDoc.data() as UserBudget;
      const { amount: oldExpenseAmount } = expenseDoc.data() as FirebaseExpenseValues;

      if (newExpenseAmount > budget.total) {
        throw new Error("Insufficient budget!");
      }

      let newTotalBudget = 0;
      let difference = 0;
      if (oldExpenseAmount < newExpenseAmount) {
        difference = newExpenseAmount - oldExpenseAmount;
        newTotalBudget = budget.total - difference;
      } else if (oldExpenseAmount > newExpenseAmount) {
        difference = oldExpenseAmount - newExpenseAmount;
        newTotalBudget = budget.total + difference;
      }
      transaction.update(expenseRef, expense);
      transaction.update(doc(db, "users", userId as string), {
        budget: { ...budget, total: newTotalBudget }
      })

      return expense;
    })
    return updatedExpense;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}

export const deleteExpense = async (userId: string, amount: number, docId: string) => {
  const userRef = doc(db, "users", userId as string);
  const expenseRef = doc(db, "users", userId, "expenses", docId);
  try {
    const deletedExpense = await runTransaction(db, async (transaction) => {
      const expenseDoc = await transaction.get(expenseRef);
      const userDoc = await transaction.get(userRef);
      if (!expenseDoc.exists()) {
        throw new Error("Document does not exist!");
      }

      const { budget } = userDoc.data() as UserBudget;
      const newTotalBudget = budget.total + amount;

      transaction.update(userRef, {
        budget: { ...budget, total: newTotalBudget }
      })

      transaction.delete(expenseRef);
      return "Expense successfully deleted!"
    })
    return deletedExpense;
  } catch (error: any) {
    throw new Error(error.message)
  }
}