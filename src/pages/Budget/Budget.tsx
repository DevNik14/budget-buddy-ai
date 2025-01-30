import TotalBudget from "./TotalBudget/TotalBudget";

export default function Budget() {
  return (
    <>
      <header>
        <h1 className="text-3xl font-bold">Budget</h1>
      </header>
      <section>
        <TotalBudget />
      </section>
    </>
  );
}
