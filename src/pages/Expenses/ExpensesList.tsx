import { getExpenses } from "@/services/expenseService";
import ExpenseListItem from "./ExpenseItem";

import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "@/components/ui/LoadingSpinnerProps";
const tableHeads = [
  "category",
  "amount",
  "date",
  "description",
  "type",
  "docId",
  "edit",
  "delete",
] as const;

export default function ExpensesList({
  type,
  order,
}: {
  type: string;
  order: "asc" | "desc";
}) {
  const userId = localStorage.getItem("uid");
  const { isError, isPending, data, error } = useQuery({
    queryKey: ["expenses", type, order, userId],
    queryFn: () => getExpenses(userId as string, type, order),
  });

  if (isError) {
    return <span>{error.message}</span>;
  }

  if (isPending) {
    return <LoadingSpinner />;
  }

  return (
    <ul className="border rounded text-center">
      <header className="hidden md:grid grid-cols-7 border-b p-4 capitalize font-bold tracking-tight text-base">
        {tableHeads.map((th, i) => th !== "docId" && <div key={i}>{th}</div>)}
      </header>
      {data.map((expense, i) => {
        return <ExpenseListItem key={i} expense={expense} i={i} />;
      })}
    </ul>
  );
}
