import { useEffect, useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";

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
import {
  getMonthlySpendingLimit,
  setMonthlyLimitHandler,
} from "@/services/budgetOperationsService";
import { Timestamp } from "firebase/firestore";
import { getExpensesForTheCurrentMonthHandler } from "@/services/expenseService";

const monthlySpendingLimitSchema = z.object({
  limitValue: z.coerce
    .number({
      invalid_type_error: "Amount must be valid",
    })
    .positive(),
});

export default function MonthlySpendingLimit() {
  const userId = localStorage.getItem("uid");
  const [monthlySpendingLimit, setMonthlySpendingLimit] = useState<
    number | null
  >(0);
  const [currentSpendings, setCurrentSpendings] = useState<number>(0);

  const { register, handleSubmit, formState, reset } = useForm<
    z.infer<typeof monthlySpendingLimitSchema>
  >({
    resolver: zodResolver(monthlySpendingLimitSchema),
  });

  const obSubmit: SubmitHandler<
    z.infer<typeof monthlySpendingLimitSchema>
  > = async ({ limitValue }) => {
    const newMonthlySpendingLimit = await setMonthlyLimitHandler(
      userId as string,
      limitValue
    );
    setMonthlySpendingLimit(newMonthlySpendingLimit);
  };

  const calculateSpendingLimitInPercentageHandler = () => {
    if (monthlySpendingLimit && monthlySpendingLimit >= 0) {
      return (currentSpendings / monthlySpendingLimit) * 100;
    }
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful) reset();
  }, [formState, reset]);

  useEffect(() => {
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const currentMonthDate = Timestamp.fromDate(
      new Date(`${year}-${month}-01`)
    );

    Promise.all([
      getMonthlySpendingLimit(userId as string),
      getExpensesForTheCurrentMonthHandler(userId as string, currentMonthDate),
    ]).then((data) => {
      const [monthlySpendingLimit, currentMonthSpending] = data;
      setMonthlySpendingLimit(monthlySpendingLimit);
      setCurrentSpendings(currentMonthSpending);
    });
  }, [userId]);

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
                lv. {currentSpendings} / {monthlySpendingLimit}
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
