import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Timestamp } from "firebase/firestore";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getLastThreeExpenses } from "@/services/expenseService";
import formatDate from "@/utils/formatDate";

export default function LatestSpendings() {
  const userId = localStorage.getItem("uid")!;

  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["latestSpendings"],
    queryFn: () => getLastThreeExpenses(userId),
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>{error.message}</p>;
  }

  return (
    <article>
      <header className="flex justify-between">
        <p className="font-bold">Latest spendings</p>
        <Link to="/expenses" className="text-slate-600">
          View all
        </Link>
      </header>
      <div className="h-[1px] w-full bg-slate-400 my-5"></div>
      <div>
        <ul>
          {data?.map(
            ({
              category,
              date,
              amount,
            }: {
              category: string;
              date: Timestamp | string | Date;
              amount: number;
            }) => {
              return (
                <li className="flex justify-between items-center capitalize">
                  <div>
                    <p className="font-bold">{category}</p>
                    <p>{formatDate(date)}</p>
                  </div>
                  <p>-{amount.toFixed(2)} lv.</p>
                </li>
              );
            }
          )}
        </ul>
      </div>
    </article>
  );
}
