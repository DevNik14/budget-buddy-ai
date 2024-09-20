export default function ErrorAuthMessage({ message }: { message: string }) {
  return (
    <p className="text-red-500 bg-red-100 px-4 py-2 rounded-md text-sm transition-opacity duration-300 ease-in-out">
      {message}
    </p>
  );
}
