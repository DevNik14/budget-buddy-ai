import ExpenseForm from "../ExpenseForm";

export default function AddExpense() {
  return (
    <>
      <h1 className="text-3xl font-bold">New Expense</h1>
      <div className="flex w-full items-center justify-center flex-col p-6 md:p-10">
        <div className="w-full max-w-sm">
          <ExpenseForm />
        </div>
      </div>
    </>
  );
}
