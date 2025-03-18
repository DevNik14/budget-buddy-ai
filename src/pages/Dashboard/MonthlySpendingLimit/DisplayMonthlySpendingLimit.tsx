import { useQuery } from "@tanstack/react-query";

import { getMonthlySpendingLimit } from "@/services/budgetOperationsService";
import { calculateCurrentMonthExpenseTotal } from "@/services/expenseService";
import { getFirstDayOfCurrentMonth } from "@/utils/getFirstDayOfCurrentMonth";

import { Progress } from "@/components/ui/progress";

export default function DisplayMonthlySpendingLimit() {
  const userId = localStorage.getItem("uid")!;
  const currentMonthDate = getFirstDayOfCurrentMonth();

  const { data: currentMonthSpendings } = useQuery({
    queryKey: ["currentMonthSpendings"],
    queryFn: () => calculateCurrentMonthExpenseTotal(userId, currentMonthDate),
  });

  const { data: monthlySpendingLimit } = useQuery({
    queryKey: ["monthlySpendingLimit"],
    queryFn: () => getMonthlySpendingLimit(userId),
  });

  const calculateSpendingLimitInPercentageHandler = () => {
    if (
      currentMonthSpendings &&
      monthlySpendingLimit &&
      monthlySpendingLimit >= 0
    ) {
      return (currentMonthSpendings / monthlySpendingLimit) * 100;
    }
    return 0;
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-sm">
          <p>Monthly spending limit</p>
          <p>
            lv. {currentMonthSpendings?.toFixed(2)} /{" "}
            {monthlySpendingLimit?.toFixed(2)}
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
