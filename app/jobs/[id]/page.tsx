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
    <div className="content-shell py-10 sm:py-16">
      <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-xl shadow-slate-900/5 sm:p-10">
      {/* Company name */}
      <p className="eyebrow">Featured opportunity</p>
      <h1 className="mb-4 mt-2 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
        {detailjob?.companyName}
      </h1>

      {/* Title, count & logo */}
      <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center sm:gap-6">
        <div>
          <h2 className="text-2xl font-semibold text-slate-800 sm:text-3xl">
            {detailjob?.title}
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Applicants: <span className="font-medium">{totalCount}</span>
          </p>
        </div>

        <div className="relative flex h-16 w-28 items-center justify-center rounded-xl border bg-slate-950 shadow-sm">
          <Image
            src={detailjob?.image || "/placeholder.png"}
            alt="company logo"
            fill
            className="object-contain p-2"
          />
        </div>
      </div>

      {/* Location */}
      <div className="mb-8 flex items-center text-slate-500">
        <CiLocationOn className="mr-2 text-2xl text-primary" />
        <span className="text-base sm:text-lg">{detailjob?.location}</span>
      </div>

      {/* Description */}
      <div className="mb-8 sm:mb-10">
        <h3 className="mb-3 text-xl font-semibold text-slate-900">
          About the Job
        </h3>
        <p className="text-sm leading-7 text-slate-600 sm:text-base">
          {detailjob?.description}
        </p>
      </div>
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
