import { Expense } from "./Expenses";
import formatDate from "@/utils/formatDate";

import EditExpense from "./EditExpense/EditExpenseDialog";
import DeleteExpense from "./DeleteExpense/DeleteExpense";

export default function ExpenseListItem({
  expense,
  i,
}: {
  expense: Expense;
  i: number;
}) {
  const isDescriptionEmpty = (desc: string) => desc === "";

  return (
    <>
      <li
        key={i}
        className="grid grid-cols-3 md:grid-cols-7 text-center p-4 border-t capitalize"
      >
        <span>{expense.category}</span>
        <span>{expense.amount} lv.</span>
        <span>{formatDate(expense.date)}</span>
        <span
          className={`${
            isDescriptionEmpty(expense.description) && "text-slate-500"
          } hidden md:block`}
        >
          {isDescriptionEmpty(expense.description)
            ? "Optional"
            : expense.description}
        </span>
        <span className="hidden md:block">{expense.type}</span>
        <div className="flex justify-center">
          <EditExpense expense={expense} />
        </div>
        <div className="flex justify-center">
          <DeleteExpense
            amount={expense.amount}
            docId={expense.docId}
            expenseDate={formatDate(expense.date)}
          />
        </div>
      </li>
    </>
  );
}
