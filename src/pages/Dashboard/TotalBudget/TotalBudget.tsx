import { useQuery } from "@tanstack/react-query";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { getTotalBudget } from "@/services/budgetOperationsService";

export default function TotalBudget() {
  const userId = localStorage.getItem("uid")!;

  const {
    data: totalBudget,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["budget"],
    queryFn: async () => getTotalBudget(userId),
  });

  if (isError) {
    return <p>{error.message}</p>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Budget</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col">
        {isPending ? <p>0 lv.</p> : <p>{totalBudget} lv.</p>}
        <div>
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
        </div>
      </CardContent>
    </Card>
  );
}
