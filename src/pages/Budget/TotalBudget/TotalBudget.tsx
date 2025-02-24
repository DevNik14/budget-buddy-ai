import { useEffect } from "react";

import {
  setTotalBudgetHandler,
  getTotalBudget,
} from "@/services/budgetOperationsService";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";

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
  const userId = localStorage.getItem("uid")!;
  const { data, isError, error, isPending } = useQuery({
    queryKey: ["budget"],
    queryFn: async () => getTotalBudget(userId),
  });
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({
      userId,
      budgetValue,
    }: {
      userId: string;
      budgetValue: number;
    }) => {
      return setTotalBudgetHandler(userId, budgetValue);
    },
    onMutate: async (newBudget) => {
      await queryClient.cancelQueries({ queryKey: "budget" });

      const previousBudget = queryClient.getQueryData<number>(["budget"]);

      queryClient.setQueryData(["budget"], newBudget.budgetValue);

      return { previousBudget };
    },
    onError: (err, newTodo, context: any) => {
      console.log(err);
      console.log(newTodo);
      queryClient.setQueryData(["budget"], context.previousBudget);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["budget"] });
    },
  });

  const { register, handleSubmit, formState, reset } = useForm<
    z.infer<typeof budgetSchema>
  >({
    resolver: zodResolver(budgetSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof budgetSchema>> = async ({
    budgetValue,
  }) => {
    mutation.mutate({ userId, budgetValue });
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset]);

  const displayBudgetHandler = () => {
    if (isPending) {
      return (
        <Skeleton className="w-[194px] h-[24px] rounded-full bg-slate-300" />
      );
    } else if (isError) {
      return <span>{error.message}</span>;
    } else {
      return <span>{`Total Budget: ${data.toFixed(2)} lv.`}</span>;
    }
  };

  return (
    <>
      <Card className="rounded">
        <CardHeader>
          <CardTitle className="flex items-center justify-between font-bold tracking-tight text-base">
            {displayBudgetHandler()}
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
