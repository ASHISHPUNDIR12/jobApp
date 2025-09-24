import { Application, User } from "@/app/generated/prisma";
import { FaSchool } from "react-icons/fa";
import { IoMdBuild } from "react-icons/io";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
type ApplicationCardProps = {
  candidateData: User;
  data: Application;
};

export default function ({ data, candidateData }: ApplicationCardProps) {
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
        </CardContent>
      </Card>
   
    </div>
  );
}
