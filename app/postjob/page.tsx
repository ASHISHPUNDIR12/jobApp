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
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-2xl">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Post a Job</h1>
      <PostjobForm companies={companies} />
    </div>
  );
}
