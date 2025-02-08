import { Progress } from "@/components/ui/progress";

export default function MonthlySpendingLimit() {
  const monthlySpendingLimit = 300;
  const currentSpendings = 100;

  const calculateSpendingLimitInPercentageHandler = () => {
    return (currentSpendings / monthlySpendingLimit) * 100;
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-sm">
          <p>Monthly spending limit</p>
          <p>
            lv. {currentSpendings} / {monthlySpendingLimit}
          </p>
        </div>
        <Progress
          className="mt-[5px]"
          value={calculateSpendingLimitInPercentageHandler()}
        />
      </div>
    </>
  );
}
