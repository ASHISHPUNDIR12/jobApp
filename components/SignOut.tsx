import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

export default function SignOut() {
  return (
    <Button
      onClick={async () => {
        await signOut({ callbackUrl: "/" });
      }}
    >
      signout
    </Button>
  );
}
