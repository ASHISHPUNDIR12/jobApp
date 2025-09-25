"use client";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

import { Input } from "./ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";

export default function InputSearch() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get("search") || "";
  const [text, setText] = useState(initialQuery);
  // 0.3 second delay
  const [query] = useDebounce(text, 300);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (query) {
      params.set("search", query);
    } else {
      params.delete("search");
    }
    router.push(`/jobs?${params.toString()}`);
  }, [query, searchParams, router]);

  function clear(){
    setText("")
    router.push("/jobs")
  }
  return (
    <div className="w-100vw text-center    ">
      <Input
        value={text}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setText(e.target.value);
        }}
        className="w-[50%]"
        type="search"
        placeholder="Search for jobs by title, skill, or company..."
      />
      <Button onClick={clear}  >Clear</Button>
    </div>
  );
}
