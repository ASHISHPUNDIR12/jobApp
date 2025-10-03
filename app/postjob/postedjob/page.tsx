import { auth } from "@/auth";
import JobCard from "@/components/JobCard";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
export default async function postedJob() {
  const session = await auth();
  const userId = session?.user.id;
  if (!session) {
    redirect("/");
  }
  async function myjobs() {
    try {
      const myPostedJob = await prisma.job.findMany({
        where: {
          postedById: userId,
        },
      });
      return myPostedJob;
    } catch (err) {
      console.error("error fetching jobs ", err);
    }
  }
  const jobs = (await myjobs()) || [];
  if (jobs.length === 0) {
    return (
      <div className="text-center mt-50">You have Not Posted Any Jobs yet</div>
    );
  }
  return (
    <div className="">
      <h1 className="text-4xl font-bold text-center mb-5">
        Posted Job By You{" "}
      </h1>
      <div className="flex flex-wrap justify-center gap-10">
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            jobData={job}
            hideSaveButton={true}
            hideDeleteButton={false}
          />
        ))}
      </div>
    </div>
  );
}
