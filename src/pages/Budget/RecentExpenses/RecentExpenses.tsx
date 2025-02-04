import LoadingSpinner from "@/components/ui/LoadingSpinnerProps";
import { getRecentExpenses } from "@/services/expenseService";
import { useQuery } from "@tanstack/react-query";

export default function RecentExpenses() {
  const userId = localStorage.getItem("uid");
  const { isError, isPending, data, error } = useQuery({
    queryKey: ["recentExpenses", userId],
    queryFn: () => getRecentExpenses(userId as string),
  });

  if (isError) {
    return <span>{error.message}</span>;
  }

  if (isPending) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <LoadingSpinner />
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <ul>
        {data.map((expense, i) => {
          return <li key={i}>{expense.amount}</li>;
        })}
      </ul>
    </>
  );
}
