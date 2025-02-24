import { deleteExpense } from "@/services/expenseService";
import { Expense } from "@/types/common";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Trash2 } from "lucide-react";

export default function DeleteExpense({
  amount,
  docId,
  expenseDate,
}: {
  amount: number;
  docId: string;
  expenseDate: string;
}) {
  const expenseMonth = expenseDate?.split("/")[0];
  const currentMonth = new Date().getMonth() + 1;
  const userId = localStorage.getItem("uid")!;
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({
      userId,
      docId,
    }: {
      userId: string;
      amount: number;
      docId: string;
    }) => deleteExpense(userId, docId),
    onMutate: async (deletedExpense) => {
      await Promise.all([
        queryClient.cancelQueries({ queryKey: ["budget"] }),
        queryClient.cancelQueries({ queryKey: ["currentMonthSpendings"] }),
        queryClient.cancelQueries({ queryKey: ["recentExpenses"] }),
      ]);

      const previousData = {
        budget: queryClient.getQueryData<number>(["budget"]),
        currentMonthSpendings: queryClient.getQueryData<number>([
          "currentMonthSpendings",
        ]),
        recentExpenses: queryClient.getQueryData<Expense[]>(["recentExpenses"]),
      };

      queryClient.setQueryData<number>(["budget"], (old) =>
        old ? old + deletedExpense.amount : 0
      );

      expenseMonth === currentMonth.toString() &&
        queryClient.setQueryData<number>(["currentMonthSpendings"], (old) =>
          old ? old - deletedExpense.amount : 0
        );

      queryClient.setQueryData(["recentExpenses"], (old: Expense[]) =>
        old.filter((expense) => expense.docId !== docId)
      );
      return previousData;
    },
    onError: (err, deletedExpense, context) => {
      console.log(err);
      console.log(deletedExpense);
      if (context) {
        queryClient.setQueryData(["budget"], context.budget);
        queryClient.setQueryData(
          ["currentMonthSpendings"],
          context.currentMonthSpendings
        );
        queryClient.setQueryData(["expenses"], context.recentExpenses);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["recentExpenses"] });
      queryClient.invalidateQueries({ queryKey: ["budget"] });
      queryClient.invalidateQueries({ queryKey: ["currentMonthSpendings"] });
    },
  });

  return (
    <Trash2
      className="text-red-600 cursor-pointer"
      onClick={() => {
        mutation.mutate({
          userId,
          amount,
          docId,
        });
      }}
    />
  );
}
