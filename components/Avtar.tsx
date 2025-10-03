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
import SignOut from "./SignOut";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Avtar() {
  const { data: session } = useSession();
  if (!session) {
    return null;
  }
  const { user } = session;
  const imageUrl = user?.image;

  const userInitials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
    : "?";
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <Avatar>
          <AvatarImage src={imageUrl || ""} alt={user?.name || ""} />
          <AvatarFallback className="text-black-200">
            {userInitials}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {user.role === "CANDIDATE" && (
          <>
            <DropdownMenuItem asChild>
              <Link href="/">Home</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/jobs">All Jobs</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/jobs/appliedjobs">Applied Jobs</Link>
            </DropdownMenuItem>
          </>
        )}
        {user.role === "RECRUITER" && (
          <>
            <DropdownMenuItem asChild>
              <Link href="/">Home</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/postjob">Post a Job</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/postjob/postedjob">My Posted Jobs</Link>
            </DropdownMenuItem>
          </>
        )}

        <DropdownMenuItem>
          <SignOut />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
