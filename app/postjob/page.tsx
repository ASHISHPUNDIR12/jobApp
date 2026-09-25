import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import PostjobForm from "@/components/PostjobForm";

async function getCompanies() {
  try {
    const companies = await prisma.company.findMany();
    return companies;
  } catch (err) {
    console.log("error fetching companies", err);
  }
}

export default async function PostJobPage() {
  const session = await auth();
  if (!session) {
    redirect("/");
  }
  const companies = (await getCompanies()) || [];

  return (
    <div className="content-shell py-10 sm:py-16">
      <div className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-xl shadow-slate-900/5 sm:p-10">
      <p className="eyebrow">For growing teams</p>
      <h1 className="mb-2 mt-2 text-3xl font-bold tracking-tight text-slate-950">Post a job</h1>
      <p className="mb-8 text-sm leading-6 text-slate-500">Tell great candidates why this is the right opportunity for them.</p>
      <PostjobForm companies={companies} />
      </div>
    </div>
  );
}
