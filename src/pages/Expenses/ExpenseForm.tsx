import { useEffect } from "react";

import { addExpense } from "@/services/expenseService";

import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Timestamp } from "firebase/firestore";

import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { format } from "date-fns";

type Inputs = {
  amount: string;
  category: string;
  date: string | Date;
  type: string;
  description: string;
};

const expenseSchema = z.object({
  amount: z.coerce
    .number({
      required_error: "Must enter an amount",
      invalid_type_error: "Amount must be valid",
    })
    .positive(),
  category: z.string(),
  date: z.string().date(),
  description: z.string().optional(),
  type: z.string(),
});

export default function ExpenseForm() {
  const userId = localStorage.getItem("uid");
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      amount: "",
      category: "bills",
      date: "",
      type: "monthly",
      description: "",
    },
  });

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({
        amount: "",
        category: "bills",
        date: "",
        type: "monthly",
        description: "",
      });
    }
  }, [formState, reset]);

  const onSubmut: SubmitHandler<Inputs> = (formData) => {
    const formValues = structuredClone(formData);

    const date = Timestamp.fromDate(new Date(formValues["date"]));

    addExpense(userId as string, { ...formValues, date: date });
  };
  return (
    <form onSubmit={handleSubmit(onSubmut)}>
      <div className="flex flex-col gap-6">
        <div className="grid gap-2">
          <Label
            htmlFor="amount"
            className={`${errors.amount && "text-red-600"}`}
          >
            Amount*
          </Label>
          <Input id="amount" {...register("amount")} className="rounded" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="category">Category*</Label>
          <Select>
            <SelectTrigger
              defaultValue={formState.defaultValues?.category}
              id="category"
              {...register("category")}
              className="rounded"
            >
              <SelectValue placeholder="Bills" />
            </SelectTrigger>
            <SelectContent className="cursor-pointer bg-gray-100">
              <SelectItem value="bills" className="cursor-pointer">
                Bills
              </SelectItem>
              <SelectItem value="groceries" className="cursor-pointer">
                Groceries
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="date" className={`${errors.date && "text-red-600"}`}>
            Date*
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "pl-3 text-left font-normal rounded",
                  !watch("date") && "text-muted-foreground"
                )}
              >
                {watch("date") ? (
                  format(watch("date"), "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="center">
              <Calendar
                className="bg-gray-100"
                mode="single"
                onSelect={(date) => {
                  setValue("date", format(date as Date, "yyyy-MM-dd"));
                }}
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            {...register("description")}
            placeholder="Optional"
            className="rounded"
          />
        </div>
        <div className="grid gap-2">
          <Select>
            <Label htmlFor="type">Type*</Label>
            <SelectTrigger
              defaultValue={formState.defaultValues?.type}
              id="type"
              {...register("type")}
              className="rounded"
            >
              <SelectValue placeholder="Monthly" />
            </SelectTrigger>
            <SelectContent className="bg-gray-100 cursor-pointer">
              <SelectItem value="monthly" className="cursor-pointer">
                Monthly
              </SelectItem>
              <SelectItem value="one-time" className="cursor-pointer">
                One Time
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button type="submit" className="bg-gray-100 rounded" variant="outline">
          Save
        </Button>
      </div>
    </form>
  );
}
