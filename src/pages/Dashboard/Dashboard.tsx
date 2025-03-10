import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MonthlySpendingLimit from "./MonthlySpendingLimit/MonthlySpendingLimit";
import TotalBudget from "./TotalBudget/TotalBudget";

export default function Dashboard() {
  return (
    <>
      <h1>Dashboard</h1>
      {/* Spending Summary Graph */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Spending Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] bg-gray-100 flex items-center justify-center">
            Graph Placeholder
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
        {/* Recent Expenses */}
        <div>
          <MonthlySpendingLimit />
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Recent Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {["Groceries", "Utilities", "Entertainment"].map((expense) => (
                <li key={expense} className="flex justify-between items-center">
                  <span>{expense}</span>
                  <span>$XX.XX</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        {/* Total Savings */}
        <TotalBudget />
        {/* Subscriptions */}
        <Card>
          <CardHeader>
            <CardTitle>Subscriptions</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {["Netflix", "Spotify", "Gym"].map((sub) => (
                <li key={sub} className="flex justify-between items-center">
                  <span>{sub}</span>
                  <span>$XX.XX/month</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
