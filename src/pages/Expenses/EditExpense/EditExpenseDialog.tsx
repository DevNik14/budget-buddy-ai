import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

import EditExpenseForm from "./EditExpenseForm";
import { Expense } from "../Expenses";

export default function EditExpense({ expense }: { expense: Expense }) {
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Pencil className="text-green-600 cursor-pointer" />
        </DialogTrigger>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Edit Expense</DialogTitle>
          </DialogHeader>
          <EditExpenseForm expense={expense} />
        </DialogContent>
      </Dialog>
    </>
  );
}
