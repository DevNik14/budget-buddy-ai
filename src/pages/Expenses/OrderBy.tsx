import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function OrderBy({
  orderByExpenseHandler,
}: {
  orderByExpenseHandler: (value: string) => void;
}) {
  return (
    <Select onValueChange={orderByExpenseHandler}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Date: Newest" />
      </SelectTrigger>
      <SelectContent className="bg-slate-50">
        <SelectGroup>
          <SelectItem value="amount: asc">Amount: Low to High</SelectItem>
          <SelectItem value="amount: desc">Amount: High to Low</SelectItem>
          <SelectItem value="date: asc">Date: Oldest</SelectItem>
          <SelectItem value="date: desc">Date: Newest</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
