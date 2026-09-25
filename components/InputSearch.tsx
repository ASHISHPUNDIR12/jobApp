"use client";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

import { Input } from "./ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import { Search } from "lucide-react";

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

  function clear() {
    setText("");
    router.push("/jobs");
  }
  return (
    <div className="content-shell pt-10">
      <div className="mx-auto flex max-w-3xl items-center gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-lg shadow-slate-900/5">
      <Search className="ml-3 size-5 text-slate-400" />
      <Input
        value={text}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setText(e.target.value);
        }}
        className="h-11 border-0 bg-transparent shadow-none focus-visible:ring-0"
        type="search"
        placeholder="Search for jobs by title, skill, or company..."
      />
      {text && <Button variant="ghost" onClick={clear}>Clear</Button>}
      </div>
      <div className="mx-auto mt-7 max-w-3xl">
        <p className="eyebrow">Open opportunities</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Find work that fits your life.</h1>
      </div>
    </div>
  );
}
