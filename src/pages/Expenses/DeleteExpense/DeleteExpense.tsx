import { deleteExpense } from "@/services/expenseService";
import { useMutation } from "@tanstack/react-query";

import { Trash2 } from "lucide-react";

export default function DeleteExpense({
  amount,
  docId,
}: {
  amount: number;
  docId: string;
}) {
  const userId = localStorage.getItem("uid")!;
  const mutation = useMutation({
    mutationFn: ({
      userId,
      amount,
      docId,
    }: {
      userId: string;
      amount: number;
      docId: string;
    }) => deleteExpense(userId, amount, docId),
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
