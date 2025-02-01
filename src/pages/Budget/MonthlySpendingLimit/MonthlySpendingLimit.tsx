import { useState } from "react";

import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function MonthlySpendingLimit() {
  const [monthlySpendingLimit, setSpendingLimit] = useState(300);
  const [currentSpendings, setCurrentSpendings] = useState(100);

  const calculateSpendingLimitInPercentageHandler = () => {
    return (currentSpendings / monthlySpendingLimit) * 100;
  };
  return (
    <>
      <Card className="rounded">
        <CardHeader>
          <CardTitle>Monthly Budget</CardTitle>
          <CardDescription>
            Set and adjust your monthly spending limit
          </CardDescription>
        </CardHeader>
        <CardContent>
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
          <div className="max-w-[350px] mt-[5px]">
            <form>
              <div className="grid gap-2">
                <Input />
                <Button type="submit" variant="outline">
                  Set
                </Button>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
