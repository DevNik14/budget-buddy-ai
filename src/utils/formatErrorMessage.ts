export function formatErrorMessage({ code }: { code: string }) {
  const errorMessage = code.split("/")[1].split("-").join(" ");
  const firstLetter = errorMessage[0].toUpperCase();
  const formattedMessage = `${firstLetter}${errorMessage.slice(1)}`;
  return formattedMessage;
}