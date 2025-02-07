import ExpensesList from "@/pages/Expenses/ExpensesList";

export default function RecentExpenses() {
  return (
    <>
      <ExpensesList type="date" order="asc" />
    </>
  );
}
