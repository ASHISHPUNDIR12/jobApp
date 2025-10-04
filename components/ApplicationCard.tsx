import { FaSchool } from "react-icons/fa";
import { IoMdBuild } from "react-icons/io";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import StatusSelect from "./StatusSelect";
import { prisma } from "@/lib/prisma";
import { BsDownload } from "react-icons/bs";
import { Application, User } from "@prisma/client";

type ApplicationCardProps = {
  candidateData: User;
  data: Application;
};

export default async function ApplicationCard({
  data,
  candidateData,
}: ApplicationCardProps) {
  const application = await prisma.application.findUnique({
    where: {
      id: data.id,
    },
  });
  if (!application) return null;

  return (
    <div className="w-full">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4">
        Applications
      </h1>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl font-bold">
            {candidateData.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Info Row */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4">
            <p className="text-sm sm:text-base">
              {`${data.yoe} Years of experience`}
            </p>

            <StatusSelect
              applicationId={data.id}
              currentStatus={application.status}
            />

            <p className="flex items-center text-sm sm:text-base">
              <FaSchool className="mr-1" />
              {data.education}
            </p>

            <p className="flex items-center text-sm sm:text-base">
              <IoMdBuild className="mr-1" />
              {`Skills: ${data.skills}`}
            </p>
          </div>

          {/* Divider */}
          <div className="w-full border mt-3 mb-4" />

          {/* Applied Date + Resume */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
            <p className="text-sm sm:text-base">
              {data.appliedAt.toDateString()}
            </p>
            <a
              target="_blank"
              rel="noopener noreferrer"
              download
              href={data.resumeUrl}
              className="flex items-center gap-2 text-blue-600 hover:underline text-sm sm:text-base"
            >
              <BsDownload /> Resume
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
