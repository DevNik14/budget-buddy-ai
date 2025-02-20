import { Timestamp } from "firebase/firestore"

export type FirebaseExpenseValues = {
  amount: number;
  category: string;
  date: Timestamp;
  type: string;
  description?: string;
};

export type Expense = {
  amount: number;
  category: string;
  description?: string;
  date: Timestamp | string | Date;
  type: string;
  docId: string;
  uid: string;
};