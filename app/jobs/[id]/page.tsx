import { auth } from "@/auth";
import ApplyDialog from "@/components/ApplyDialog";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { CiLocationOn } from "react-icons/ci";

export default async function detailJobPage(props: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  const { id } = await props.params;

  async function focusedJob(jobId: string) {
    try {
      return await prisma.job.findFirst({ where: { id: jobId } });
    } catch (err) {
      console.error("error", err);
    }
  }

  async function appliedStatus(userId: string, jobId: string) {
    try {
      const application = await prisma.application.findUnique({
        where: {
          userId_jobId: { userId, jobId },
        },
      });
      return !!application;
    } catch (err) {
      console.error("error ", err);
    }
  }

  async function count(jobId: string) {
    try {
      return await prisma.application.count({
        where: { jobId },
      });
    } catch (err) {
      console.error("not able to count", err);
    }
  }

  const userId = session?.user.id;
  const detailjob = await focusedJob(id);

  if (!detailjob) {
    return (
      <div className="text-center p-10">
        <h1 className="text-2xl font-bold">Job Not Found</h1>
        <p>Sorry, the job you are looking for does not exist.</p>
      </div>
    );
  }

  const totalCount = await count(detailjob?.id);
  const hasApplied = userId
    ? await appliedStatus(userId, detailjob?.id)
    : false;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Company name */}
      <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-gray-900">
        {detailjob?.companyName}
      </h1>

      {/* Title, count & logo */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800">
            {detailjob?.title}
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Applicants: <span className="font-medium">{totalCount}</span>
          </p>
        </div>

        <div className="relative bg-black border rounded-lg w-28 h-16 flex items-center justify-center shadow-sm">
          <Image
            src={detailjob?.image || "/placeholder.png"}
            alt="company logo"
            fill
            className="object-contain p-2"
          />
        </div>
      </div>

      {/* Location */}
      <div className="flex items-center text-gray-600 mb-8">
        <CiLocationOn className="mr-2 text-2xl text-gray-500" />
        <span className="text-lg">{detailjob?.location}</span>
      </div>

      {/* Description */}
      <div className="mb-10">
        <h3 className="text-2xl font-semibold mb-3 text-gray-800">
          About the Job
        </h3>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {detailjob?.description}
        </p>
      </div>

      {/* Apply dialog */}
      <div className="flex justify-center">
        <ApplyDialog
          jobId={detailjob?.id}
          jobTitle={detailjob?.title}
          companyName={detailjob?.companyName ?? "the company "}
          hasApplied={hasApplied!}
        />
      </div>
    </div>
  );
}
