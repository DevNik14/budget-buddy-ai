import { useForm, SubmitHandler } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Inputs = {
  amount: string;
  category: string;
  date: string;
  type: string;
  description: string;
};

// { amount: number; category: string; description: string; date: Date; type: string; }

export default function ExpenseForm() {
  const { register, handleSubmit, getValues, watch } = useForm<Inputs>({
    defaultValues: {
      amount: "",
      category: "bills",
      date: "",
      type: "monthly",
      description: "",
    },
  });

  return (
    <form>
      <div>
        <div>
          <Label htmlFor="amount">Amount*</Label>
          <Input id="amount" {...register("amount")} />
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
          <Input id="date" type="date" {...register("date")} />
        </div>
        <div>
          <Label htmlFor="type">Type*</Label>
          <Input id="type" {...register("type")} />
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
      <Button
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          console.log(getValues());
        }}
      >
        Save
      </Button>
    </form>
  );
}
