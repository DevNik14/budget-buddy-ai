import { useEffect } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { setMonthlySpendingLimit } from "@/services/budgetOperationsService";

const monthlySpendingLimitSchema = z.object({
  limitValue: z.coerce
    .number({
      invalid_type_error: "Amount must be valid",
    })
    .positive(),
});

export default function SetMonthlySpendingLimit() {
  const userId = localStorage.getItem("uid")!;
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({
      userId,
      newMonthlyLimit,
    }: {
      userId: string;
      newMonthlyLimit: number;
    }) => setMonthlySpendingLimit(userId, newMonthlyLimit),
    onMutate: async (newLimit) => {
      await queryClient.cancelQueries({ queryKey: "monthlySpendingLimit" });
      const previousMonthlyLimit = queryClient.getQueryData<number>([
        "monthlySpendingLimit",
      ]);
      queryClient.setQueryData(
        ["monthlySpendingLimit"],
        newLimit.newMonthlyLimit
      );
      return { previousMonthlyLimit };
    },
    onError: (err, newTodo, context: any) => {
      console.log(err);
      console.log(newTodo);
      queryClient.setQueryData(
        ["monthlySpendingLimit"],
        context.previousMonthlyLimit
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["monthlySpendingLimit"] });
    },
  });

  const { register, handleSubmit, formState, reset } = useForm<
    z.infer<typeof monthlySpendingLimitSchema>
  >({
    resolver: zodResolver(monthlySpendingLimitSchema),
  });

  const obSubmit: SubmitHandler<
    z.infer<typeof monthlySpendingLimitSchema>
  > = async ({ limitValue }) => {
    mutation.mutate({ userId, newMonthlyLimit: limitValue });
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful) reset();
  }, [formState, reset]);

  return (
    <>
      <div className="mt-[5px]">
        <form onSubmit={handleSubmit(obSubmit)}>
          <div className="grid gap-2">
            <Input {...register("limitValue")} />
            {formState.errors.limitValue && (
              <span className="text-red-600">
                {formState.errors.limitValue.message}
              </span>
            )}
            <Button type="submit" variant="outline">
              Set
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
