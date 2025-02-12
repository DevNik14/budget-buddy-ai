export default function ErrorAuthMessage({ message }: { message: string }) {
  return (
    <div className="text-white bg-red-600 px-4 py-2 rounded-md text-sm transition-opacity duration-300 ease-in-out">
      {message}
    </div>
  );
}
