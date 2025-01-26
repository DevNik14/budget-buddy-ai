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
      <SelectTrigger className="w-[180px] rounded">
        <SelectValue placeholder="Date: Newest" />
      </SelectTrigger>
      <SelectContent className="bg-slate-50">
        <SelectGroup>
          <SelectItem className="cursor-pointer" value="amount: asc">
            Amount: Low to High
          </SelectItem>
          <SelectItem className="cursor-pointer" value="amount: desc">
            Amount: High to Low
          </SelectItem>
          <SelectItem className="cursor-pointer" value="date: asc">
            Date: Oldest
          </SelectItem>
          <SelectItem className="hursor-pointer" value="date: desc">
            Date: Newest
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
