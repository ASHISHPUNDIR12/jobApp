import { auth } from "@/auth";
import InputSearch from "@/components/InputSearch";
import JobCard from "@/components/JobCard";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

async function getJobs(userId: string, searchTerm?: string) {
  if (searchTerm && searchTerm.trim() !== "") {
    return await prisma.job.findMany({
      where: {
        applications: { none: { userId: userId } },
        OR: [
          { title: { contains: searchTerm, mode: "insensitive" } },
          { description: { contains: searchTerm, mode: "insensitive" } },
          { companyName: { contains: searchTerm, mode: "insensitive" } },
          {
            location: { contains: searchTerm, mode: "insensitive" },
          },
        ],
      },

      orderBy: { createdAt: "desc" },
    });
  }

  return await prisma.job.findMany({
    where: {
      applications: { none: { userId: userId } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export default async function JobPage({
  searchParams,
}: {
  searchParams?: Promise<{ search?: string }>;
}) {
  const session = await auth();
  if (!session) {
    redirect("/");
  }

  const userId = session?.user.id;

  if (!userId) {
    return (
      <div className="text-center mt-20">
        <p>Please sign in to view jobs.</p>
      </div>
    );
  }
  const params = await searchParams;
  const searchTerm = params?.search;

  const jobs = await getJobs(userId, searchTerm);

  return (
    <div className="pb-20">
      <InputSearch />
      {jobs.length === 0 ? (
        <div className="content-shell mt-16 text-center">
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white/60 p-12">
          <h2 className="text-2xl font-semibold">No jobs found</h2>
          <p className="mt-2 text-slate-500">
            Your search did not match any available jobs.
          </p>
          </div>
        </div>
      ) : (
        <div className="content-shell mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              jobData={job}
              hideDeleteButton={true}
              hideSaveButton={false}
            />
          ))}
        </div>
      )}
    </div>
  );
}
