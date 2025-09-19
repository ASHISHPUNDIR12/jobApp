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

export default function LoginDialog() {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Login</Button>
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
