import { auth } from "@/auth";
import JobCard from "@/components/JobCard";
import prisma from "@/lib/prisma";

export default async function appliedJobPage() {
  async function getJobs(userId: string) {
    const jobs = await prisma.job.findMany({
      where: {
        applications: {
          some: {
            userId: userId,
          },
        },
      },
    });
    return jobs;
  }
  const session = await auth();
  const userId = session?.user.id;
  if (!userId) {
    return;
  }
  const appliedJob = await getJobs(userId);

  return (
    <div>
      {appliedJob.length === 0 ? (
        <div className="text-center mt-20">
          <h2 className="text-2xl font-semibold">No Jobs Applied </h2>
          <p className="text-gray-500 mt-2">
            You have not applied to any jobs yet!
          </p>
        </div>
      ) : (
        <div className="flex justify-center gap-5">
          {appliedJob.map((job) => (
            <JobCard
              key={job.id}
              jobData={job}
              hideSaveButton={true}
              hideDeleteButton={false}
            />
          ))}
        </div>
      )}
    </div>
  );
}
