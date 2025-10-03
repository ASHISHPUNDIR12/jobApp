import { auth } from "@/auth";
import AppliedJobCard from "@/components/AppliedJobCard";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function appliedJobPage() {
  async function getJobs(userId: string) {
    const applications = await prisma.application.findMany({
      where: {
        userId: userId,
      },
      include: {
        job: true,
      },
      orderBy: {
        appliedAt: "desc",
      },
    });
    return applications;
  }

  const session = await auth();
  const userId = session?.user.id;
  if (!userId) {
    redirect("/");
  }
  const applications = await getJobs(userId);

  return (
    <div>
      {applications.length === 0 ? (
        <div className="text-center mt-20">
          <h2 className="text-2xl font-semibold">No Jobs Applied </h2>
          <p className="text-gray-500 mt-2">
            You have not applied to any jobs yet!
          </p>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-5">
          {applications.map((application) => (
            <AppliedJobCard key={application.id} application={application} />
          ))}
        </div>
      )}
    </div>
  );
}
