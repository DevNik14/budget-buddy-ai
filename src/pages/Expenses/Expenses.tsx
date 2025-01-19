import { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";

// { amount: number; category: string; description: string; date: Date; type: string; }

type Expense = {
  amount: string;
  category: string;
  description: string;
  date: string;
  type: string;
};

export default function Expenses() {
  const [expenses, setExpenses] = useState<Array<Expense>>([
    {
      amount: "20.00",
      category: "Groceries",
      description: "Weekly food",
      date: "16-01-2025",
      type: "One-Time",
    },
    {
      amount: "20.00",
      category: "Groceries",
      description: "Weekly food",
      date: "09-01-2025",
      type: "One-Time",
    },
    {
      amount: "20.69",
      category: "Bills",
      description: "Internet",
      date: "12-01-2025",
      type: "Monthly",
    },
    {
      amount: "60.00",
      category: "Bills",
      description: "Electricity",
      date: "15-01-2025",
      type: "Monthly",
    },
    {
      amount: "26.00",
      category: "Bills",
      description: "Water",
      date: "15-01-2025",
      type: "Monthly",
    },
    {
      amount: "9.00",
      category: "Bills",
      description: "Phone",
      date: "02-01-2025",
      type: "Monthly",
    },
    {
      amount: "22.36",
      category: "Fun",
      description: "Goods",
      date: "14-01-2025",
      type: "One-Time",
    },
  ]);

  return (
    <main className="flex-1 p-4 lg:p-8">
      <header>
        <div>
          <h1>Expenses</h1>
        </div>
        <div>
          <Link to="/expenses/add">+ New expense</Link>
        </div>
      </header>
      <section>
        <Table>
          <TableHeader>
            <TableRow>
              {Object.keys(expenses[0]).map((key) => {
                return (
                  <TableHead key={key} className={`capitalize`}>
                    {key}
                  </TableHead>
                );
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenses.map((expense, i) => {
              return (
                <TableRow key={i}>
                  {Object.values(expense).map((value, i) => {
                    return <TableCell key={i}>{value}</TableCell>;
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </section>
    </main>
  );
}
