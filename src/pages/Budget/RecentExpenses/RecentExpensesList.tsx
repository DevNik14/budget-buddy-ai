import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "@/components/ui/LoadingSpinnerProps";
import ExpenseListItem from "@/pages/Expenses/ExpenseItem";
import { getRecentExpenses } from "@/services/expenseService";

const tableHeads = [
  "category",
  "amount",
  "date",
  "description",
  "type",
  "docId",
] as const;

export default function RecentExpensesList() {
  const userId = localStorage.getItem("uid");
  const { isError, isPending, data, error } = useQuery({
    queryKey: ["recentExpenses", userId],
    queryFn: () => getRecentExpenses(userId as string),
  });

  if (isError) {
    return <span>{error.message}</span>;
  }

  if (isPending) {
    return <LoadingSpinner />;
  }
  return (
    <ul className="border rounded text-center">
      <header className="hidden md:grid grid-cols-5 border-b p-4 capitalize font-bold tracking-tight text-base">
        {tableHeads.map((th, i) => th !== "docId" && <div key={i}>{th}</div>)}
      </header>
      {data.map((expense, i) => {
        return <ExpenseListItem key={i} {...expense} i={i} />;
      })}
    </ul>
  );
}
