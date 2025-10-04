// submit-button.tsx

"use client";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

export default function SubmitButton({
  text,
  isPending,
}: {
  text: string;
  isPending: boolean;
}) {
  return (
    <Button
      type="submit"
      disabled={isPending}
      className="w-full transition-colors"
    >
      {isPending ? (
        <>
          <Loader2 className="animate-spin mr-2 h-4 w-4" />
          Loading...
        </>
      ) : (
        text
      )}
    </Button>
  );
}