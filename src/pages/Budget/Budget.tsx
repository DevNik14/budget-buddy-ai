import MonthlySpendingLimit from "./MonthlySpendingLimit/MonthlySpendingLimit";
import RecentExpenses from "./RecentExpenses/RecentExpenses";
import TotalBudget from "./TotalBudget/TotalBudget";

export default function Budget() {
  return (
    <>
      <header>
        <h1 className="text-3xl font-bold">Budget</h1>
      </header>
      <section>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-20">
          <div className="grid md:max-lg:grid-cols-2 lg:col-span-1 md:col-span-2 md-text-sm gap-5">
            <TotalBudget />
            <MonthlySpendingLimit />
          </div>
          <div className="lg:col-span-2 md:col-span-1">
            <RecentExpenses />
          </div>
        </div>
      </section>
    </>
  );
}
