import { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";
import { Timestamp } from "firebase/firestore";

import { getExpenses } from "@/services/expenseService";
import OrderBy from "./OrderBy";

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
  "description",
  "date",
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
  const [expenses, setExpenses] = useState<Array<Expense> | null>(null);

  const orderByExpenseHandler = async (value: string) => {
    const [type, order] = value.split(": ") as [string, "asc" | "desc"];
    const data = await getExpenses(type, order);
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

  useEffect(() => {
    getExpenses("date", "desc").then((data) => {
      if (data) {
        setExpenses(data.map(formatExpense));
      }
    });
  }, []);

  return (
    <main className="flex-1 p-4 lg:p-8">
      <header>
        <div>
          <div>
            <h1>Expenses</h1>
          </div>
          <div>
            <Link to="/expenses/add">+ New expense</Link>
          </div>
        </div>
        <div>
          <div>Order by: </div>
          <div>
            <OrderBy orderByExpenseHandler={orderByExpenseHandler} />
          </div>
        </div>
      </header>
      <section>
        {expenses ? (
          <Table>
            <TableHeader>
              <TableRow>
                {tableHeads.map((th) => {
                  return (
                    <TableHead key={th} className={`capitalize`}>
                      {th}
                    </TableHead>
                  );
                })}
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenses.map((expense, i) => {
                return (
                  <TableRow key={i}>
                    {tableHeads.map((key) => (
                      <TableCell key={key}>
                        {expense[key]?.toString()}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        ) : (
          <h2>No expenses found</h2>
        )}
      </section>
    </main>
  );
}
