"use client";
import Link from "next/link";

export default function Homebtn() {
  return (
    <div className="flex flex-col justify-center gap-3 sm:flex-row">
      <Link href="/validate" className="rounded-xl bg-primary px-8 py-3.5 font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:-translate-y-0.5 hover:bg-primary/90">Find jobs <span aria-hidden="true">→</span></Link>
      <Link href="/validate" className="rounded-xl border border-slate-300 bg-white/80 px-8 py-3.5 font-semibold text-slate-800 transition hover:-translate-y-0.5 hover:border-primary hover:text-primary">Post a job</Link>
    </div>
  );
}
