import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import DisplayMonthlySpendingLimit from "@/pages/Dashboard/MonthlySpendingLimit/DisplayMonthlySpendingLimit";
import SetMonthlySpendingLimit from "./SetMonthlySpendingLimit";

export default function MonthlySpendingLimit() {
  return (
    <>
      <Card className="rounded">
        <CardHeader>
          <CardTitle className="font-bold tracking-tight text-base">
            Monthly Budget
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Set and adjust your monthly spending limit
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DisplayMonthlySpendingLimit />
          <SetMonthlySpendingLimit />
        </CardContent>
      </Card>
    </>
  );
}
