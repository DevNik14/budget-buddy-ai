import MonthlySpendingLimit from "./MonthlySpendingLimit/MonthlySpendingLimit";
import TotalBudget from "./TotalBudget/TotalBudget";

export default function Budget() {
  return (
    <>
      <header>
        <h1 className="text-3xl font-bold">Budget</h1>
      </header>
      <section>
        <div className="grid md:grid-cols-2 gap-20">
          <TotalBudget />
          <MonthlySpendingLimit />
        </div>
      </section>
    </>
  );
}
