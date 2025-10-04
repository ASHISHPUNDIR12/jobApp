"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Homebtn() {
  const { data: session } = useSession();
  return (
    <div className="mt-20   ">
      <button
        onClick={() => {
          if (!session) {
            alert("Please Login first");
          }
          redirect("/validate");
        }}
        className="border px-20 py-4 bg-blue-700 text-white font-bold rounded ml-5 mb-1"
      >
        Find jobs
      </button>
      <button
        onClick={() => {
          if (!session) {
            alert("Please Login First");
          }
          redirect("/validate");
        }}
        className="border py-4 px-20 bg-red-700 text-white font-bold rounded ml-5"
      >
        Post Jobs
      </button>
    </div>
  );
}
