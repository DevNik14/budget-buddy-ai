import { Timestamp } from "firebase/firestore";

const formatDate = (date: Timestamp | string | Date): string => {
  if (date instanceof Timestamp) {
    return new Date(date.seconds * 1000).toLocaleDateString();
  }
  if (date instanceof Date) {
    return date.toLocaleDateString();
  }
  return date;
};

export default formatDate