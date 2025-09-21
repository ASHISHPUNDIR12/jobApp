import { auth } from "@/auth";
import JobCard from "@/components/JobCard";
import prisma from "@/lib/prisma";

export default async function () {
  async function getJobs() {
    const jobs = await prisma.job.findMany();
    return jobs;
  }
  const jobs = await getJobs();
  return (
    <div className="flex flex-wrap justify-center mt-10 gap-10">
      {jobs.map((job) => {
        return <JobCard key={job.id} jobData={job} />;
      })}
    </div>
  );
}
