import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Expenses */}
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
        <Card>
          <CardHeader>
            <CardTitle>Total Savings</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <p>4,591 lv</p>
            <svg
              className="w-[50px]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              id="mastercard"
            >
              <path
                fill="#FF5F00"
                d="M15.245 17.831h-6.49V6.168h6.49v11.663z"
              ></path>
              <path
                fill="#EB001B"
                d="M9.167 12A7.404 7.404 0 0 1 12 6.169 7.417 7.417 0 0 0 0 12a7.417 7.417 0 0 0 11.999 5.831A7.406 7.406 0 0 1 9.167 12z"
              ></path>
              <path
                fill="#F79E1B"
                d="M24 12a7.417 7.417 0 0 1-12 5.831c1.725-1.358 2.833-3.465 2.833-5.831S13.725 7.527 12 6.169A7.417 7.417 0 0 1 24 12z"
              ></path>
            </svg>
          </CardContent>
        </Card>
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
