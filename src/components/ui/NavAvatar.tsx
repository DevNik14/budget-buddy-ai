import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function NavAvatar() {
  return (
    <div className="p-5">
      <div className="flex items-center space-x-3">
        <Avatar>
          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="font-semibold">John Doe</h2>
          <p className="text-sm text-gray-500">john@example.com</p>
        </div>
      </div>
    </div>
  );
}
