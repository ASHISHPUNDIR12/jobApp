import { auth } from "@/auth";
import InputSearch from "@/components/InputSearch";
import JobCard from "@/components/JobCard";
import { prisma } from "@/lib/prisma";

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
      include :{
        savedjobs: {
        where: {
          userId: userId,
        },
      },
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
  searchParams?: { search?: string };
}) {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    return (
      <div className="text-center mt-20">
        <p>Please sign in to view jobs.</p>
      </div>
    );
  }

  const searchTerm = searchParams?.search;

  const jobs = await getJobs(userId, searchTerm);

  return (
    <div>
      <InputSearch />
      {jobs.length === 0 ? (
        <div className="text-center mt-20">
          <h2 className="text-2xl font-semibold">No Jobs Found</h2>
          <p className="text-gray-500 mt-2">
            Your search did not match any available jobs.
          </p>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center mt-10 gap-10">
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
