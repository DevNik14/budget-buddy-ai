import { useEffect } from "react";

import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Timestamp } from "firebase/firestore";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/authContext";
import { addExpense } from "@/services/expenseService";

type Inputs = {
  amount: string;
  category: string;
  date: string;
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
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    setValue,
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

  const disableDateHandler = () => {
    let month = (new Date().getMonth() + 1).toString();
    const today = new Date().getDate();
    const year = new Date().getFullYear();
    month = month.length < 2 ? `0${month}` : month;

    return `${year}-${month}-${today}`;
  };

  const onSubmut: SubmitHandler<Inputs> = (formData) => {
    const formValues = structuredClone(formData);

    const date = Timestamp.fromDate(new Date(formValues["date"]));

    addExpense({ ...formValues, date: date });
  };
  return (
    <form onSubmit={handleSubmit(onSubmut)}>
      <div>
        <div>
          <Label htmlFor="amount">Amount*</Label>
          <Input id="amount" {...register("amount")} />
          {errors.amount && (
            <p className="bg-red-600 text-white">{errors.amount.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="category">Category*</Label>
          <select {...register("category")} id="category" defaultValue="bills">
            <option value="bills">Bills</option>
            <option value="groceries">Groceries</option>
          </select>
        </div>
        <div>
          <Label htmlFor="date">Date*</Label>
          <Input
            id="date"
            type="date"
            {...register("date", { required: true })}
            max={disableDateHandler()}
          />
          {errors.date && (
            <p className="bg-red-600 text-white">Must select a date</p>
          )}
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Input id="description" {...register("description")} />
        </div>
        <div>
          <select {...register("type")} id="type" defaultValue="monthly">
            <option value="monthly">Monthly</option>
            <option value="one-time">One Time</option>
          </select>
        </div>
      </div>
      <Button type="submit">Save</Button>
    </form>
  );
}
