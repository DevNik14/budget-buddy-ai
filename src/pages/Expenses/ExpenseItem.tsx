import { useRef } from "react";
import { Expense } from "./Expenses";
import formatDate from "@/utils/formatDate";

export default function ExpenseListItem({
  category,
  amount,
  date,
  description,
  type,
  docId,
  i,
}: Expense & { i: number }) {
  const expenseItemRef = useRef<string | undefined>(undefined);
  expenseItemRef.current = docId;
  const isDescriptionEmpty = (desc: string) => desc === "";

  return (
    <li
      key={i}
      className="grid grid-cols-3 md:grid-cols-5 text-center py-4 border-t capitalize"
    >
      <span>{category}</span>
      <span>{amount} lv.</span>
      <span>{formatDate(date)}</span>
      <span
        className={`${
          isDescriptionEmpty(description) && "text-slate-500"
        } hidden md:block`}
      >
        {isDescriptionEmpty(description) ? "Optional" : description}
      </span>
      <span className="hidden md:block">{type}</span>
    </li>
  );
}
