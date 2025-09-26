import { Application, User } from "@/app/generated/prisma";
import { FaSchool } from "react-icons/fa";
import { IoMdBuild } from "react-icons/io";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import StatusSelect from "./StatusSelect";
import prisma from "@/lib/prisma";

type ApplicationCardProps = {
  candidateData: User;
  data: Application;
};

export default async function ({ data, candidateData }: ApplicationCardProps) {
  const application = await prisma.application.findUnique({
    where: {
      id: data.id
    }
  }
  
)
if(!application) return null

  return (
    <div>
      <h1 className="text-4xl font-semibold mb-5">Applications</h1>
      <Card>
        <CardHeader>
          <CardTitle>{candidateData.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between ">
            <p>{`${data.yoe} Years of experience`}</p>
            <StatusSelect applicationId={data.id} currentStatus = {application.status} />
            <p className="flex">
              <FaSchool className="mt-1 mr-1 " />
              {data.education}{" "}
            </p>
            <p className="flex">
              {" "}
              <IoMdBuild className="mt-1.5 mr-1" /> {`Skills : ${data.skills}`}
            </p>
          </div>
          <div className="w-100% border mt-2 mb-5 "></div>
          <p>{data.appliedAt.toDateString()}</p>
          <a  type="download" href={`${data.resumeUrl}`}>donload</a>
        </CardContent>
      </Card>
    </div>
  );
}
