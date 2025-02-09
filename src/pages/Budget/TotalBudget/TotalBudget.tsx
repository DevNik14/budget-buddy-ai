import { useEffect, useState } from "react";

import {
  setTotalBudgetHandler,
  getTotalBudgetHandler,
} from "@/services/budgetOperationsService";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export type UserBudget = {
  budget: {
    total: number;
    monthlyLimit: number;
  };
};

const budgetSchema = z.object({
  budgetValue: z.coerce
    .number({
      invalid_type_error: "Amount must be valid",
    })
    .positive(),
});

export default function TotalBudget() {
  const userId = localStorage.getItem("uid");
  const [userBudget, setUserBudget] = useState<string | number | null>(null);

  const { register, handleSubmit, formState, reset } = useForm<
    z.infer<typeof budgetSchema>
  >({
    resolver: zodResolver(budgetSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof budgetSchema>> = async ({
    budgetValue,
  }) => {
    const userNewTotalBudget = await setTotalBudgetHandler(
      userId as string,
      budgetValue
    );
    setUserBudget(userNewTotalBudget);
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset]);

  useEffect(() => {
    const totalBudget = async () =>
      setUserBudget(await getTotalBudgetHandler(userId as string));
    totalBudget();
  }, [userId]);

  return (
    <>
      <Card className="rounded">
        <CardHeader>
          <CardTitle className="flex items-center justify-between font-bold tracking-tight text-base">
            {userBudget ? (
              <span>{`Total Budget: ${userBudget} lv.`}</span>
            ) : (
              <Skeleton className="w-[194px] h-[24px] rounded-full bg-slate-300" />
            )}
          </CardTitle>

          <CardDescription className="text-sm text-muted-foreground">
            Set and adjust Your total budget
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Input {...register("budgetValue")} />
                {formState.errors.budgetValue && (
                  <span className="text-red-600">
                    {formState.errors.budgetValue.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Button type="submit" variant="outline">
                  Set
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
