import {
  CreditCard,
  Bot,
  Home,
  PiggyBank,
} from "lucide-react";

export const navMenuItems = [
  { icon: Home, path: "/", name: "Dashboard" },
  { icon: CreditCard, path: "transactions", name: "Transactions" },
  { icon: PiggyBank, path: "budget", name: "Budget" },
  { icon: Bot, path: "advisor", name: "AI Advisor" },
];