import { useState } from "react";

import { Link } from "react-router-dom";
import { Timestamp } from "firebase/firestore";

import ExpensesList from "./ExpensesList";
import OrderBy from "./OrderBy/OrderBy";

export type Expense = {
  amount: number;
  category: string;
  description: string;
  date: Timestamp | string | Date;
  type: string;
  docId: string;
  uid: string;
};

export default function Expenses() {
  const [filters, setFilters] = useState<[string, "asc" | "desc"]>([
    "date",
    "desc",
  ]);

  const ordersByHandler = (value: string) => {
    const [type, order] = value.split(": ") as [string, "asc" | "desc"];
    setFilters([type, order as "asc" | "desc"]);
  };

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
            <OrderBy ordersByHandler={ordersByHandler} />
          </div>
        </div>
      </header>
      <section>
        <ExpensesList type={filters[0]} order={filters[1]} />
      </section>
    </>
  );
}
