import { Expense } from "../Expenses";
import formatDate from "@/utils/formatDate";
import { FirebaseExpenseValues } from "@/types/common";
import { updateExpense } from "@/services/expenseService";

import { Timestamp } from "firebase/firestore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";

import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const expenseSchema = z.object({
  amount: z.coerce
    .number({
      required_error: "Must enter an amount",
      invalid_type_error: "Amount must be valid",
    })
    .positive(),
  category: z.string(),
  date: z.string(),
  description: z.string().optional(),
  type: z.string(),
});

export default function EditExpenseForm({ expense }: { expense: Expense }) {
  const expenseMonth = formatDate(expense.date)?.split("/")[0];
  const currentMonth = new Date().getMonth() + 1;
  const userId = localStorage.getItem("uid")!;
  const queryClient = useQueryClient();
  const expenseMutation = useMutation({
    mutationFn: ({
      userId,
      values,
      docId,
    }: {
      userId: string;
      values: FirebaseExpenseValues;
      docId: string;
      expense: Expense;
    }) => updateExpense(userId, values, docId),
    onMutate: async (newExpense) => {
      const { amount } = newExpense.values;
      const { amount: oldAmount } = newExpense.expense;

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

      const diff = Math.abs(amount - oldAmount);
      queryClient.setQueryData<number>(["budget"], (old) => {
        return amount > oldAmount
          ? (old as number) - diff
          : (old as number) + diff;
      });

      expenseMonth === currentMonth.toString() &&
        queryClient.setQueryData<number>(["currentMonthSpendings"], (old) => {
          return amount > oldAmount
            ? (old as number) - diff
            : (old as number) + diff;
        });

      queryClient.setQueryData(["recentExpenses"], (old: Array<Expense>) => {
        return [...old, newExpense];
      });
      return previousData;
    },
    onError: (err, newExpense, context: any) => {
      console.log(err);
      console.log(newExpense);
      queryClient.setQueryData(
        ["recentExpenses"],
        context.previousData.recentExpenses
      );
      queryClient.setQueryData(["budget"], context.previousData.budget);
      queryClient.setQueryData(
        ["currentMonthSpendings"],
        context.previousData.currentMonthSpendings
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["recentExpenses"] });
      queryClient.invalidateQueries({ queryKey: ["budget"] });
      queryClient.invalidateQueries({ queryKey: ["currentMonthSpendings"] });
    },
  });

  const constructDefaultValues = (expense: Expense) => {
    return Object.fromEntries(
      Object.entries(expense).filter(
        (entry) => entry[0] !== "docId" && entry[0] !== "uid"
      )
    );
  };

  const form = useForm<z.infer<typeof expenseSchema>>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      ...constructDefaultValues(expense),
      date: formatDate(expense.date),
    },
  });

  const onSubmit = async (values: z.infer<typeof expenseSchema>) => {
    const newExpenseValues: FirebaseExpenseValues = {
      ...values,
      date: Timestamp.fromDate(new Date(values.date)),
    };

    expenseMutation.mutate({
      userId,
      values: newExpenseValues,
      docId: expense.docId,
      expense,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex justify-between">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white">
                    <SelectItem value="bills">Bills</SelectItem>
                    <SelectItem value="groceries">Groceries</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white">
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="one-time">One Time</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date of birth</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-white" align="start">
                    <Calendar
                      className={cn("pointer-events-auto")}
                      mode="single"
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
