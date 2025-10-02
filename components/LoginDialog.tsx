"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import LoginBtn from "./LoginBtn";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import Avtar from "./Avtar";

export default function LoginDialog() {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return (
      <div className="w-[100px] h-[40px] bg-gray-200 rounded animate-pulse" />
    );
  }
  
  if (session?.user.id) {
    return <Avtar  />;
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Login</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Login</DialogTitle>
            <DialogDescription>
              Sign in to your account to find jobs or post a new listing.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <LoginBtn />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
