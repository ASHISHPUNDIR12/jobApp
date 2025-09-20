import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Avatar } from "./ui/avatar";
import { useSession } from "next-auth/react";
import SignOut from "./SignOut";

export default function Avtar() {

  const { data: session } = useSession();
  if (!session) {
    return null;
  }
  const {user} = session
    const imageUrl = user?.image 

 const userInitials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
    : "?";
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none"  >
        <Avatar >
          <AvatarImage src={imageUrl|| ""} alt={user?.name || ""} />
          <AvatarFallback className="text-black-200" >{userInitials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
            My Account 
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>my jobs</DropdownMenuItem>
        <DropdownMenuItem>saved jobs</DropdownMenuItem>
        <DropdownMenuItem>Manage Account</DropdownMenuItem>
        <DropdownMenuItem>
            <SignOut/>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
