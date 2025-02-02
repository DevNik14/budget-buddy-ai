import { useEffect, useState } from "react";

import OrderBy from "./OrderBy";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { getExpenses } from "@/services/expenseService";

import { Link } from "react-router-dom";
import { Timestamp } from "firebase/firestore";

export type Expense = {
  amount: string;
  category: string;
  description: string;
  date: Timestamp | string | Date;
  type?: string;
  docId?: string;
  uid?: string;
};

const tableHeads = [
  "amount",
  "category",
  "date",
  "description",
  "type",
] as const;

const formatDate = (date: Timestamp | string | Date): string => {
  if (date instanceof Timestamp) {
    return new Date(date.seconds * 1000).toLocaleDateString();
  }
  if (date instanceof Date) {
    return date.toLocaleDateString();
  }
  return date;
};

export default function Expenses() {
  const userId = localStorage.getItem("uid");
  const isScreenSmall = useMediaQuery("(max-width: 768px)");
  const [expenses, setExpenses] = useState<Array<Expense> | null>(null);
  const [mobile, setMobile] = useState(() => isScreenSmall.matches);

  const orderByExpenseHandler = async (value: string) => {
    const [type, order] = value.split(": ") as [string, "asc" | "desc"];
    const data = await getExpenses(userId as string, type, order);
    if (data) {
      setExpenses(data.map(formatExpense));
    }
  };

  const formatExpense = (expense: Expense & { docId: string }): Expense => ({
    amount: expense.amount?.toString() ?? "",
    category: expense.category?.toString() ?? "",
    description: expense.description?.toString() ?? "",
    date: formatDate(expense.date),
    type: expense.type?.toString() ?? "",
  });

  const hideExpensePropElementhandler = (propIdx: number) => {
    return mobile && propIdx >= 3 ? "hidden" : "";
  };

  useEffect(() => {
    getExpenses(userId as string, "date", "desc").then((data) => {
      if (data) {
        setExpenses(data.map(formatExpense));
      }
    });
  }, [userId]);

  useEffect(() => {
    isScreenSmall.addEventListener("change", (e) => {
      setMobile(e.matches);
    });
  }, []);

  return (
    <>
      <header className="grid gap-y-5 mb-5">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Expenses</h1>
          </div>
          <div className="bg-slate-300 px-4 py-2 rounded">
            <Link to="/expenses/add">+ New expense</Link>
          </div>
        </div>
        <div className="flex items-center">
          <div className="mr-1.5">Order by: </div>
          <div>
            <OrderBy orderByExpenseHandler={orderByExpenseHandler} />
          </div>
        </div>
      </header>
      <section>
        {expenses ? (
          <div className="text-center">
            <div className="hidden md:grid grid-cols-5 p-4 font-bold">
              {tableHeads.map((th) => (
                <div key={th} className="uppercase">
                  {th}
                </div>
              ))}
            </div>
            <div>
              {expenses.map((expense, i) => {
                return (
                  <div
                    key={i}
                    className={`${
                      i % 2 === 0 && "bg-slate-300"
                    } grid grid-cols-3 md:grid-cols-5 p-4 rounded`}
                  >
                    {tableHeads.map((key, i) => (
                      <div
                        key={key}
                        className={`${hideExpensePropElementhandler(i)}`}
                      >
                        {expense[key]?.toString()}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <h2>No expenses found</h2>
        )}
      </section>
    </>
  );
}
