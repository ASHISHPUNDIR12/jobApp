import { auth } from "@/auth";
import JobCard from "@/components/JobCard";
import {prisma} from "@/lib/prisma";
export default async function postedJob() {
  const session = await auth();
  const userId = session?.user.id;
  if (!userId) {
    return;
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


  return (
    <div>
      posted job
      {jobs.map((job) => (
        <JobCard key={job.id} jobData={job} hideSaveButton={true} hideDeleteButton = {false} />
      ))}
    </div>
  );
}
