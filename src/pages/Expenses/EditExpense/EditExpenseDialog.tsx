import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import EditExpenseForm from "./EditExpenseForm";
import { Expense } from "../Expenses";

export default function EditExpense({ expense }: { expense: Expense }) {
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Pencil className="text-green-600 cursor-pointer" />
        </DialogTrigger>
        <DialogContent
          className="bg-white"
          onPointerDownOutside={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>Edit Expense</DialogTitle>
          </DialogHeader>
          <VisuallyHidden>
            <DialogDescription></DialogDescription>
          </VisuallyHidden>
          <EditExpenseForm expense={expense} />
        </DialogContent>
      </Dialog>
    </>
  );
}
