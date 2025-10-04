import ApplicationCard from "@/components/ApplicationCard";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { CiLocationOn } from "react-icons/ci";

export default async function recruiterDetailJobPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;

  async function focusedJob(jobId: string) {
    try {
      const detailjob = await prisma.job.findFirst({
        where: { id: jobId },
      });
      return detailjob;
    } catch (err) {
      console.error("error", err);
    }
  }

  async function applications(jobId: string) {
    try {
      const peopleWhoApplied = await prisma.application.findMany({
        where: { jobId },
        include: {
          user: true,
        },
      });
      return peopleWhoApplied;
    } catch (err) {
      console.error("error fetching applications", err);
    }
  }

  const applicants = await applications(id);
  const detailjob = await focusedJob(id);

  if (!detailjob) {
    return (
      <div className="text-center p-6 md:p-10">
        <h1 className="text-xl md:text-2xl font-bold">Job Not Found</h1>
        <p className="text-sm md:text-base">
          Sorry, the job you are looking for does not exist.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-10">
      {/* Company Name */}
      <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 text-gray-900 text-center md:text-left">
        {detailjob?.companyName}
      </h1>

      {/* Title + Logo */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 mb-6">
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-semibold text-gray-800 text-center md:text-left">
          {detailjob?.title}
        </h2>
        <div className="relative bg-black border rounded-lg w-20 h-12 sm:w-28 sm:h-16 flex items-center justify-center shadow-sm">
          <Image
            fill
            src={detailjob?.image || "pvt"}
            alt="company logo"
            className="object-contain p-2"
          />
        </div>
      </div>

      {/* Location */}
      <div className="flex items-center justify-center md:justify-start text-gray-600 mb-6 text-sm sm:text-base">
        <CiLocationOn className="mr-2 text-lg sm:text-xl" />
        <span>{detailjob?.location}</span>
      </div>

      {/* About Job */}
      <div className="mb-8">
        <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-center md:text-left">
          About the Job
        </h3>
        <p className="text-gray-700 leading-relaxed text-sm sm:text-base text-justify md:text-left">
          {detailjob?.description}
        </p>
      </div>

      {/* Applicants */}
      {applicants && applicants.length > 0 ? (
        <div className="grid gap-4">
          {applicants.map((a) => (
            <ApplicationCard key={a.id} data={a} candidateData={a.user} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-gray-500">
          <p className="text-base sm:text-lg font-medium">
            No one has applied yet.
          </p>
        </div>
      )}
    </div>
  );
}
