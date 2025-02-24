import { useEffect } from "react";

import {
  getMonthlySpendingLimit,
  setMonthlySpendingLimit,
} from "@/services/budgetOperationsService";
import { getExpensesForTheCurrentMonth } from "@/services/expenseService";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getFirstDayOfCurrentMonth } from "@/utils/getFirstDayOfCurrentMonth";

const monthlySpendingLimitSchema = z.object({
  limitValue: z.coerce
    .number({
      invalid_type_error: "Amount must be valid",
    })
    .positive(),
});

export default function MonthlySpendingLimit() {
  const userId = localStorage.getItem("uid")!;
  const queryClient = useQueryClient();
  const currentMonthDate = getFirstDayOfCurrentMonth();

  const { data: currentMonthSpendings } = useQuery({
    queryKey: ["currentMonthSpendings"],
    queryFn: () => getExpensesForTheCurrentMonth(userId, currentMonthDate),
  });

  const { data: monthlySpendingLimit } = useQuery({
    queryKey: ["monthlySpendingLimit"],
    queryFn: () => getMonthlySpendingLimit(userId),
  });

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

  const calculateSpendingLimitInPercentageHandler = () => {
    if (
      currentMonthSpendings &&
      monthlySpendingLimit &&
      monthlySpendingLimit >= 0
    ) {
      return (currentMonthSpendings / monthlySpendingLimit) * 100;
    }
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful) reset();
  }, [formState, reset]);

  return (
    <>
      <Card className="rounded">
        <CardHeader>
          <CardTitle className="font-bold tracking-tight text-base">
            Monthly Budget
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Set and adjust your monthly spending limit
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <div className="flex justify-end text-sm">
              <p>
                lv. {currentMonthSpendings?.toFixed(2)} / {monthlySpendingLimit}
              </p>
            </div>
            <Progress
              className="mt-[5px]"
              value={calculateSpendingLimitInPercentageHandler()}
            />
          </div>
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
        </CardContent>
      </Card>
    </>
  );
}
