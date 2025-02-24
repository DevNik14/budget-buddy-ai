import { Timestamp } from "firebase/firestore";

export function getFirstDayOfCurrentMonth() {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  return Timestamp.fromDate(new Date(`${year}-${month}-01`));
  return Timestamp.fromDate(new Date(`2025-03-01`));
}