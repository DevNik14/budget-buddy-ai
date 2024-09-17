import {
  CreditCard,
  Bot,
  Home,
  LogOut,
  PiggyBank,
  Settings,
} from "lucide-react";

const navMenuItems = [
  { icon: Home, path: "/", name: "Dashboard" },
  { icon: CreditCard, path: "transactions", name: "Transactions" },
  { icon: PiggyBank, path: "budget", name: "Budget" },
  { icon: Bot, path: "advisor", name: "AI Advisor" },
];

export default function useDisplayNavMenuItems() {

}